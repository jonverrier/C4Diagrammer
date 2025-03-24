/**
 * Test cases for the detectMermaidDiagramType function
 * 
 * Copyright Jon Verrier, 2025
 */

import { expect } from 'chai';
import { detectMermaidDiagramType, parseMermaid, parseMermaidInBrowser, noErrors } from '../src/ParseMermaid.js';

const mermaidTimeout = 7500; // First load of mermaid seems to take a lot of time & cuases random timeouts

let diagramWithSyntaxError = `C4Component
    title Component diagram for McpDoc Test Suite
    
    Person(tester, "Test Developer", "Maintains test suite")
    
    System_Boundary(test_suite, "McpDoc Test Suite") {
        Component(generator_tests, "Generator Tests", "Tests for README and C4 diagram generation")
        Component(mermaid_tests, "Mermaid Tests", "Tests for diagram parsing and preview")
        Component(util_tests, "Utility Tests", "Tests for regeneration logic")
        
        Rel(generator_tests, mermaid_tests, "Uses", "Validates diagram output")
        Rel(mermaid_tests, util_tests, "Uses", "Validates file handling")
    }
    
    System_Ext(chai, "Chai", "Testing assertion library")
    System_Ext(mermaidjs, "Mermaid.js", "Diagram library being tested")
    
    Rel(tester, test_suite, "Maintains", "Writes and runs tests")
    Rel(mermaid_tests, mermaidjs, "Tests", "Diagram functionality")`;

let diagramWithNoError = `C4Component
    title Component diagram for McpDoc Test Suite
    
    Person(tester, "Test Developer", "Maintains test suite")
    
    System_Boundary(test_suite, "McpDoc Test Suite") {
        Component(generator_tests, "Generator Tests", "Tests for README and C4 diagram generation")
        Component(mermaid_tests, "Mermaid Tests", "Tests for diagram parsing and preview")
        Component(util_tests, "Utility Tests", "Tests for regeneration logic")
        
        Rel(generator_tests, mermaid_tests, "Uses", "Validates diagram output")
        Rel(mermaid_tests, util_tests, "Uses", "Validates file handling")
    }
    
    System_Ext(chai, "Chai", "Testing assertion library")
    System_Ext(mermaidjs, "Mermaid.js", "Diagram library being tested")
    
    Rel(tester, generator_tests, "Maintains", "Writes and runs tests")
    Rel(mermaid_tests, mermaidjs, "Tests", "Diagram functionality")`;    

describe('detectMermaidDiagramType', () => {
   it('should detect a valid flowchart diagram', async () => {
      const input = `
            flowchart LR
                A --> B`;
      expect(await detectMermaidDiagramType(input)).to.equal('flowchart-v2');
   }).timeout(mermaidTimeout);

   it('should detect a valid sequence diagram', async () => {
      const input = `
            sequenceDiagram
                Alice->>John: Hello John, how are you?
                John-->>Alice: Great!`;
      expect(await detectMermaidDiagramType(input)).to.equal('sequence');
   }).timeout(mermaidTimeout);

   it('should detect a valid C4 diagram', async () => {
      const input = `
            C4Component
                title Component diagram
                Container_Boundary(b1, "boundary") {
                    Component(c1, "component")
                }`;
      expect(await detectMermaidDiagramType(input)).to.equal('c4');
   }).timeout(mermaidTimeout);

   it('should handle input without mermaid code fence markers', async () => {
      const input = `
            flowchart LR
                A --> B
        `;
      expect(await detectMermaidDiagramType(input)).to.equal('flowchart-v2');
   }).timeout(mermaidTimeout);

   it('should handle mangled syntax', async () => {
      const input = `
          flewchart LR
              A --> B
              Banana
      `;
      expect(await detectMermaidDiagramType(input)).to.equal('');
   }).timeout(mermaidTimeout);

   it('should return empty string for invalid diagram syntax', async () => {
      const input = `
            invalid diagram syntax`;
      expect(await detectMermaidDiagramType(input)).to.equal('');
   }).timeout(mermaidTimeout);

   it('should handle empty input', async () => {
      expect(await detectMermaidDiagramType('')).to.equal('');
   }).timeout(mermaidTimeout);

   it('should handle whitespace-only input', async () => {
      expect(await detectMermaidDiagramType('   \n   \t   ')).to.equal('');
   }).timeout(mermaidTimeout);

   it('should handle code fence markers', async () => {
      const input = `
          \`\`\`mermaid
          flowchart LR
              A --> B
          \`\`\`
      `;
      expect(await detectMermaidDiagramType(input)).to.equal('flowchart-v2');
   }).timeout(mermaidTimeout);

   it('should handle multiple code fence markers', async () => {
      const input = `
            \`\`\`mermaid
            \`\`\`mermaid
            flowchart LR
                A --> B
            \`\`\`
            \`\`\`
        `;
      expect(await detectMermaidDiagramType(input)).to.equal('flowchart-v2');
   }).timeout(mermaidTimeout);
});


