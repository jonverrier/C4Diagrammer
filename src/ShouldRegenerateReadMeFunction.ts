/**
 * This module provides functionality for generating high-level C4 architecture diagrams.
 * It contains validation and prompt generation logic for creating either C4 Context
 * or Container level diagrams that roll up component-level details from across the codebase.
 * The generated diagrams follow Mermaid.js syntax and C4 model conventions.
 * 
 * Copyright Jon Verrier, 2025
 */
   
import * as fs from 'fs';
import * as path from 'path';

import { throwMcpInvalidArgs } from "./McpThrow.js";
import { IFunction, IArgs, FnValidateArgs, FnExecuteFunction } from './McpBridgeTypes.js';
import { shouldRegenerateReadmeFunctionDesc, shouldRegenerateReadmeFunctionName } from "./UIStrings.js";

export interface IShouldRegenerateReadMeArgs extends IArgs {
   directory: string | undefined;
   sourceFileExtensions: string[] | undefined;
};

export interface IValidatedShouldRegenerateReadMeArgs extends IArgs {
   directory: string;
   sourceFileExtensions: string[];
};

/**
 * Validates the arguments for the generateRollupMermaidC4Diagram prompt.
 * 
 * @param args - The arguments to validate
 * @returns The validated arguments
 */
function validateShouldRegenerateReadmeArgs(args: IShouldRegenerateReadMeArgs): IValidatedShouldRegenerateReadMeArgs {

   if (!args || typeof args.directory !== 'string') {
      throwMcpInvalidArgs ('Argument \'Directory\' must be a string');
   }

   if (!args.sourceFileExtensions || !Array.isArray(args.sourceFileExtensions) || 
       args.sourceFileExtensions.length === 0 || 
       !args.sourceFileExtensions.every(ext => typeof ext === 'string')) {
      throwMcpInvalidArgs ('Argument \'SourceFileExtensions\' must be an array of string with at least one member' );
   }

   const { directory, sourceFileExtensions } = args;
   
   return { directory, sourceFileExtensions };   
}

/**
 * Executes the shouldRegenerateReadmeFunction.
 * 
 * @param args - a directory and an array of source file extensions
 * @returns True if any source files have been modified since the README.McpDoc.md file was last updated, otherwise False
 */
async function executeShouldRegenerateReadmeFunction(args: IValidatedShouldRegenerateReadMeArgs): Promise<string> {

   return shouldRegenerateReadMe (args);
}

export function shouldRegenerateReadMe (args: IShouldRegenerateReadMeArgs): string {

   const { directory } = args as { directory: string };

   const readmePath = path.join(directory, 'README.McpDoc.md');

   try {
      const stats = fs.statSync(readmePath);
      let readmeTimestamp = stats.mtime.toISOString();

      const sourceFiles = fs.readdirSync(directory);
      
      const sourceFilesWithExtensions = sourceFiles.filter(file => 
         args.sourceFileExtensions?.some(ext => file.endsWith(ext))
      );

      const hasNewerFile = sourceFilesWithExtensions.some(file => {
         const filePath = path.join(directory, file);
         const stats = fs.statSync(filePath);
         return stats.mtime.toISOString() >= readmeTimestamp;
      });

      return hasNewerFile ? 'True' : 'False';
      
   } catch (error) {
      // Return False if file doesn't exist
      return 'False';
   }   
}

export let shouldRegenerateReadMeFunction : IFunction = {
   name: shouldRegenerateReadmeFunctionName,
   description: shouldRegenerateReadmeFunctionDesc,
   validateArgs: validateShouldRegenerateReadmeArgs as unknown as FnValidateArgs,
   execute: executeShouldRegenerateReadmeFunction as FnExecuteFunction
}