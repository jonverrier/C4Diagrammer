/**
 * Tests for the previewMermaidDiagram function which generates and displays Mermaid diagrams
 * in a browser. T
 * 
 * Copyright Jon Verrier, 2025
 */

import { expect } from 'chai';
import { previewMermaidDiagram, previewMermaidDiagramFromFile } from '../src/PreviewMermaid.js';
import fs from 'fs';

describe('PreviewMermaidDiagram', () => {

   function verifyMermaidPreview(tempFile: string, diagram: string) {
      // Verify the file name is non-zero length
      expect(tempFile.length > 0).to.be.true;
      // Verify the file exists  
      expect(fs.existsSync(tempFile)).to.be.true;
      // Verify the file name includes 'preview'
      expect(tempFile).to.include('preview');

      // Get the content written to the file
      const content = fs.readFileSync(tempFile, 'utf8');
      // Verify the content includes the diagram
      expect(content).to.include(diagram);
      // Verify the content includes mermaid.initialize
      expect(content).to.include('mermaid.initialize');
      // should include required HTML elements
      expect(content).to.include('<script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js">');
      expect(content).to.include('<pre class="mermaid">');
      expect(content).to.include('mermaid.initialize');
   }   
   
   describe('previewMermaidDiagram', () => {

      it('should create HTML file with mermaid diagram', async () => {
         const diagram = 'graph TD; A-->B;';

         let tempFile = previewMermaidDiagram(diagram);
         verifyMermaidPreview(tempFile, diagram);

      }).timeout(10000);

      it('should handle empty diagram text', async () => {

         const tempFile = previewMermaidDiagram('');
         expect(fs.existsSync(tempFile)).to.be.true;

      }).timeout(10000);
   });

   describe('previewMermaidDiagramFromFile', () => {
  
      it('should successfully read file and return preview', () => {
        const testContent = '```mermaid\ngraph TD\nA-->B\n```';

        // Create temp test file
        const tempPath = `${process.env.TEMP || '/tmp'}/test-${Date.now()}.html`;
        fs.writeFileSync(tempPath, testContent);

        const result = previewMermaidDiagramFromFile(tempPath);

        verifyMermaidPreview(result, testContent);
      });
  
      it('should return empty string when file does not exist', () => {
        const testPath = '/test/path/nonexistent.md';
        
        const tempFile = previewMermaidDiagramFromFile('');
        expect(fs.existsSync(tempFile)).to.be.false;
      });
  
  
      it('should handle empty file content', () => {

         const tempPath = `${process.env.TEMP || '/tmp'}/test-${Date.now()}.html`;
         fs.writeFileSync(tempPath, '');

        const tempFile = previewMermaidDiagramFromFile(tempPath);
        expect(fs.existsSync(tempFile)).to.be.true;
      });
    });   
});


