/**
 * This module provide resources to return the prompts we use. This is a temporary thing until Cusror supports prompts. 
 * 
 * Copyright Jon Verrier, 2025
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import {
   ListResourcesRequestSchema,
   ListResourcesResult,
   ReadResourceRequestSchema,  
   ReadResourceRequest,
   ReadResourceResult
} from '@modelcontextprotocol/sdk/types.js';

import { throwMcpMethodNotFound } from "./McpThrow.js";

import { generateReadmePrompt } from "./GenerateReadMePrompt.js";
import { generateComponentC4Prompt } from "./GenerateComponentC4Prompt.js";
import { generateRollupC4Prompt } from "./GenerateRollupC4Prompt.js";

import {
   generateReadmePromptName,
   generateComponentC4DiagramPromptName,
   generateRollupC4DiagramPromptName,   
   generateReadmePromptDesc,
   generateComponentC4DiagramPromptDesc,
   generateRollupC4DiagramPromptDesc,
   mcpDocName
} from './UIStrings.js';

const readmeUri = new URL('file://' + mcpDocName + '/' + generateReadmePromptName).href;
const componentC4DiagramUri = new URL('file://' + mcpDocName + '/' + generateComponentC4DiagramPromptName).href;
const rollupMermaidC4DiagramUri = new URL('file://' + mcpDocName + '/' + generateRollupC4DiagramPromptName).href;


/**
 * Adds resource handlers to the MCP server for managing documentation prompts.
 * This includes handlers for:
 * - Listing available documentation resources (README, C4 Component diagrams, etc.)
 * - Reading specific resources by URI
 * 
 * @param server - The MCP server instance to add resource handlers to
 */

export function addResources(server: Server): void {

   // Prompts
   server.setRequestHandler(ListResourcesRequestSchema, async (): Promise<ListResourcesResult> => {
      return Promise.resolve({
         resources: [ {
            uri: readmeUri,
            mimeType: 'application/text',
            name: generateReadmePromptDesc,
         },
         {
            uri: componentC4DiagramUri,
            mimeType: 'application/text',
            name: generateComponentC4DiagramPromptDesc,
         },
         {
            uri: rollupMermaidC4DiagramUri,
            mimeType: 'application/text',
            name: generateRollupC4DiagramPromptDesc,
         }         
      ]         
      });
   });

   server.setRequestHandler(ReadResourceRequestSchema, async (request: ReadResourceRequest): Promise<ReadResourceResult> => {

      const resourceUri = request.params.uri;
   
      if (resourceUri === readmeUri) {
         return {
            contents: [
               {
                  uri: readmeUri,
                  mimeType: 'application/text',
                  text: generateReadmePrompt.expandPrompt ({rootDirectory: '{RootDir}', languages: '{Languages}', wordsPerModule: '{ModuleSummaryWordCount}'})
               }
            ]
         }
      }
      else if (resourceUri === componentC4DiagramUri) {
         return {
            contents: [
               {
                  uri: componentC4DiagramUri,
                  mimeType: 'application/text',
                  text: generateComponentC4Prompt.expandPrompt({rootDirectory: '{RootDir}'})
               }
            ]
         }
      }
      else if (resourceUri === rollupMermaidC4DiagramUri) {
         return {
            contents: [
               {
                  uri: rollupMermaidC4DiagramUri,
                  mimeType: 'application/text',
                  text: generateRollupC4Prompt.expandPrompt({rootDirectory: '{RootDir}', c4Type: '{C4Type}'})
               }
            ]
         }
      }
      else {
         throwMcpMethodNotFound('Resource not found');
      }
   })
}  