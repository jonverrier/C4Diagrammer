/**
 * This module provides a function for previewing mermaid diagrams in a browser.
 * It writes a temporary HTML file and then uses 'exec'' to open the diagram in the default browser.
 * The temp file is deleted after a tim
 * 
 * Copyright Jon Verrier, 2025
 */


import { exec } from 'child_process';
import fs from 'fs';

const delayUntilDelete = 60000;

function generatePreviewHtml(fileContent: string): string {
   return `
<!DOCTYPE html>
<html>
   <head>
      <title>Mermaid Preview</title>
      <script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
      <script>
         mermaid.initialize({ startOnLoad: true });
      </script>
   </head>
   <body>
      <pre class="mermaid">
         ${fileContent}
      </pre>
   </body>
</html>
`;
}

/**
 * Generates a preview of a mermaid diagram
 * @param text The mermaid text of diagram to generate
 * @returns the name of the temp preview file if the diagram was generated successfully, empty string otherwise
 */
export function previewMermaidDiagram(text: string): string {

   const tempPath = `${process.env.TEMP || '/tmp'}/preview-${Date.now()}.html`;

   try {
      // Write HTML to temp file
      fs.writeFileSync(tempPath, generatePreviewHtml(text));

      // Open in default browser
      let didExec = false;
      try {
         exec('start ' + tempPath);
         didExec = true;
      } catch {
         didExec = false;
      }

      // Clean up temp file after 60 seconds delay
      setTimeout(() => {
         fs.unlink(tempPath, (err) => {});
      }, delayUntilDelete);

      return didExec ? tempPath : '';

   } catch (error) {
      return '';
   }
}

/**
 * Generates a preview of a mermaid diagram from a markdown file
 * @param filePath Path to the markdown file containing the mermaid diagram
 * @returns the name of the temp preview file if the diagram was generated successfully, empty string otherwise
 */
export function previewMermaidDiagramFromFile(filePath: string): string {
   try {
      // Read markdown file
      const fileContent = fs.readFileSync(filePath, 'utf8');

      return previewMermaidDiagram(fileContent);
   }
   catch (error) {
      return '';
   }
}

