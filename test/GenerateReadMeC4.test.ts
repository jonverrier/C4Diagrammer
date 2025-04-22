/**
 * This module provides tests for the GenerateReadMePrompt module.
 * It includes tests for validating arguments and expanding prompts.
 * 
 * Copyright Jon Verrier, 2025
 */

import { expect } from 'chai';
import { generateReadmePrompt } from '../src/GenerateReadMePrompt.js';
import { C4DiagrammerName } from '../src/UIStrings.js';

describe('GenerateReadMePrompt', () => {
  describe('validateGenerateReadmeArgs', () => {
    it('should validate correct arguments with all parameters', () => {
      const args = {
        rootDirectory: '/test/path',
        languages: 'typescript',
        wordsPerModule: '100'
      };
      
      const result = generateReadmePrompt.validateArgs(args);
      expect(result).to.deep.equal(args);
    });

    it('should set default values when optional parameters are missing', () => {
      const args = {
        rootDirectory: '/test/path'
      };
      
      const result = generateReadmePrompt.validateArgs(args);
      expect(result).to.deep.equal({
        rootDirectory: '/test/path',
        languages: 'typescript',
        wordsPerModule: '50'
      });
    });

    it('should throw error when rootDirectory is undefined', () => {
      const args = {
        rootDirectory: undefined
      };
      
      expect(() => generateReadmePrompt.validateArgs(args))
        .to.throw();
    });

    it('should throw error when languages is not a string', () => {
      const args = {
        rootDirectory: '/test/path',
        languages: 123 as any
      };
      
      expect(() => generateReadmePrompt.validateArgs(args))
      .to.throw();
    });

    it('should throw error when wordsPerModule is not a number', () => {
      const args = {
        rootDirectory: '/test/path',
        wordsPerModule: 'not-a-number'
      };
      
      expect(() => generateReadmePrompt.validateArgs(args))
      .to.throw();
    });

    it('should throw error when args is null', () => {
      expect(() => generateReadmePrompt.validateArgs(null as any))
      .to.throw();
    });
  });

  describe('expandGenerateReadmePrompt', () => {
    it('should generate correct prompt string with all parameters', () => {
      const args = {
        rootDirectory: '/test/path',
        languages: 'typescript',
        wordsPerModule: '100'
      };
      
      const result = generateReadmePrompt.expandPrompt(args);

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
        wordsPerModule: '75'
      };
      
      const result = generateReadmePrompt.expandPrompt(args);
      
      expect(result).to.include('Use the ' + C4DiagrammerName + ' tool');
      expect(result).to.include('README.' + C4DiagrammerName + '.md');
    });

    it('should mention all key operations in the prompt', () => {
      const args = {
        rootDirectory: '/test/path',
        languages: 'typescript',
        wordsPerModule: '50'
      };
      
      const result = generateReadmePrompt.expandPrompt(args);
      
      expect(result).to.include('recursively list');
      expect(result).to.include('read every');
      expect(result).to.include('create a');
      expect(result).to.include('write a concatenated summary');
    });
  });

  describe('generateReadmePrompt object', () => {
    it('should have all required properties', () => {
      expect(generateReadmePrompt).to.have.property('name');
      expect(generateReadmePrompt).to.have.property('description');
      expect(generateReadmePrompt).to.have.property('validateArgs');
      expect(generateReadmePrompt).to.have.property('expandPrompt');
    });
  });
});