describe('parseMermaid', () => {
   it('should validate correct flowchart syntax', async () => {
      const input = `
            flowchart LR
                A --> B
        `;
      expect(await parseMermaid(input)).to.equal(noErrors);
   }).timeout(mermaidTimeout);

   it('should detect simple syntax errors', async () => {
      const input = `
            flochart LR
                A --- > B
        `;
      expect(await parseMermaid(input)).to.not.equal(noErrors);
   }).timeout(mermaidTimeout);

   it('should detect C4 syntax errors', async () => {
      const input = diagramWithSyntaxError;
      expect(await parseMermaidInBrowser(input)).to.not.equal(noErrors);
   }).timeout(mermaidTimeout);

   it('should pass C4 without syntax errors', async () => {
      const input = diagramWithNoError;
      expect(await parseMermaidInBrowser(input)).to.equal(noErrors);
   }).timeout(mermaidTimeout);   

   it('should handle empty input', async () => {
      expect(await parseMermaid('')).to.not.equal(noErrors);
   }).timeout(mermaidTimeout);

   it('should handle whitespace-only input', async () => {
      expect(await parseMermaid('   \n   \t   ')).to.not.equal(noErrors);
   }).timeout(mermaidTimeout);

   it('should validate diagram with code fence markers', async () => {
      const input = `
            \`\`\`mermaid
            flowchart LR
                A --> B
            \`\`\`
        `;
      expect(await parseMermaid(input)).to.equal(noErrors);
   }).timeout(mermaidTimeout);

   it('should validate sequence diagram syntax', async () => {
      const input = `
            sequenceDiagram
                Alice->>John: Hello John, how are you?
                John-->>Alice: Great!
        `;
      expect(await parseMermaid(input)).to.equal(noErrors);
   }).timeout(mermaidTimeout);

   it('should detect errors in sequence diagram', async () => {
      const input = `
            sequenceDiagram
                Alice calls John: Missing arrow   
        `;
      expect(await parseMermaid(input)).to.not.equal(noErrors);
   }).timeout(mermaidTimeout);

   /* 
   TODO - we dont test this currently as need to mock DOMPurify
   See: https://github.com/mermaid-js/mermaid/issues/5204#issuecomment-1961715774 

   it('should validate C4 diagram syntax', async () => {
      const input = `
            C4Context
                title System Context diagram for Internet Banking System
                Person(customer, "Banking Customer", "A customer of the bank")
                Enterprise_Boundary(b0, "BankBoundary") {
                    System(banking_system, "Internet Banking System", "Allows customers to view information about their bank accounts")
                }
        `;

         expect(await parseMermaid(input)).to.equal(noErrors);
   }).timeout(mermaidTimeout);
   */ 
   it('should detect errors in malformed diagram', async () => {
      const input = `
            This is not a valid diagram
            Just some random text
        `;
      expect(await parseMermaid(input)).to.not.equal(noErrors);
   }).timeout(mermaidTimeout);
});
