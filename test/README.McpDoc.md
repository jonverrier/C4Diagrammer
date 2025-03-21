# McpDoc Test Documentation

## Test Module Summaries

### GenerateComponentC4.test.ts
Test suite for the GenerateComponentC4Prompt module. Validates argument handling and prompt expansion for C4 component diagram generation. Tests include validation of root directory arguments, error handling for invalid inputs, and verification of generated prompt content including C4 diagram instructions.

### GenerateReadMeC4.test.ts
Test suite for the GenerateReadMePrompt module. Verifies argument validation and prompt expansion for README generation. Tests cover handling of optional parameters, default values, error cases for invalid inputs, and proper formatting of generated prompts.

### GenerateRollupC4.test.ts
Test suite for the GenerateRollupC4Prompt module. Tests validation and expansion of prompts for generating high-level C4 diagrams. Includes tests for different C4 diagram types, argument validation, and proper inclusion of diagram instructions.

### ParseMermaid.test.ts
Tests for Mermaid diagram parsing functionality. Verifies detection and validation of different diagram types including flowcharts, sequence diagrams, and C4 diagrams. Includes error handling tests and syntax validation with various input formats.

### PreviewMermaid.test.ts
Tests for Mermaid diagram preview functionality. Verifies HTML generation for diagram previews, file handling, and proper inclusion of Mermaid initialization code. Tests both direct diagram preview and file-based preview methods.

### ShouldRegenerateReadMe.test.ts
Tests for the README regeneration decision logic. Verifies timestamp comparison between source files and README.McpDoc.md files. Includes tests for file extension filtering, multiple extension handling, and various timestamp scenarios.