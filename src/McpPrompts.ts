/**
 * McpPrompts module provides the prompts for the MCP Documenter server.
 * It adds a prompt for generating a C4 diagram from the context provided.
 * 
 * Copyright Jon Verrier, 2025
 */
 
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import {
   GetPromptRequestSchema,
   ListPromptsRequestSchema,
   ListPromptsResult,
   GetPromptRequest,
   GetPromptResult
} from '@modelcontextprotocol/sdk/types.js';

import { throwMcpMethodNotFound } from "./McpThrow.js";
import { generateReadmePrompt } from "./GenerateReadMePrompt.js";
import { generateComponentC4Prompt } from "./GenerateComponentC4Prompt.js";
import { generateRollupC4Prompt } from "./GenerateRollupC4Prompt.js";

import {
   rootDirectoryParamName,
   languagesParamName,
   wordsPerModuleParamName,
   c4TypeParamName,
   rootDirectoryParamDesc,
   wordsPerModuleParamDesc,
   languagesParamDesc,
   c4TypeParamDesc,
   generateReadmePromptName,
   generateComponentC4DiagramPromptName,
   generateRollupC4DiagramPromptName,
   generateReadmePromptDesc,
   generateComponentC4DiagramPromptDesc,
   generateRollupC4DiagramPromptDesc
} from './UIStrings.js';

/**
 * Adds prompt handlers to the MCP server for generating documentation.
 * 
 * This function sets up handlers for three types of documentation generation:
 * 1. README.' + C4DiagrammerName + '.md - Module-level documentation summarizing code in each directory
 * 2. C4Component.' + C4DiagrammerName + '.md - Component-level C4 architecture diagrams for each module
 * 3. C4Context.' + C4DiagrammerName + '.md or C4Container.' + C4DiagrammerName + '.md - System-level C4 architecture diagrams
 * 
 * @param server - The MCP server instance to add handlers to
 * @throws {McpError} If invalid parameters are provided to the prompts
 */
export function addPrompts(server: Server): void {

   // Prompts
   server.setRequestHandler(ListPromptsRequestSchema, async (): Promise<ListPromptsResult> => {
      return Promise.resolve({
         prompts: [{
            name: generateReadmePromptName,
            description: generateReadmePromptDesc,
            arguments: [
               {
                  name: rootDirectoryParamName,
                  description: rootDirectoryParamDesc,
                  required: true
               },
               {
                  name: languagesParamName,
                  description: languagesParamDesc,
                  required: false
               },
               {
                  name: wordsPerModuleParamName,
                  type: 'number',
                  description: wordsPerModuleParamDesc,
                  required: false
               }               
            ]
         },
         {
            name: generateComponentC4DiagramPromptName,
            description: generateComponentC4DiagramPromptDesc,
            arguments: [
               {
                  name: rootDirectoryParamName,
                  description: rootDirectoryParamDesc,
                  required: true,
               }
            ]
         },
         {
            name: generateRollupC4DiagramPromptName,
            description: generateRollupC4DiagramPromptDesc,
            arguments: [
               {
                  name: rootDirectoryParamName,
                  description: rootDirectoryParamDesc,
                  required: true
               },
               {
                  name: c4TypeParamName,
                  description: c4TypeParamDesc,
                  required: true
               }
            ]
         }]
      });
   });

   server.setRequestHandler(GetPromptRequestSchema, async (request: GetPromptRequest): Promise<GetPromptResult> => {

      if (request.params.name === generateReadmePromptName) {

         const args = request.params.arguments;

         const validatedArgs = generateReadmePrompt.validateArgs ({
            rootDirectory: args?.RootDirectory,
            languages: args?.Languages,
            wordsPerModule: args?.WordsPerModule
         });

         return {
            messages: [
               {
                  role: 'user',
                  content: {
                     type: 'text',
                     text: generateReadmePrompt.expandPrompt(validatedArgs)
                  },
               },
            ],
         }
      }
      else
      if (request.params.name === generateComponentC4DiagramPromptName) {

         const args = request.params.arguments;

         const validatedArgs = generateComponentC4Prompt.validateArgs({
            rootDirectory: args?.RootDirectory
         });

         return {
            messages: [
               {
                  role: 'user',
                  content: {
                     type: 'text',
                     text: generateComponentC4Prompt.expandPrompt(validatedArgs)
                  },
               },
            ],
         }
      }
      else
      if (request.params.name === generateRollupC4DiagramPromptName) {

         const args = request.params.arguments;

         const validatedArgs = generateRollupC4Prompt.validateArgs({
            rootDirectory: args?.RootDirectory,
            c4Type: args?.C4Type
         });

         return {
            messages: [
               {
                  role: 'user',
                  content: {
                     type: 'text',
                     text: generateRollupC4Prompt.expandPrompt(validatedArgs)
                  },
               }
            ],
         }
      }

      throwMcpMethodNotFound('Prompt not found');
   });
};
 

