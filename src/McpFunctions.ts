/**
 * McpFunctions module provides function handlers for the Model Context Protocol server.
 * It implements tools for working with Mermaid diagrams, including:
 * - Detecting diagram types from Mermaid markdown
 * - Previewing diagrams in a browser
 * 
 * Copyright Jon Verrier, 2025
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
   CallToolRequestSchema,
   CallToolRequest,
   CallToolResult,
   ListToolsRequestSchema,
   ListToolsResult,
} from "@modelcontextprotocol/sdk/types.js";

import { throwMcpInternalError, throwMcpMethodNotFound } from "./McpThrow.js";

import { shouldRegenerateReadMeFunction, IShouldRegenerateReadMeArgs } from "./ShouldRegenerateReadMeFunction.js";

import {
   shouldRegenerateReadmeFunctionName,
   directoryParamDesc,
   sourceFileExtensionsParamDesc,
   detectMermaidDiagramTypeToolName,
   parseMermaidToolName,
   previewMermaidToolName,
   previewMermaidToolDesc,
   detectMermaidDiagramTypeToolDesc,
   detectmermaidDiagramReturnDesc,
   mermaidParamDesc,
   parseMermaidToolDesc,
   parseMermaidReturnDesc,
   previewMermaidReturnDesc,
   shouldRegenerateReadmeFunctionDesc,
   shouldRegenerateReadmeFunctionReturnDesc,
   previewExistingMermaidToolDesc,
   previewExistingMermaidToolName,
   mermaidFileParamName,
   mermaidFileParamDesc
} from "./UIStrings.js";

import { detectMermaidFunction, IProcessExistingMermaidArgs, IProcessMermaidArgs, parseMermaidFunction, previewExistingMermaidFunction, previewMermaidFunction } from "./ProcessMermaidFunctions.js";

import { IFunction } from "./McpBridgeTypes.js";

/**
 * Adds the Mermaid diagram detection and preview tools to the server.
 * @param server The server instance to add the tools to
 */
