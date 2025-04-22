```mermaid
C4Component
    title C4Diagrammer Test Architecture

    Person(developer, "Test Developer", "Developer maintaining C4Diagrammer tests")
    
    System_Boundary(test_suite, "C4Diagrammer Test Suite") {
        Container(core_tests, "Core Tests", "TypeScript", "Core functionality tests")
        Container(utility_tests, "Utility Tests", "TypeScript", "Support functionality tests")
        
        Component(parse_mermaid_test, "ParseMermaid.test", "TypeScript", "Tests Mermaid parsing")
        Component(generate_rollup_test, "GenerateRollupC4.test", "TypeScript", "Tests high-level C4 generation")
        Component(generate_component_test, "GenerateComponentC4.test", "TypeScript", "Tests component diagram generation")
        Component(generate_readme_test, "GenerateReadMeC4.test", "TypeScript", "Tests README generation")
        
        Component(regenerate_test, "ShouldRegenerateReadMe.test", "TypeScript", "Tests README regeneration logic")
        Component(file_functions_test, "FileFunctions.test", "TypeScript", "Tests file operations")
        Component(preview_test, "PreviewMermaid.test", "TypeScript", "Tests diagram preview")
    }

    System_Ext(test_runner, "Mocha", "Test execution environment")
    System_Ext(typescript, "TypeScript Compiler", "Test compilation")

    Rel(developer, core_tests, "Writes and maintains")
    Rel(developer, utility_tests, "Writes and maintains")
    Rel(core_tests, parse_mermaid_test, "Contains")
    Rel(core_tests, generate_rollup_test, "Contains")
    Rel(core_tests, generate_component_test, "Contains")
    Rel(core_tests, generate_readme_test, "Contains")
    Rel(utility_tests, regenerate_test, "Contains")
    Rel(utility_tests, file_functions_test, "Contains")
    Rel(utility_tests, preview_test, "Contains")
