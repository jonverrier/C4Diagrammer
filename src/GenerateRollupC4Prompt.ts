/**
 * This module provides functionality for generating high-level C4 architecture diagrams.
 * It contains validation and prompt generation logic for creating either C4 Context
 * or Container level diagrams that roll up component-level details from across the codebase.
 * The generated diagrams follow Mermaid.js syntax and C4 model conventions.
 * 
 * Copyright Jon Verrier, 2025
 */

import { throwMcpInvalidArgs } from "./McpThrow.js";
import { isValidC4DiagramType } from "./MermaidTypes.js";
import { IMcpPrompt, IArgs, FnValidateArgs, FnExpandPrompt } from './McpBridgeTypes.js';
import { C4DiagrammerName, generateRollupC4DiagramPromptName, generateRollupC4DiagramPromptDesc } from "./UIStrings.js";

export interface IGenerateRollupC4DiagramArgs extends IArgs {
   rootDirectory: string | undefined;
   c4Type: string | undefined;
};

/**
 * Validates the arguments for the generateRollupMermaidC4Diagram prompt.
 * 
 * @param args - The arguments to validate
 * @returns The validated arguments
 */
function validateGenerateRollupC4DiagramArgs(args: IGenerateRollupC4DiagramArgs): IGenerateRollupC4DiagramArgs {

   if (!args || typeof args.rootDirectory !== 'string') {
      throwMcpInvalidArgs ('Argument \'RootDirectory\' must be a string');
   }

   if (!args || typeof args.c4Type !== 'string') {
      throwMcpInvalidArgs ( 'Argument \'C4Type\' must be a string');
   }

   if (args && args.c4Type && !isValidC4DiagramType(args.c4Type)) {
      throwMcpInvalidArgs ('Argument \'C4Type\' must be a valid C4 diagram type' );
   }

   const { rootDirectory, c4Type } = args;
   
   return { rootDirectory, c4Type };   
}

/**
 * Generates a prompt to create/update C4Context.' + C4DiagrammerName + '.md or C4Container.' + C4DiagrammerName + '.md files containing Mermaid.js C4 diagrams.
 * The prompt instructs to analyze all README.' + C4DiagrammerName + '.md files across subdirectories and generate a single high-level
 * C4 diagram (either Context or Container level) following Mermaid.js syntax and C4 model conventions.
 * 
 * @param args - Object containing rootDirectory and c4Type parameters
 * @returns A prompt string that will generate a C4Context.' + C4DiagrammerName + '.md or C4Container.' + C4DiagrammerName + '.md file with valid Mermaid.js C4 diagram
 */
function expandGenerateRollupC4DiagramPrompt(args: IGenerateRollupC4DiagramArgs): string {

   const { rootDirectory, c4Type } = args;

   const prompt = `Use the ${C4DiagrammerName} tool to list all subdirectories of ${rootDirectory}. Ignore the 'node_modules' subdirectory. Then ` +
                        `recursively search each other subdirectory for a file named 'README.${C4DiagrammerName}.md'. Concatenate the contents of all these ` +
                        `files, and generate a ${c4Type} Mermaid.js diagram from the contexts. Use the provided tools to parse and validate the ` +
                        `generated diagram, and if it is valid, generate a preview, and write the markdown to a file named ${c4Type}.${C4DiagrammerName}.md ` +
                        `in the directory ${rootDirectory}.` + 
                        'Your chain of thought:\n' +
                        `1) Use ${c4Type} for the diagram type (avoid 'C4_Component', PlantUML syntax, or any unrecognized element).\n` +
                        '2) Identify the primary user(s) and the main system element(s).\n' +
                        '3) If you see any non-standard C4 elements, convert them to valid Mermaid C4 elements like \'Person()\', \'Container()\', or \'System()\'.\n' +
                        '4) Group related nodes in \'System_Boundary()\' blocks if appropriate.\n' +
                        '5) Use \'System_Ext()\' for external systems or services.\n' +
                        '6) Only create relationships (\'Rel()\') between valid elements — refer to components by ID (not just strings). Only use \'Rel\', not \'Rel_Neighbor\'. Link to nodes directly, not to \'System_Boundary()\' blocks.\n' +
                        '7) Output only valid Mermaid code — no extra commentary or text —  which supports built-in rendering in markdown environments.\n' +
                        '8) Verify there are no lexical or syntax errors. If the markdown is not valid mermaid.js, try to diagnose the error using the parse ' +
                        'tool and try again.'

   return prompt;
}  

export let generateRollupC4Prompt : IMcpPrompt = {
   name: generateRollupC4DiagramPromptName,
   description: generateRollupC4DiagramPromptDesc,
   validateArgs: validateGenerateRollupC4DiagramArgs as unknown as FnValidateArgs,
   expandPrompt: expandGenerateRollupC4DiagramPrompt as FnExpandPrompt
}