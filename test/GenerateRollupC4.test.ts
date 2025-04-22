/**
 * This module provides tests for the GenerateRollupC4Prompt module.
 * It includes tests for validating arguments and expanding prompts.
 * 
 * Copyright Jon Verrier, 2025
 */

import { expect } from 'chai';
import { generateRollupC4Prompt } from '../src/GenerateRollupC4Prompt.js';
import { C4DiagrammerName } from '../src/UIStrings.js';

describe('GenerateRollupC4Prompt', () => {
  describe('validateGenerateRollupC4DiagramArgs', () => {
    it('should validate correct arguments', () => {
      const args = {
        rootDirectory: '/test/path',
        c4Type: 'C4Context'
      };
      
      const result = generateRollupC4Prompt.validateArgs(args);
      expect(result).to.deep.equal(args);
    });

    it('should throw error when rootDirectory is undefined', () => {
      const args = {
        rootDirectory: undefined,
        c4Type: 'C4Context'
      };
      
      expect(() => generateRollupC4Prompt.validateArgs(args))
        .to.throw();
    });

    it('should throw error when c4Type is undefined', () => {
      const args = {
        rootDirectory: '/test/path',
        c4Type: undefined
      };
      
      expect(() => generateRollupC4Prompt.validateArgs(args))
        .to.throw();
    });

    it('should throw error when c4Type is invalid', () => {
      const args = {
        rootDirectory: '/test/path',
        c4Type: 'InvalidType'
      };
      
      expect(() => generateRollupC4Prompt.validateArgs(args))
        .to.throw();
    });

    it('should throw error when args is null', () => {
      expect(() => generateRollupC4Prompt.validateArgs(null as any))
        .to.throw();
    });
  });

  describe('expandGenerateRollupC4DiagramPrompt', () => {
    it('should generate correct prompt string for C4Context', () => {
      const args = {
        rootDirectory: '/test/path',
        c4Type: 'C4Context'
      };
      
      const result = generateRollupC4Prompt.expandPrompt(args);
      
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
      
      const result = generateRollupC4Prompt.expandPrompt(args);
      
      expect(result).to.include('C4Container');
      expect(result).to.include('C4Container.' + C4DiagrammerName + '.md');
    });

    it('should include all required C4 diagram instructions', () => {
      const args = {
        rootDirectory: '/test/path',
        c4Type: 'C4Context'
      };
      
      const result = generateRollupC4Prompt.expandPrompt(args);
      
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
      
      const result = generateRollupC4Prompt.expandPrompt(args);
      
      expect(result).to.include('Use the ' + C4DiagrammerName + ' tool');
      expect(result).to.include('recursively search');
      expect(result).to.include('README.' + C4DiagrammerName + '.md');
    });

    it('should include validation instructions', () => {
      const args = {
        rootDirectory: '/test/path',
        c4Type: 'C4Context'
      };
      
      const result = generateRollupC4Prompt.expandPrompt(args);
      
      expect(result).to.include('parse and validate');
      expect(result).to.include('valid Mermaid code');
    });
  });

  describe('generateRollupC4Prompt object', () => {
    it('should have all required properties', () => {
      expect(generateRollupC4Prompt).to.have.property('name');
      expect(generateRollupC4Prompt).to.have.property('description');
      expect(generateRollupC4Prompt).to.have.property('validateArgs');
      expect(generateRollupC4Prompt).to.have.property('expandPrompt');
    });
  });
});