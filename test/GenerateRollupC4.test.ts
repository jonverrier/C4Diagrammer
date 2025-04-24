/**
 * This module provides tests for the GenerateRollupC4Prompt module.
 * It includes tests for validating arguments and expanding prompts.
 * 
 * Copyright Jon Verrier, 2025
 */

import { expect } from 'chai';
import path from 'path';

import { C4DiagrammerName } from '../src/UIStrings.js';
import { PromptFileRepository, throwIfUndefined } from 'prompt-repository';
import { generateRollupC4DiagramPromptId } from '../src/PromptIds.js';

describe('GenerateRollupC4Prompt', () => {

   const repository = new PromptFileRepository(path.join(process.cwd(), 'src/Prompts.json'));
   const rollupC4Prompt = repository.getPrompt(generateRollupC4DiagramPromptId);
   throwIfUndefined (rollupC4Prompt);

  describe('validateGenerateRollupC4DiagramArgs', () => {
    it('should validate correct arguments', () => {
      const args = {
        rootDirectory: '/test/path',
        c4Type: 'C4Context'
      };
      
      const result = repository.expandUserPrompt(rollupC4Prompt, args);
      expect(result).to.contain(args.rootDirectory);
      expect(result).to.contain(args.c4Type);
    });

    it('should throw error when rootDirectory is undefined', () => {
      const args = {
        rootDirectory: undefined,
        c4Type: 'C4Context'
      };
      
      expect(() => repository.expandUserPrompt(rollupC4Prompt, args))
        .to.throw();
    });

    it('should throw error when c4Type is undefined', () => {
      const args = {
        rootDirectory: '/test/path',
        c4Type: undefined
      };
      
      expect(() => repository.expandUserPrompt(rollupC4Prompt, args))
        .to.throw();
    });

    it('should throw error when c4Type is invalid type', () => {
      const args = {
        rootDirectory: '/test/path',
        c4Type:  1 as any
      };
      
      expect(() => repository.expandUserPrompt(rollupC4Prompt, args))
        .to.throw();
    });

    it('should throw error when c4Type is not an allowed value', () => {
      const args = {
        rootDirectory: '/test/path',
        c4Type: 'InvalidC4Type'
      };
      
      expect(() => repository.expandUserPrompt(rollupC4Prompt, args))
        .to.throw();
    });    

    it('should throw error when args is null', () => {
      expect(() => repository.expandUserPrompt(rollupC4Prompt, null as any))
        .to.throw();
    });
  });

  describe('expandGenerateRollupC4DiagramPrompt', () => {
    it('should generate correct prompt string for C4Context', () => {
      const args = {
        rootDirectory: '/test/path',
        c4Type: 'C4Context'
      };
      
      const result = repository.expandUserPrompt(rollupC4Prompt, args);
      
      expect(result).to.be.a('string');
      expect(result).to.include('/test/path');
      expect(result).to.include('C4Context');
      expect(result).to.include('README.' + C4DiagrammerName + '.md');
      expect(result).to.include('C4Context.' + C4DiagrammerName + '.md');
    });

    it('should generate correct prompt string for C4Container', () => {
      const args = {
        rootDirectory: '/test/path',
        c4Type: 'C4Container'
      };
      
      const result = repository.expandUserPrompt(rollupC4Prompt, args);
      
      expect(result).to.include('C4Container');
      expect(result).to.include('C4Container.' + C4DiagrammerName + '.md');
    });

    it('should include all required C4 diagram instructions', () => {
      const args = {
        rootDirectory: '/test/path',
        c4Type: 'C4Context'
      };
      
      const result = repository.expandUserPrompt(rollupC4Prompt, args);
      
      expect(result).to.include('Person()');
      expect(result).to.include('Container()');
      expect(result).to.include('System()');
      expect(result).to.include('System_Boundary()');
      expect(result).to.include('System_Ext()');
      expect(result).to.include('Rel()');
    });

    it('should include tool instructions', () => {
      const args = {
        rootDirectory: '/test/path',
        c4Type: 'C4Context'
      };
      
      const result = repository.expandUserPrompt(rollupC4Prompt, args);
      
      expect(result).to.include('Use the ' + C4DiagrammerName + ' tool');
      expect(result).to.include('recursively search');
      expect(result).to.include('README.' + C4DiagrammerName + '.md');
    });

    it('should include validation instructions', () => {
      const args = {
        rootDirectory: '/test/path',
        c4Type: 'C4Context'
      };
      
      const result = repository.expandUserPrompt(rollupC4Prompt, args);
      
      expect(result).to.include('parse and validate');
      expect(result).to.include('valid Mermaid code');
    });
  });

  describe('generateRollupC4Prompt object', () => {
    it('should have all required properties', () => {
      expect(rollupC4Prompt).to.have.property('name');
      expect(rollupC4Prompt).to.have.property('description');
      expect(rollupC4Prompt).to.have.property('userPromptParameters');
    });
  });
});