# C4Diagrammer Source Code Documentation

## Core Files

### index.ts
Entry point for the C4Diagrammer application that exports the main functionality and types.

### McpIndex.ts
Main integration point with the Model Context Protocol (MCP), setting up the core functionality and exports.

### McpBridgeTypes.ts
Defines the core TypeScript interfaces and types for the MCP bridge implementation. Includes interfaces for arguments, validation functions, and prompt handling. Provides utilities for converting between different prompt formats.

### McpFunctions.ts
Implements the main MCP function implementations and business logic for the C4Diagrammer.

### McpThrow.ts
Error handling utilities for MCP-related operations, providing standardized error throwing mechanisms.

## Mermaid Diagram Processing

### ProcessMermaidFunctions.ts
Core functionality for working with Mermaid diagrams, including type detection, parsing, and preview capabilities. Implements argument validation and browser-based diagram processing.

### ParseMermaid.ts
Implements the parsing logic for Mermaid diagrams, handling syntax validation and diagram type detection.

### PreviewMermaid.ts
Provides functionality to preview Mermaid diagrams in a browser, supporting both direct string input and file-based diagrams.

### MermaidTypes.ts
Type definitions and interfaces specific to Mermaid diagram processing and validation.

## File and Documentation Handling

### FileFunctions.ts
Implements file system operations including reading, writing, and directory listing with proper error handling and validation.

### ShouldRegenerateReadMeFunction.ts
Logic for determining when README.C4Diagrammer.md files should be regenerated based on source file changes.

## Configuration and Constants

### UIStrings.ts
Centralized location for string constants used throughout the application, including tool names, parameter descriptions, and documentation strings.

### PromptIds.ts
Defines constant identifiers for various prompts used in the system.

### McpPrompts.ts
Implements prompt handling and management for the MCP integration, including prompt expansion and parameter validation. 