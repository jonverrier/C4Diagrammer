# McpDoc Source Code Documentation

## File Summaries

### GenerateComponentC4Prompt.ts
Module for generating C4 component diagrams. Provides types and functions for creating C4Component.McpDoc.md files containing Mermaid.js C4 component diagrams in source directories. Includes validation and prompt expansion functionality.

### GenerateReadMePrompt.ts
Core module for README documentation generation. Handles validation and expansion of prompts for creating README.McpDoc.md files in source directories. Supports configurable language selection and word count parameters.

### GenerateRollupC4Prompt.ts
Generates high-level C4 architecture diagrams. Creates either Context or Container level diagrams that aggregate component-level details across the codebase. Implements validation and prompt generation following Mermaid.js syntax.

### index.ts
Entry point for the application that initializes and connects the server using the connectServer function from McpIndex.

### McpBridgeTypes.ts
Defines core interfaces and types for the MCP Documenter. Includes base interfaces for prompt arguments, validation functions, and prompt expansion. Essential for type safety across the application.

### McpFunctions.ts
Implements function handlers for the Model Context Protocol server. Provides tools for working with Mermaid diagrams, including diagram type detection and preview functionality.

### McpIndex.ts
Main entry point module that initializes the MCP Documenter server. Sets up server configuration, adds functions, prompts, and resources before starting the server.

### McpPrompts.ts
Manages prompts for the MCP Documenter server. Implements handlers for generating documentation including README files and C4 diagrams at different levels.

### McpResources.ts
Provides resource management for documentation prompts. Handles listing and reading of documentation resources like README and C4 diagram templates.

### McpThrow.ts
Error handling module for MCP operations. Implements specialized error throwing functions for invalid arguments, internal errors, and method not found scenarios.

### MermaidTypes.ts
Defines and validates C4 diagram types. Provides enumeration of valid C4 diagram types (Context, Component, Container, Deployment) and validation functions.

### ParseMermaid.ts
Implements Mermaid diagram parsing and validation. Uses mermaid.js library to detect diagram types and validate syntax, handling various diagram formats.

### PreviewMermaid.ts
Enables browser-based preview of Mermaid diagrams. Creates temporary HTML files for diagram visualization and handles cleanup after preview.

### ProcessMermaidFunctions.ts
Core processing module for Mermaid diagrams. Implements functions for detecting, parsing, and previewing diagrams with proper validation and error handling.

### ShouldRegenerateReadMeFunction.ts
Determines when README files need regeneration. Compares timestamps between source files and documentation to trigger updates when necessary.

### UIStrings.ts
Central repository for application string constants. Contains names, descriptions, and parameter definitions used throughout the application interface.