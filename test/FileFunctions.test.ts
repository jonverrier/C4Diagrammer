import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { setFileDirectories, readFileFunction, writeFileFunction, listDirectoryFunction } from '../src/FileFunctions.js';

chai.use(chaiAsPromised);
const { expect } = chai;

describe('File Functions', () => {

   const testDir = path.join(os.tmpdir(), 'mcp-test');
   const testFilePath = path.join(testDir, 'test.txt');
   const testContent = 'Hello, World!';

   beforeEach(async () => {
      // Create test directory
      await fs.mkdir(testDir, { recursive: true });
      setFileDirectories([testDir]);
   });

   afterEach(async () => {
      // Clean up test files
      try {
         await fs.rm(testDir, { recursive: true, force: true });
      } catch (error) {
         // Ignore cleanup errors
      }
   });

   describe('readFileFunction', () => {
      it('should read file content successfully', async () => {
         // Setup
         await fs.writeFile(testFilePath, testContent);

         // Execute
         const result = await readFileFunction.execute({ filePath: testFilePath });

         // Verify
         expect(result).to.equal(testContent);
      });

      it('should throw error when file does not exist', async () => {
         const nonExistentFile = path.join(testDir, 'nonexistent.txt');

         await expect(readFileFunction.execute({ filePath: nonExistentFile }))
            .to.be.rejected;
      });

      it('should throw error when filePath is invalid', async () => {
         await expect(readFileFunction.execute({ filePath: '' }))
            .to.be.rejected;
      });
   });

   describe('writeFileFunction', () => {
      it('should write content to file successfully', async () => {
         // Execute
         const result = await writeFileFunction.execute({
            filePath: testFilePath,
            content: testContent
         });

         // Verify
         expect(result).to.include('Successfully wrote to');

         const writtenContent = await fs.readFile(testFilePath, 'utf-8');
         expect(writtenContent).to.equal(testContent);
      });

      it('should throw error when filePath is invalid', async () => {
         await expect(writeFileFunction.execute({
            filePath: '',
            content: testContent
         }))
            .to.be.rejected;
      });

      it('should throw error when content is invalid', async () => {
         await expect(writeFileFunction.execute({
            filePath: testFilePath,
            content: undefined as any
         }))
            .to.be.rejected;
      });
   });

   describe('listDirectoryFunction', () => {
      it('should list directory contents successfully', async () => {
         // Setup
         await fs.writeFile(testFilePath, testContent);
         const subDir = path.join(testDir, 'subdir');
         await fs.mkdir(subDir);

         // Execute
         const result = await listDirectoryFunction.execute({ directoryPath: testDir });

         // Verify
         expect(result).to.include('[FILE] test.txt');
         expect(result).to.include('[DIR] subdir');
      });

      it('should throw error when directory does not exist', async () => {
         const nonExistentDir = path.join(testDir, 'nonexistent');

         await expect(listDirectoryFunction.execute({ directoryPath: nonExistentDir }))
            .to.be.rejected;
      });

      it('should throw error when directoryPath is invalid', async () => {
         await expect(listDirectoryFunction.execute({ directoryPath: '' }))
            .to.be.rejected;
      });
   });
}); 