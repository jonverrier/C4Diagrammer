/**
 * This module provides functionality for working with C4 diagram types.
 * It defines the valid C4 diagram types (Context, Component, Container, Deployment) and
 * provides validation to check if a string matches one of these types.
 * 
 * This module is used by the MCP Documenter server to validate C4 diagram type parameters
 * when generating Mermaid C4 diagrams.
 * 
 * Copyright Jon Verrier, 2025
 */


export enum C4DiagramType {
   C4Context = "C4Context",
   C4Component = "C4Component", 
   C4Container = "C4Container",
   C4Deployment = "C4Deployment"
}

/**
 * Validates if a string matches one of the C4DiagramType enum values
 * @param type String to validate
 * @returns true if string matches a C4DiagramType, false otherwise
 */
export function isValidC4DiagramType(type: string): boolean {
   switch (type) {
      case C4DiagramType.C4Context:
      case C4DiagramType.C4Component:
      case C4DiagramType.C4Container:
      case C4DiagramType.C4Deployment:
         return true;
      default:
         return false;
   }
}


