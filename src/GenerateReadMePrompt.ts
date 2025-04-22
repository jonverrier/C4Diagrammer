/**
 * This module provides types and functions for generating README documentation.
 * It handles validation and expansion of prompts for creating README.' + C4DiagrammerName + '.md files in source directories, 
 * prompting the LLM to create a summary of each source file it finds.
 * 
 * Copyright Jon Verrier, 2025
 */

import { throwMcpInvalidArgs } from "./McpThrow.js";

import { IPrompt, IArgs, FnValidateArgs, FnExpandPrompt } from './McpBridgeTypes.js';

import {
   generateReadmePromptName,
   generateReadmePromptDesc,
   C4DiagrammerName
} from './UIStrings.js';

/**
 * Interface for arguments passed to the generateReadme prompt.
 * 
 * @property rootDirectory - The root directory to scan for source files and write documentation
 * @property languages - Optional comma-separated list of programming languages to scan for. Defaults to typescript
 * @property wordsPerModule - Optional number of words to use in module summaries. Defaults to 50
 */
export interface IGenerateReadmePromptArgs extends IArgs {
   rootDirectory: string | undefined;
   languages: string | undefined;
   wordsPerModule: string | undefined;
};

/**
 * Validates the arguments for the generateReadme prompt.
 * 
 * @param args - The arguments to validate
 * @returns The validated arguments
 */
function validateGenerateReadmeArgs(args: IGenerateReadmePromptArgs): IGenerateReadmePromptArgs {

   if (!args || typeof args.rootDirectory !== 'string') {
      throwMcpInvalidArgs ('Argument \'RootDirectory\' must be a string');
   }

   if (args && args.languages && typeof args.languages !== 'string') {
      throwMcpInvalidArgs ('Argument \'Language(s)\', if provided, must be a string');
   }

   if (args && args.wordsPerModule && isNaN(Number(args.wordsPerModule))) {
      throwMcpInvalidArgs ('Argument \'WordsPerModule\', if provided, must be a number');
   }

   let { rootDirectory, languages, wordsPerModule } = args;
   if (!wordsPerModule) {
      wordsPerModule = '50';
   }
   if (!languages) {
      languages = 'typescript';
   }
   
   return { rootDirectory, languages, wordsPerModule };   
}

/**
 * Generates a prompt to create/update README.' + C4DiagrammerName + '.md files in subdirectories containing source code.
 * The prompt instructs to check timestamps and only update READMEs when source files are newer.
 * 
 * @param args - Object containing rootDirectory, languages, and wordsPerModule parameters
 * @returns A prompt string that will generate README.' + C4DiagrammerName + '.md files
 */
function expandGenerateReadmePrompt(args: IGenerateReadmePromptArgs): string {

   const { rootDirectory, languages, wordsPerModule } = args;


   const prompt = `Use the ${C4DiagrammerName} tool to list all subdirectories of ${rootDirectory}. Ignore any 'node_modules' subdirectories. Then ` +
                 `recursively list the contents of each other subdirectory (apart from any 'node_modules' subdirectories) for ${languages} files. ` +
                 `If the subdirectory contains one or more ${languages} files, call the ${C4DiagrammerName} tool 'should_regenerate_readme' to see if the README file ` +
                 `should be regenerated. If the README file should be regenerated, then read every ${languages} file in the subdirectory, and create ` +
                 `a ${wordsPerModule} word summary of the file in markdown format intended to brief new developers on its content. Accumulate all ` +
                 `the summaries and write a concatenated summary into a file named README.${C4DiagrammerName}.md in the same subdirectory, giving an absolute ` +
                 `path to the tool.`;

   return prompt;
}

export let generateReadmePrompt : IPrompt = {
   name: generateReadmePromptName,
   description: generateReadmePromptDesc,
   validateArgs: validateGenerateReadmeArgs as unknown as FnValidateArgs,
   expandPrompt: expandGenerateReadmePrompt as FnExpandPrompt
}
