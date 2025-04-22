# Test Directory Documentation

## Core Test Files

### ParseMermaid.test.ts
Comprehensive test suite for Mermaid diagram parsing functionality. Tests various diagram types including flowcharts, sequence diagrams, and C4 diagrams. Includes validation for syntax errors, empty inputs, whitespace handling, and code fence markers. Uses extended timeout for Mermaid.js initialization.

### GenerateRollupC4.test.ts
Tests for high-level C4 diagram generation functionality. Validates the creation of Context and Container level diagrams that aggregate component details from across the codebase. Ensures proper diagram hierarchy and relationship handling.

### GenerateComponentC4.test.ts
Test suite for component-level C4 diagram generation. Validates the creation and formatting of component diagrams, ensuring proper syntax and relationships between components.

### GenerateReadMeC4.test.ts
Tests the README generation functionality, ensuring proper documentation creation for different directory structures. Validates markdown formatting and content aggregation from source files.

## Utility Tests

### ShouldRegenerateReadMe.test.ts
Tests the logic that determines when README files should be regenerated. Validates timestamp comparison, file existence checks, and extension filtering functionality.

### FileFunctions.test.ts
Test suite for file system operations including reading, writing, and directory listing. Ensures proper error handling and file manipulation capabilities.

### PreviewMermaid.test.ts
Tests the browser-based preview functionality for Mermaid diagrams. Validates rendering and display logic for different diagram types.

## Configuration

### tsconfig.test.json
TypeScript configuration specific to the test environment. Defines compiler options and module resolution settings for test execution. 