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

import { IPromptRepository, PromptFileRepository } from 'prompt-repository';

import { throwMcpMethodNotFound } from "./McpThrow.js";
import { generateComponentC4Prompt } from "./GenerateComponentC4Prompt.js";
import { generateRollupC4Prompt } from "./GenerateRollupC4Prompt.js";
import { getMcpPrompt, expandPrompt } from "./McpBridgeTypes.js";
import { generateReadmePromptId } from "./PromptIds.js";

import {
   rootDirectoryParamName,
   c4TypeParamName,
   rootDirectoryParamDesc,
   c4TypeParamDesc,
   generateComponentC4DiagramPromptName,
   generateRollupC4DiagramPromptName,
   generateComponentC4DiagramPromptDesc,
   generateRollupC4DiagramPromptDesc
} from './UIStrings.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let repository: IPromptRepository = new PromptFileRepository(path.join(__dirname, './Prompts.json'));
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

   const readmePrompt = getMcpPrompt(generateReadmePromptId, repository);
   if (!readmePrompt) {
      throw new Error('Readme prompt not found');
   }
   // Prompts
   server.setRequestHandler(ListPromptsRequestSchema, async (): Promise<ListPromptsResult> => {
      return Promise.resolve({
         prompts: [
            readmePrompt,
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
            }
         ]
      });
   });

   server.setRequestHandler(GetPromptRequestSchema, async (request: GetPromptRequest): Promise<GetPromptResult> => {

      const readmePrompt = getMcpPrompt(generateReadmePromptId, repository);

      if (request.params.name === readmePrompt?.name) {

         const args = request.params.arguments;

         const expandedPrompt = expandPrompt (generateReadmePromptId, repository, {
            rootDirectory: args?.rootDirectory,
            languages: args?.languages ?? undefined,
            wordCount: args?.wordCount ?? undefined
         });

         return {
            messages: [
               {
                  role: 'user',
                  content: {
                     type: 'text',
                     text: expandedPrompt
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
 

