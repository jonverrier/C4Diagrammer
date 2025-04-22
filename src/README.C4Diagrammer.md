# Source Directory Documentation

## Core Files

### McpFunctions.ts
Core module that implements the Model Context Protocol server functionality. Provides handlers for various tools including Mermaid diagram detection, preview, and file operations. Implements the server's request handlers and tool registration system. Contains comprehensive type definitions and error handling for all supported operations.

### GenerateRollupC4Prompt.ts
Implements functionality for generating high-level C4 architecture diagrams. Handles validation and prompt generation for creating C4 Context or Container level diagrams that aggregate component-level details from across the codebase. Includes robust argument validation and detailed prompt construction following Mermaid.js syntax and C4 model conventions.

### UIStrings.ts
Central repository for string constants used throughout the application. Contains definitions for tool names, descriptions, parameter names, and their descriptions. Organized by functionality sections including README generation, C4 diagram generation, and file system operations. Ensures consistent string usage across the application.

## Mermaid Processing

### ProcessMermaidFunctions.ts
Implements core functionality for processing Mermaid.js diagrams, including detection, parsing, and preview capabilities. Handles diagram validation and browser-based visualization.

### ParseMermaid.ts
Provides parsing functionality for Mermaid diagrams, ensuring syntactic correctness and proper structure. Includes validation logic for different diagram types.

### PreviewMermaid.ts
Handles the browser-based preview functionality for Mermaid diagrams. Implements rendering and display logic for diagram visualization.

## Types and Utilities

### McpBridgeTypes.ts
Defines core type interfaces for the Model Context Protocol bridge implementation. Includes types for prompts, arguments, and function signatures.

### MermaidTypes.ts
Contains type definitions and validation logic for Mermaid diagram types. Includes enums and interfaces for different diagram formats.

### McpThrow.ts
Implements error handling utilities for the Model Context Protocol implementation. Provides standardized error throwing mechanisms.

## File Operations

### FileFunctions.ts
Implements file system operations including reading, writing, and directory listing. Provides robust error handling and file manipulation capabilities.

## Entry Points

### index.ts
Main entry point for the C4Diagrammer tool. Exports core functionality and initializes the application.

### McpIndex.ts
Secondary entry point specifically for Model Context Protocol functionality. Handles MCP server initialization and configuration. 