export function addFunctions(server: Server): void {

   server.setRequestHandler(ListToolsRequestSchema, async (): Promise<ListToolsResult> => {

      return {
         tools: [
            /*
            // Implemeneted these as a convenience to the user, but they seem to confuse the LLMs
            {
               name: getGenerateReadmePromptFunctionName,
               description: generateReadmePromptDesc,
               inputSchema: {
                  type: "object",
                  properties: {
                      rootDirectory: { type: "string", description: rootDirectoryParamDesc },
                      language: { type: "string", description: languagesParamDesc },
                      wordsPerModule: { type: "number", description: wordsPerModuleParamDesc }
                  },
                  required: ["rootDirectory"]
               },
               outputSchema: {
                  type: "object",
                  properties: {
                     toolResult: { type: "string", description: generateReadmePromptDesc }
                  },
                  required: ["toolResult"]
               }
            },
            {
               name: getGenerateComponentC4DiagramPromptFunctionName,
               description: generateComponentC4DiagramPromptDesc,
               inputSchema: {
                  type: "object",
                  properties: {
                      rootDirectory: { type: "string", description: rootDirectoryParamDesc }
                  },
                  required: ["rootDirectory"]
               },
               outputSchema: {
                  type: "object",
                  properties: {
                     toolResult: { type: "string", description: generateComponentC4DiagramPromptDesc }
                  },
                  required: ["toolResult"]
               }
            },            
            {
               name: getGenerateRollupC4DiagramPromptFunctionName,
               description: generateRollupC4DiagramPromptDesc,
               inputSchema: {
                  type: "object",
                  properties: {
                     rootDirectory: { type: "string", description: rootDirectoryParamDesc },
                     c4Type: { type: "string", description: c4TypeParamDesc }
                  },
                  required: ["rootDirectory", "c4Type"]
               },
               outputSchema: {
                  type: "object",
                  properties: {
                     toolResult: { type: "string", description: generateRollupC4DiagramPromptDesc }
                  },
                  required: ["toolResult"]
               }
            },
            */
            {
               name: shouldRegenerateReadmeFunctionName,
               description: shouldRegenerateReadmeFunctionDesc,
               inputSchema: {
                  type: "object",
                  properties: {
                     directory: { type: "string", description: directoryParamDesc },
                     sourceFileExtensions: { type: "array", description: sourceFileExtensionsParamDesc }
                  },
                  required: ["directory", "sourceFileExtensions"]
               },
               outputSchema: {
                  type: "object",
                  properties: {
                     toolResult: { type: "string", description: shouldRegenerateReadmeFunctionReturnDesc }
                  },
                  required: ["toolResult"]
               }
            },           
            {
               name: detectMermaidDiagramTypeToolName,
               description: detectMermaidDiagramTypeToolDesc,
               inputSchema: {
                  type: "object",
                  properties: {
                     mermaid: { type: "string", description: mermaidParamDesc }
                  },
                  required: ["mermaid"]
               },
               outputSchema: {
                  type: "object",
                  properties: {
                     toolResult: { type: "string", description: detectmermaidDiagramReturnDesc }
                  },
                  required: ["toolResult"]
               }
            },
            {
               name: parseMermaidToolName,
               description: parseMermaidToolDesc,
               inputSchema: {
                  type: "object",
                  properties: {
                     mermaid: { type: "string", description: mermaidParamDesc }
                  },
                  required: ["mermaid"]
               },
               outputSchema: {
                  type: "object",
                  properties: {
                     toolResult: { type: "string", description: parseMermaidReturnDesc }
                  },
                  required: ["toolResult"]
               }
            },
            {
               name: previewMermaidToolName,
               description: previewMermaidToolDesc,
               inputSchema: {
                  type: "object",
                  properties: {
                     mermaid: { type: "string", description: mermaidParamDesc }
                  },
                  required: ["mermaid"]
               },
               outputSchema: {
                  type: "object",
                  properties: {
                     toolResult: { type: "string", description: previewMermaidReturnDesc }
                  },
                  required: ["toolResult"]
               }
            },
            {
               name: previewExistingMermaidToolName,
               description: previewExistingMermaidToolDesc,
               inputSchema: {
                  type: "object",
                  properties: {
                     filePath: { type: "string", description: mermaidFileParamDesc }
                  },
                  required: ["filePath"]
               },
               outputSchema: {
                  type: "object",
                  properties: {
                     toolResult: { type: "string", description: previewMermaidReturnDesc }
                  },
                  required: ["toolResult"]
               }
            }]
      };
   });

   server.setRequestHandler(CallToolRequestSchema, async (request: CallToolRequest): Promise<CallToolResult> => {

      switch (request.params.name) {

         case shouldRegenerateReadmeFunctionName: {
            const args = request.params.arguments;            
            const argStructured: IShouldRegenerateReadMeArgs = {
               directory: args?.directory as string | undefined,
               sourceFileExtensions: args?.sourceFileExtensions as string[] | undefined
            }
            const validatedArgs = shouldRegenerateReadMeFunction.validateArgs(argStructured);

            let result: string = "";
            try {
               result = await shouldRegenerateReadMeFunction.execute(validatedArgs);
            }
            catch (error) {
               throwMcpInternalError(`Error calling ${request.params.name}`);
            }
            return { content: [{ type: "text", text: result }] };
         }         
         case detectMermaidDiagramTypeToolName: {
            let result = await processMermaid(
               { mermaid: request.params.arguments?.mermaid as string | undefined },
               detectMermaidFunction);
            return { content: [{ type: "text", text: result }] };
         }

         case parseMermaidToolName: {
            let result = await processMermaid(
               { mermaid: request.params.arguments?.mermaid as string | undefined },
               parseMermaidFunction);
            return { content: [{ type: "text", text: result }] };
         }

         case previewMermaidToolName: {
            let result = await processMermaid(
               { mermaid: request.params.arguments?.mermaid as string | undefined },
               previewMermaidFunction);
            return { content: [{ type: "text", text: result }] };
         }         

         case previewExistingMermaidToolName: {
            let result = await processMermaidFile(
               { filePath: request.params.arguments?.filePath as string | undefined },
               previewExistingMermaidFunction);
            return { content: [{ type: "text", text: result }] };
         }

/*
         // Implemeneted these as a convenience to the user, but they seem to confuse the LLMs

         case getGenerateReadmePromptFunctionName: {
            const args = request.params.arguments;
            const argStructured: IGenerateReadmePromptArgs = {
               rootDirectory: args?.rootDirectory as string | undefined,
               languages: args?.language as string | undefined,
               wordsPerModule: args?.wordsPerModule as string | undefined
            }
            const validatedArgs = generateReadmePrompt.validateArgs(argStructured);

            let prompt: string = "";
            try {
               prompt = generateReadmePrompt.expandPrompt(validatedArgs);
            }
            catch (error) {
               throwMcpInternalError(`Error calling ${request.params.name}`);
            }
            return { content: [{ type: "text", text: prompt }] };
         }

         case getGenerateComponentC4DiagramPromptFunctionName: {
            const args = request.params.arguments;
            const argStructured: IGenerateComponentMermaidC4DiagramArgs = {
               rootDirectory: args?.rootDirectory as string | undefined
            }
            const validatedArgs = generateComponentC4Prompt.validateArgs(argStructured);

            let prompt: string = "";
            try {
               prompt = generateComponentC4Prompt.expandPrompt(validatedArgs);
            }
            catch (error) {
               throwMcpInternalError(`Error calling ${request.params.name}`);
            }
            return { content: [{ type: "text", text: prompt }] };
         }

         case getGenerateRollupC4DiagramPromptFunctionName: {
            const args = request.params.arguments;
            const argStructured: IGenerateRollupC4DiagramArgs = {
               rootDirectory: args?.rootDirectory as string | undefined,
               c4Type: args?.c4Type as string | undefined
            }
            const validatedArgs = generateRollupC4Prompt.validateArgs(argStructured);

            let prompt: string = "";
            try {
               prompt = generateRollupC4Prompt.expandPrompt(validatedArgs);
            }
            catch (error) {
               throwMcpInternalError(`Error calling ${request.params.name}`);
            }
            return { content: [{ type: "text", text: prompt }] };
         }
*/            

         default:
            throwMcpMethodNotFound("Tool not found");
      }
   });
}

async function processMermaid(args: IProcessMermaidArgs, tool: IFunction): Promise<string> {

   const validatedArgs = tool.validateArgs(args);

   let result: string = "";
   try {
      result = await tool.execute(validatedArgs);
   }
   catch (error) {
      throwMcpInternalError("Error processing mermaid");
   }
   return result;
}

async function processMermaidFile(args: IProcessExistingMermaidArgs, tool: IFunction): Promise<string> {

   const validatedArgs = tool.validateArgs(args);

   let result: string = "";
   try {
      result = await tool.execute(validatedArgs);
   }
   catch (error) {
      throwMcpInternalError("Error processing mermaid");
   }
   return result;
}