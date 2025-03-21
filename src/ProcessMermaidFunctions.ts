

import { throwMcpInternalError, throwMcpInvalidArgs } from "./McpThrow.js";
import { IFunction, IArgs, FnValidateArgs, FnExecuteFunction } from './McpBridgeTypes.js';
import { detectMermaidDiagramType, parseMermaid } from "./ParseMermaid.js";
import { detectMermaidDiagramTypeToolName, detectMermaidDiagramTypeToolDesc, 
   parseMermaidToolDesc, parseMermaidToolName, previewMermaidToolName, previewMermaidToolDesc } from "./UIStrings.js";
import { previewMermaidDiagram } from "./PreviewMermaid.js";

export interface IProcessMermaidArgs extends IArgs {
   mermaid: string | undefined;
};

export interface IProcessValidatedMermaidArgs extends IArgs {
   mermaid: string;
};

function validateMermaidArgs(args: IProcessMermaidArgs): IProcessValidatedMermaidArgs {

   if (!args || typeof args.mermaid !== 'string') {
      throwMcpInvalidArgs ('Argument \'Mermaid\' must be a string');
   }

   return { mermaid: args.mermaid };
}

async function executeDetectMermaidDiagramType(args: IProcessValidatedMermaidArgs): Promise<string> {
   
   let detectedType: string | undefined = undefined;
   try {
      detectedType = await detectMermaidDiagramType(args.mermaid);
   } catch (error) {
      throwMcpInternalError("Error validating mermaid syntax");
   }
   return detectedType ?? "";
}

async function executeParseMermaid(args: IProcessValidatedMermaidArgs): Promise<string> {

   let parsed: string | undefined = undefined;
   try {
      return await parseMermaid(args.mermaid);
   } catch (error) {
      throwMcpInternalError("Error validating mermaid syntax");
   }
   return parsed ?? "";   
}

async function executePreviewMermaid(args: IProcessValidatedMermaidArgs): Promise<string> {
   return previewMermaidDiagram(args.mermaid);
}

export const detectMermaidFunction: IFunction = {
   name: detectMermaidDiagramTypeToolName,
   description: detectMermaidDiagramTypeToolDesc,
   validateArgs: validateMermaidArgs as unknown as FnValidateArgs,
   execute: executeDetectMermaidDiagramType as FnExecuteFunction
};

export const parseMermaidFunction: IFunction = {
   name: parseMermaidToolName,
   description: parseMermaidToolDesc,
   validateArgs: validateMermaidArgs as unknown as FnValidateArgs,
   execute: executeParseMermaid as FnExecuteFunction
};

export const previewMermaidFunction: IFunction = {
   name: previewMermaidToolName,
   description: previewMermaidToolDesc,
   validateArgs: validateMermaidArgs as unknown as FnValidateArgs,
   execute: executePreviewMermaid as FnExecuteFunction
};