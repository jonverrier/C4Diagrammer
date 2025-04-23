/**
 * This module provides types and interfaces for defining functions and prompts in the MCP Documenter.
 * It includes base interfaces for prompt arguments, validation functions, and prompt expansion.
 * 
 * Copyright Jon Verrier, 2025
 */

import { ListPromptsResult } from "@modelcontextprotocol/sdk/types.js";
import {IPrompt, IPromptRepository, EParameterType} from "prompt-repository";

export interface IArgs {
}

export type FnValidateArgs = (args: IArgs) => IArgs;
export type FnExpandPrompt = (args: IArgs) => string;
export type FnExecuteFunction = (args: IArgs) => Promise<string>;

export interface IMcpElement
 {
   name: string;
   description: string;
}

export interface IMcpPrompt extends IMcpElement {
   validateArgs: FnValidateArgs;   
   expandPrompt: FnExpandPrompt;
   arguments?: {
      name: string;
      description: string;
      required: boolean;
      type?: string;      
   }[];
}

export interface IMcpFunction extends IMcpElement {
   validateArgs: FnValidateArgs;     
   execute: FnExecuteFunction;
}

export function toMcpPrompt(prompt: IPrompt): IMcpPrompt {
   return {
      name: prompt.name,
      description: prompt.description ?? "",
      arguments: prompt.userPromptParameters?.map(param => ({
         name: param.name,
         description: param.description ?? "",
         required: param.required,
         type: param.type === "kString" ? "string" : "number"
      })) ?? [],
      expandPrompt: (args: IArgs) => "", // Default expansion returns empty string
      validateArgs: (args: IArgs) => args // Default validation just returns args
   };
}


function toListPromptResult(prompt: IMcpPrompt): ListPromptsResult['prompts'][0] {
   return {
      name: prompt.name,
      description: prompt.description,
      arguments: prompt.arguments
   };
}


export function getMcpPrompt(promptId: string, repository: IPromptRepository): ListPromptsResult['prompts'][0]  | undefined {
   const prompt = repository.getPrompt(promptId);
   if (!prompt) {
      return undefined;
   }
   return toListPromptResult (toMcpPrompt(prompt));
}

export function expandPrompt(promptId: string, repository: IPromptRepository, params: { [key: string]: string | undefined }): string {
   
   const prompt = repository.getPrompt(promptId);
   if (!prompt) {
      return "";
   }
   return repository.expandUserPrompt(prompt, params);
}

