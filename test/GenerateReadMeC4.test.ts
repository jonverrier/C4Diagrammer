/**
 * This module provides tests for the GenerateReadMePrompt module.
 * It includes tests for validating arguments and expanding prompts.
 * 
 * Copyright Jon Verrier, 2025
 */

import { expect } from 'chai';
import path from 'path';
import { C4DiagrammerName } from '../src/UIStrings.js';
import { PromptFileRepository, throwIfUndefined } from 'prompt-repository';
import { generateReadmePromptId } from '../src/PromptIds.js';

describe('GenerateReadMePrompt', () => {

  const repository = new PromptFileRepository(path.join(process.cwd(), 'src/Prompts.json'));
  const readmePrompt = repository.getPrompt(generateReadmePromptId);
  throwIfUndefined (readmePrompt);

  describe('validateGenerateReadmeArgs', () => {
    it('should validate correct arguments with all parameters', () => {
      const args = {
        rootDirectory: '/test/path',
        languages: 'typescript2',
        wordCount: '101'
      };
      
      const result = repository.expandUserPrompt (readmePrompt, args);
      expect(result).to.contain(args.rootDirectory);
      expect(result).to.contain(args.languages);
      expect(result).to.contain(args.wordCount);
    });

    it('should set default values when optional parameters are missing', () => {
      const args = {
        rootDirectory: '/test/path'
      };
      
      const result = repository.expandUserPrompt (readmePrompt, args);
      expect(result).to.contain(args.rootDirectory);
      expect(result).to.contain("Typescript");
      expect(result).to.contain("50");
    });

    it('should throw error when rootDirectory is not present', () => {
      const args = {
      };
      
      expect(() => repository.expandUserPrompt (readmePrompt, args))
        .to.throw();
    });

    it('should throw error when rootDirectory is undefined', () => {
      const args = {
        rootDirectory: undefined
      };
      
      expect(() => repository.expandUserPrompt (readmePrompt, args))
        .to.throw();
    });

    it('should throw error when languages is not a string', () => {
      const args = {
        rootDirectory: '/test/path',
        languages: 123 as any
      };
      
      expect(() => repository.expandUserPrompt (readmePrompt, args))
      .to.throw();
    });

    it('should throw error when wordCount is not a number', () => {
      const args = {
        rootDirectory: '/test/path',
        wordCount: 'not-a-number'
      };
      
      expect(() => repository.expandUserPrompt (readmePrompt, args))
      .to.throw();
    });

    it('should throw error when args is null', () => {
      expect(() => repository.expandUserPrompt (readmePrompt, null as any))
      .to.throw();
    });
  });

  describe('expandGenerateReadmePrompt', () => {
    it('should generate correct prompt string with all parameters', () => {
      const args = {
        rootDirectory: '/test/path',
        languages: 'typescript',
        wordCount: '100'
      };
      
      const result = repository.expandUserPrompt (readmePrompt, args);

      expect(result).to.be.a('string');
      expect(result).to.include('/test/path');
      expect(result).to.include('typescript');
      expect(result).to.include('100 word');
      expect(result).to.include('README.' + C4DiagrammerName + '.md');
    });

    it('should generate prompt with correct file system instructions', () => {
      const args = {
        rootDirectory: '/test/path',
        languages: 'javascript',
        wordCount: '75'
      };
      
      const result = repository.expandUserPrompt (readmePrompt, args);
      
      expect(result).to.include('Use the ' + C4DiagrammerName + ' tool');
      expect(result).to.include('README.' + C4DiagrammerName + '.md');
    });

    it('should mention all key operations in the prompt', () => {
      const args = {
        rootDirectory: '/test/path',
        languages: 'typescript',
        wordCount: '50'
      };
      
      const result = repository.expandUserPrompt (readmePrompt, args);
      
      expect(result).to.include('recursively list');
      expect(result).to.include('read every');
      expect(result).to.include('create a');
      expect(result).to.include('write a concatenated summary');
    });
  });

  describe('generateReadmePrompt object', () => {
    it('should have all required properties', () => {
      expect(readmePrompt).to.have.property('name');
      expect(readmePrompt).to.have.property('description');
      expect(readmePrompt).to.have.property('userPromptParameters');
    });
  });
});