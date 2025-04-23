/**
 * This module provides tests for the GenerateComponentC4Prompt module.
 * It includes tests for validating arguments and expanding prompts.
 * 
 * Copyright Jon Verrier, 2025
 */

import { expect } from 'chai';
import path from 'path';
import { C4DiagrammerName } from '../src/UIStrings.js';
import { generateComponentC4DiagramPromptId } from '../src/PromptIds.js';
import { PromptFileRepository, throwIfUndefined } from 'prompt-repository';

describe('GenerateComponentC4Prompt', () => {

   const repository = new PromptFileRepository(path.join(process.cwd(), 'src/Prompts.json'));
   const componentC4Prompt = repository.getPrompt(generateComponentC4DiagramPromptId);
   throwIfUndefined (componentC4Prompt);

  describe('validateGenerateComponentC4DiagramArgs', () => {
    it('should validate correct arguments', () => {
      const args = {
        rootDirectory: '/test/path'
      };
      
      const result = repository.expandUserPrompt(componentC4Prompt, args);
      expect(result).to.contain(args.rootDirectory);
    });

    it('should throw error when rootDirectory is undefined', () => {
      const args = {
        rootDirectory: undefined
      };
      
      expect(() => repository.expandUserPrompt(componentC4Prompt, args))
        .to.throw();
    });

    it('should throw error when rootDirectory is not a string', () => {
      const args = {
        rootDirectory: 123 as any
      };
      
      expect(() => repository.expandUserPrompt(componentC4Prompt, args))
      .to.throw();
    });

    it('should throw error when args is null', () => {
      expect(() => repository.expandUserPrompt(componentC4Prompt, null as any))
      .to.throw();
    });
  });

  describe('expandGenerateComponentC4DiagramPrompt', () => {
    it('should generate correct prompt string with given rootDirectory', () => {
      const args = {
        rootDirectory: '/test/path'
      };
      
      const result = repository.expandUserPrompt(componentC4Prompt, args);
      
      expect(result).to.be.a('string');
      expect(result).to.include('/test/path');
      expect(result).to.include('Use the ' + C4DiagrammerName + ' tool');
      expect(result).to.include('C4Component.' + C4DiagrammerName + '.md');
    });

    it('should include all required C4 diagram instructions', () => {
      const args = {
        rootDirectory: '/test/path'
      };
      
      const result = repository.expandUserPrompt(componentC4Prompt, args);
      
      expect(result).to.include('C4Component');
      expect(result).to.include('Person()');
      expect(result).to.include('Container()');
      expect(result).to.include('System()');
      expect(result).to.include('System_Boundary()');
      expect(result).to.include('System_Ext()');
      expect(result).to.include('Rel()');
    });
    
    it('should include validation instructions', () => {
      const args = {
        rootDirectory: '/test/path',
        c4Type: 'C4Context'
      };
      
      const result = repository.expandUserPrompt(componentC4Prompt, args);
      
      expect(result).to.include('parse and validate');
      expect(result).to.include('valid Mermaid code');
    });     
  }); 

  describe('generateComponentC4Prompt object', () => {
    it('should have all required properties', () => {
      expect(componentC4Prompt).to.have.property('name');
      expect(componentC4Prompt).to.have.property('description');
      expect(componentC4Prompt).to.have.property('userPromptParameters');
    });
  });
});