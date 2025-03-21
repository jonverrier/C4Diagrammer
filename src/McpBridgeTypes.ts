/**
 * This module provides types and interfaces for defining functions and prompts in the MCP Documenter.
 * It includes base interfaces for prompt arguments, validation functions, and prompt expansion.
 * 
 * Copyright Jon Verrier, 2025
 */


export interface IArgs {
}

export type FnValidateArgs = (args: IArgs) => IArgs;
export type FnExpandPrompt = (args: IArgs) => string;
export type FnExecuteFunction = (args: IArgs) => Promise<string>;

export interface IMcpElement
 {
   name: string;
   description: string;
   validateArgs: FnValidateArgs;
}

export interface IPrompt extends IMcpElement {
   expandPrompt: FnExpandPrompt;
}

export interface IFunction extends IMcpElement {
   execute: FnExecuteFunction;
}
