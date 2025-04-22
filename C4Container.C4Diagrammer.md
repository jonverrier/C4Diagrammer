# C4Diagrammer System Architecture

```mermaid
C4Container
    title C4Diagrammer System Architecture

    Person(user, "Developer", "A software developer who wants to generate C4 diagrams from code")
    
    System_Boundary(c4diagrammer, "C4Diagrammer") {
        Container(coreSystem, "C4Diagrammer Core", "TypeScript", "Main application providing C4 diagram generation capabilities")
        Container(mcpServer, "MCP Server", "TypeScript", "Model Context Protocol server handling tool requests")
        Container(fileOps, "File Operations", "TypeScript", "Handles file system interactions")
        Container(mermaidProcessor, "Mermaid Processor", "TypeScript", "Processes and validates Mermaid.js diagrams")
    }
    
    System_Ext(browser, "Web Browser", "For previewing generated diagrams")
    System_Ext(filesystem, "File System", "Stores source code and generated diagrams")
    
    Rel(user, coreSystem, "Uses to generate C4 diagrams")
    Rel(coreSystem, mcpServer, "Communicates via")
    Rel(coreSystem, mermaidProcessor, "Uses for diagram processing")
    Rel(coreSystem, fileOps, "Uses for file access")
    Rel(mermaidProcessor, browser, "Sends diagrams for preview")
    Rel(fileOps, filesystem, "Reads from and writes to")
```

This C4 Container diagram shows the architecture of the C4Diagrammer system, which is designed to generate C4 architecture diagrams from code. The main components include:

- **C4Diagrammer Core**: The main application providing C4 diagram generation capabilities
- **MCP Server**: Model Context Protocol server handling tool requests
- **File Operations**: Module that handles file system interactions
- **Mermaid Processor**: Component that processes and validates Mermaid.js diagrams

The system interacts with external systems:
- Web Browser: Used for previewing generated diagrams
- File System: Stores source code and generated diagrams

The diagram illustrates the relationships between these components, showing how they collaborate to provide diagram generation functionality to developers.