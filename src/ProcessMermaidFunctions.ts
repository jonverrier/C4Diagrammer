/**
 * This module provides functions for working with Mermaid diagrams.
 * It implements:
 * - Argument validation for Mermaid diagram processing
 * - Functions for detecting diagram types
 * - Functions for parsing diagrams
 * - Functions for previewing diagrams in a browser
 * 
 * Copyright Jon Verrier, 2025
 */



import fs from 'fs';

import { throwMcpInternalError, throwMcpInvalidArgs } from "./McpThrow.js";
import { IMcpFunction, IArgs, FnValidateArgs, FnExecuteFunction } from './McpBridgeTypes.js';
import { detectMermaidDiagramType, parseMermaidInBrowser } from "./ParseMermaid.js";
import { detectMermaidDiagramTypeToolName, detectMermaidDiagramTypeToolDesc, 
   parseMermaidToolDesc, parseMermaidToolName, previewMermaidToolName, previewMermaidToolDesc,
   previewExistingMermaidToolName, previewExistingMermaidToolDesc } from "./UIStrings.js";
import { previewMermaidDiagram, previewMermaidDiagramFromFile } from "./PreviewMermaid.js";

export interface IProcessMermaidArgs extends IArgs {
   mermaid: string | undefined;
};

export interface IProcessValidatedMermaidArgs extends IArgs {
   mermaid: string;
};

export interface IProcessExistingMermaidArgs extends IArgs {
   filePath: string | undefined;
};

export interface IProcessValidatedExistingMermaidArgs extends IArgs {
   filePath: string;
};

function validateMermaidArgs(args: IProcessMermaidArgs): IProcessValidatedMermaidArgs {

   if (!args || typeof args.mermaid !== 'string') {
      throwMcpInvalidArgs ('Argument \'Mermaid\' must be a string');
   }

   return { mermaid: args.mermaid };
}

function validateExistingMermaidArgs(args: IProcessExistingMermaidArgs): IProcessValidatedExistingMermaidArgs {

   if (!args || typeof args.filePath !== 'string') {
      throwMcpInvalidArgs ('Argument \'FilePath\' must be a string');
   }

   if (!fs.existsSync(args.filePath)) {
      throwMcpInvalidArgs ('File does not exist');
   }

   return { filePath: args.filePath };
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
      return await parseMermaidInBrowser(args.mermaid);
   } catch (error) {
      throwMcpInternalError("Error validating mermaid syntax");
   }
   return parsed ?? "";   
}

async function executePreviewMermaid(args: IProcessValidatedMermaidArgs): Promise<string> {
   return previewMermaidDiagram(args.mermaid);
}

async function executePreviewExistingMermaid(args: IProcessValidatedExistingMermaidArgs): Promise<string> {
   return previewMermaidDiagramFromFile(args.filePath);
}

// Function to detect the type of a mermaid diagram (C4Context, C4Container, C4Component, or C4Deployment)
export const detectMermaidFunction: IMcpFunction = {
   name: detectMermaidDiagramTypeToolName,
   description: detectMermaidDiagramTypeToolDesc,
   validateArgs: validateMermaidArgs as unknown as FnValidateArgs,
   execute: executeDetectMermaidDiagramType as FnExecuteFunction
};

// Function to parse a mermaid diagram and return errors if there are syntax errors
export const parseMermaidFunction: IMcpFunction = {
   name: parseMermaidToolName,
   description: parseMermaidToolDesc,
   validateArgs: validateMermaidArgs as unknown as FnValidateArgs,
   execute: executeParseMermaid as FnExecuteFunction
};

// Function to preview a mermaid diagram in a browser
export const previewMermaidFunction: IMcpFunction = {
   name: previewMermaidToolName,
   description: previewMermaidToolDesc,
   validateArgs: validateMermaidArgs as unknown as FnValidateArgs,
   execute: executePreviewMermaid as FnExecuteFunction
};

// Function to preview a mermaid diagram from a file
export const previewExistingMermaidFunction: IMcpFunction = {
   name: previewExistingMermaidToolName,
   description: previewExistingMermaidToolDesc,
   validateArgs: validateExistingMermaidArgs as unknown as FnValidateArgs,
   execute: executePreviewExistingMermaid as FnExecuteFunction
};