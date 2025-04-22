```mermaid
C4Component
    title C4Diagrammer Component Architecture

    Person(user, "Developer", "Software developer using C4Diagrammer")
    
    System_Boundary(c4_diagrammer, "C4Diagrammer Tool") {
        Container(core, "Core Module", "TypeScript", "Core MCP server functionality")
        Container(mermaid_processor, "Mermaid Processor", "TypeScript", "Mermaid diagram processing and validation")
        Container(file_ops, "File Operations", "TypeScript", "File system operations")
        
        Component(mcp_functions, "McpFunctions", "TypeScript", "Implements MCP server handlers")
        Component(generate_rollup, "GenerateRollupC4", "TypeScript", "Generates high-level C4 diagrams")
        Component(process_mermaid, "ProcessMermaid", "TypeScript", "Core Mermaid processing")
        Component(parse_mermaid, "ParseMermaid", "TypeScript", "Mermaid syntax validation")
        Component(preview_mermaid, "PreviewMermaid", "TypeScript", "Browser-based preview")
        Component(file_functions, "FileFunctions", "TypeScript", "File system operations")
    }

    System_Ext(browser, "Web Browser", "For diagram preview")
    System_Ext(filesystem, "File System", "Local storage")

    Rel(user, core, "Uses")
    Rel(core, mcp_functions, "Implements")
    Rel(core, generate_rollup, "Uses")
    Rel(mermaid_processor, process_mermaid, "Uses")
    Rel(mermaid_processor, parse_mermaid, "Validates")
    Rel(mermaid_processor, preview_mermaid, "Renders")
    Rel(preview_mermaid, browser, "Opens")
    Rel(file_ops, file_functions, "Uses")
