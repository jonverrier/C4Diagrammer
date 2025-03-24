/**
 * UIStrings.ts
 * 
 * This module contains string constants used throughout the application.
 */
// Global Names
export const mcpDocName = 'mcpDoc';

// Strings used in Prompt definitions 
export const generateReadmePromptName = 'generate_readme_files';
export const generateReadmePromptDesc = 'Generate a README.McpDoc.md file for each subdirectory that contains source code.';

export const generateComponentC4DiagramPromptName = 'generate_component_c4_diagrams';
export const generateComponentC4DiagramPromptDesc = 'Generate a C4Component.McpDoc.md file for each subdirectory that contains source code.';

export const generateRollupC4DiagramPromptName = 'generate_rollup_c4_diagram';
export const generateRollupC4DiagramPromptDesc = 'Generate a C4 diagram of the specific type from the context provided';

export const rootDirectoryParamName = 'RootDirectory';
export const rootDirectoryParamDesc = 'The root directory to use to scan for source files in subdirectories and write documentation.';

export const languagesParamName = 'Language(s)';
export const languagesParamDesc = 'The language(s) to direct the model to view as source code. The default is typescript. Other languages can be specified, if you want multiple then use a comma separated list.';

export const wordsPerModuleParamName = 'WordsPerModule';
export const wordsPerModuleParamDesc = 'The number of words to use to summarise each code module. The default is 50.';

export const c4TypeParamName = 'C4Type';
export const c4TypeParamDesc = 'The type of C4 diagram to generate. C4Context, C4Container, C4Component, or C4Deployment';

export const mermaidFileParamName = "FilePath";
export const mermaidFileParamDesc = "The path to the mermaid file to preview.";

// shouldRegenerateReadmeFunction
export const shouldRegenerateReadmeFunctionName = "should_regenerate_readme";
export const shouldRegenerateReadmeFunctionDesc = "Determine if the README.McpDoc.md file should be regenerated for a given directory.";
export const shouldRegenerateReadmeFunctionReturnDesc = "'True' if the README.McpDoc.md file should be regenerated, 'False' otherwise.";

export const directoryParamName = "Directory";
export const sourceFileExtensionsParamName = "SourceFileExtensions";

export const directoryParamDesc = "The directory to check for the timestamp of the README.McpDoc.md file.";
export const sourceFileExtensionsParamDesc = "The file extensions to use to check the timestamps of source files in the directory vs. the README.McpDoc.md file."

// detectMermaidDiagramTypeFunction
export const detectMermaidDiagramTypeToolName = "detect_mermaid_diagram_type";
export const detectMermaidDiagramTypeToolDesc = "Detect the mermaid diagram type represented in a text string";
export const detectmermaidDiagramReturnDesc = "The detected diagram type if possible, otherwise an empty string.";
export const mermaidParamName = "Mermaid";
export const mermaidParamDesc = "The mermaid.js diagram markdown text to process to see if a valid mermaid diagram is present.";

// parseMermaidFunction
export const parseMermaidToolName = "parse_mermaid";
export const parseMermaidToolDesc = "Parse a mermaid diagram represented in a text string";
export const parseMermaidReturnDesc = "'No errors' if the mermaid is parsed correctly, else an error message.";

// previewMermaidFunction
export const previewMermaidToolName = "preview_mermaid";
export const previewMermaidToolDesc = "Preview a mermaid diagram represented in a text string using the default browser";
export const previewMermaidReturnDesc = "'True' if the preview was successful, 'false' otherwise.";

// previewExistingMermaidDiagram
export const previewExistingMermaidToolName = "preview_existing_mermaid_diagram";
export const previewExistingMermaidToolDesc = "Preview a mermaid diagram from an existing markdown file using the default browser";
export const previewExistingMermaidReturnDesc = "'True' if the preview was successful, 'false' otherwise.";


