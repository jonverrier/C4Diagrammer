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
   mermaidFileParamDesc,
   listDirectoryParamDesc,
   listDirectoryReturnDesc,
   listDirectoryToolDesc,
   listDirectoryToolName,
   readFileParamDesc,
   readFileReturnDesc,
   readFileToolDesc,
   readFileToolName,
   writeFileParamDesc,
   writeFileReturnDesc,
   writeFileToolDesc,
   writeFileToolName
} from "./UIStrings.js";

import { IMcpFunction } from "./McpBridgeTypes.js";

import {
  detectMermaidFunction,
  IProcessExistingMermaidArgs,
  IProcessMermaidArgs,
  parseMermaidFunction,
  previewExistingMermaidFunction,
  previewMermaidFunction
} from "./ProcessMermaidFunctions.js";

import { listDirectoryFunction, readFileFunction, writeFileFunction } from "./FileFunctions.js";

 
/**
 * Adds the Mermaid diagram detection and preview tools to the server.
 * @param server The server instance to add the tools to
 */
export function addFunctions(server: Server): void {

   server.setRequestHandler(ListToolsRequestSchema, async (): Promise<ListToolsResult> => {

      return {
         tools: [
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
            },
            {
               name: readFileToolName,
               description: readFileToolDesc,
               inputSchema: {
                  type: "object",
                  properties: {
                     filePath: { type: "string", description: readFileParamDesc }
                  },
                  required: ["filePath"]
               },
               outputSchema: {
                  type: "object",
                  properties: {
                     toolResult: { type: "string", description: readFileReturnDesc }
                  },
                  required: ["toolResult"]
               }
            },
            {
               name: writeFileToolName,
               description: writeFileToolDesc,
               inputSchema: {
                  type: "object",
                  properties: {
                     filePath: { type: "string", description: writeFileParamDesc }
                  },
                  required: ["filePath"]
               },
               outputSchema: {
                  type: "object",
                  properties: {
                     toolResult: { type: "string", description: writeFileReturnDesc }
                  },
                  required: ["toolResult"]
               }
             },
             {
               name: listDirectoryToolName,
               description: listDirectoryToolDesc,
               inputSchema: {
                  type: "object",
                  properties: {
                     directoryPath: { type: "string", description: listDirectoryParamDesc }
                  },
                  required: ["directoryPath"]
               },
               outputSchema: {
                  type: "object",
                  properties: {
                     toolResult: { type: "string", description: listDirectoryReturnDesc }
                  },
                  required: ["toolResult"]
               }
             },            
         ]
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

         case readFileToolName: {
            const parsed = readFileFunction.validateArgs( { filePath: request.params.arguments?.filePath as string | undefined });
            const content = await readFileFunction.execute(parsed);
            return {
              content: [{ type: "text", text: content }],
            };
          }
    
         case writeFileToolName: {
            const parsed = writeFileFunction.validateArgs({ 
              filePath: request.params.arguments?.filePath as string | undefined,
              content: request.params.arguments?.content as string | undefined 
            });
            const content = await writeFileFunction.execute(parsed);
            return {
              content: [{ type: "text", text: content }],
            };
          }
       
         case listDirectoryToolName: {
            const parsed = listDirectoryFunction.validateArgs({ directoryPath: request.params.arguments?.directoryPath as string | undefined });
            const content = await listDirectoryFunction.execute(parsed);
            return {
              content: [{ type: "text", text: content }],
            };
          }
         default:
            throwMcpMethodNotFound("Tool not found");
      }
   });
}

async function processMermaid(args: IProcessMermaidArgs, tool: IMcpFunction): Promise<string> {

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

async function processMermaidFile(args: IProcessExistingMermaidArgs, tool: IMcpFunction): Promise<string> {

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