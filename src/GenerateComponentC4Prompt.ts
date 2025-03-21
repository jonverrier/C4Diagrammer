/**
 * This module provides types and functions for generating C4 component diagrams.
 * It handles validation and expansion of prompts for creating C4Component.McpDoc.md files containing
 * Mermaid.js C4 component diagrams in source directories.
 * 
 * Copyright Jon Verrier, 2025
 */

import { throwMcpInvalidArgs } from "./McpThrow.js";
import { IPrompt, IArgs, FnValidateArgs, FnExpandPrompt } from './McpBridgeTypes.js';
import { generateComponentC4DiagramPromptDesc, generateComponentC4DiagramPromptName } from "./UIStrings.js";

export interface IGenerateComponentMermaidC4DiagramArgs extends IArgs {
   rootDirectory: string | undefined;
};

/**
 * Validates the arguments for the generateComponentMermaidC4Diagram prompt.
 * 
 * @param args - The arguments to validate
 * @returns The validated arguments
 */
function validateGenerateComponentC4DiagramArgs(args: IGenerateComponentMermaidC4DiagramArgs): IGenerateComponentMermaidC4DiagramArgs {

   if (!args || typeof args.rootDirectory !== 'string') {
      throwMcpInvalidArgs ('Argument \'RootDirectory\' must be a string');
   }

   const { rootDirectory } = args;
   
   return { rootDirectory };   
}


/**
 * Generates a prompt to create/update C4Component.McpDoc.md files containing Mermaid.js C4 component diagrams.
 * The prompt instructs to analyze README.McpDoc.md files in each subdirectory and generate corresponding
 * component-level C4 diagrams following Mermaid.js syntax and C4 model conventions.
 * 
 * @param args - Object containing rootDirectory parameter
 * @returns A prompt string that will generate C4Component.McpDoc.md files with valid Mermaid.js C4 diagrams
 */
function expandGenerateComponentC4DiagramPrompt(args: IGenerateComponentMermaidC4DiagramArgs): string {

   const { rootDirectory } = args;

   const prompt =`Use the filesystem tool to list all subdirectories of ${rootDirectory}. Ignore the \'node_modules\' subdirectory. Then ` +
                        'recursively seach each other subdirectory. If the subdirectory contains a file \'README.McpDoc.md\', then read the ' +
                        'contents of the file. and generate a C4Component Mermaid.js diagram from the contents. Use the provided tools to parse and ' +
                        'validate the generated diagram, and if it is valid, generate a preview, and write the markdown to a file named ' +
                        'C4Component.McpDoc.md in the same subdirectory, giving an absolute path to the tool.' +
                        'Your chain of thought:\n' +
                        '1) Use \'C4Component\' for the diagram type (avoid \'C4_Component\', PlantUML syntax, or any unrecognized element).\n' +
                        '2) Identify the primary user(s) and the main system element(s).\n' +
                        '3) If you see any non-standard C4 elements, convert them to valid Mermaid C4 elements like \'Person()\', \'Container()\', or \'System()\'.\n' +
                        '4) Group related nodes in \'System_Boundary()\' blocks if appropriate.\n' +
                        '5) Use \'System_Ext()\' for external systems or services.\n' +
                        '6) Only create relationships (\'Rel()\') between valid elements — refer to components by ID (not just strings). Only use \'Rel\', not \'Rel_Neighbor\'.\n' +
                        '7) Output only valid Mermaid code — no extra commentary or text —  which supports built-in rendering in markdown environments.\n' +
                        '8) Verify there are no lexical or syntax errors. If the markdown is not valid mermaid.js, try to diagnose the error using the parse ' +
                        'tool and try again.' 

   return prompt;
}


export let generateComponentC4Prompt : IPrompt = {
   name: generateComponentC4DiagramPromptName,
   description: generateComponentC4DiagramPromptDesc,
   validateArgs: validateGenerateComponentC4DiagramArgs as unknown as FnValidateArgs,
   expandPrompt: expandGenerateComponentC4DiagramPrompt as FnExpandPrompt
}
