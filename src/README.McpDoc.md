# McpDoc Source Code Documentation

## GenerateComponentC4Prompt.ts
Provides functionality for generating component-level C4 diagrams. Handles validation and expansion of prompts for creating C4Component.McpDoc.md files containing Mermaid.js C4 component diagrams in source directories.

## GenerateReadMePrompt.ts
Provides functionality for generating README documentation. Validates and expands prompts for creating README.McpDoc.md files in source directories, instructing LLMs to summarize source files.

## GenerateRollupC4Prompt.ts
Provides functionality for generating high-level C4 architecture diagrams. Contains validation and prompt logic for creating either C4 Context or Container level diagrams that aggregate component-level details.

## index.ts
Entry point that initializes and connects the MCP server.

## McpBridgeTypes.ts
Defines core interfaces for the MCP Documenter, including base types for prompt arguments, validation functions, and prompt expansion functions.

## McpFunctions.ts
Implements MCP server function handlers for working with Mermaid diagrams, including detecting diagram types and previewing diagrams in browsers.

## McpIndex.ts
Main entry point for the MCP Documenter server. Initializes the server, adds necessary functions and prompts, and starts the server.

## McpPrompts.ts
Defines prompt handlers for the MCP server to generate various types of documentation including READMEs and C4 diagrams.

## McpResources.ts
Provides resources to return documentation prompts. Implements resource handlers for listing and reading available documentation resources.

## McpThrow.ts
Implements error handling utilities for MCP Documenter. Provides functions to throw standardized MCP errors with specific error codes.

## MermaidTypes.ts
Defines valid C4 diagram types and provides validation functions to check if strings match valid diagram types.

## ParseMermaid.ts
Provides functionality for detecting and validating Mermaid diagram types. Uses mermaid.js to parse diagram text and determine diagram types.

## PreviewMermaid.ts
Implements functionality for previewing mermaid diagrams in a browser by generating HTML and opening it with the default browser.

## ProcessMermaidFunctions.ts
Implements core functions for working with Mermaid diagrams, including argument validation, diagram type detection, parsing, and preview functions.

## ShouldRegenerateReadMeFunction.ts
Provides logic to determine if README.McpDoc.md files should be regenerated based on source file modification timestamps.

## UIStrings.ts
Contains string constants used throughout the application, centralizing UI text, prompt names, and descriptions.