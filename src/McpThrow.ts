/**
 * McpIndex module provides the main entry point for the MCP Documenter server.
 * It initializes the server, adds the necessary functions and prompts, and starts the server.
 * 
 * Copyright Jon Verrier, 2025
 */

import {
   McpError,
   ErrorCode
} from "@modelcontextprotocol/sdk/types.js";


/**
 * Throws an MCP error with InvalidParams error code and the provided message.
 * @param message The error message to include in the thrown error
 * @throws {McpError} Always throws with ErrorCode.InvalidParams
 */
export function throwMcpInvalidArgs(message: string) : never {
   throw new McpError(ErrorCode.InvalidParams, message);
}

/**
 * Throws an MCP error with InternalError error code and the provided message.
 * @param message The error message to include in the thrown error
 * @throws {McpError} Always throws with ErrorCode.InternalError
 */
export function throwMcpInternalError(message: string) : never {

   throw new McpError(ErrorCode.InternalError, message);
}

/**
 * Throws an MCP error with MethodNotFound error code and the provided message.
 * @param message The error message to include in the thrown error
 * @throws {McpError} Always throws with ErrorCode.MethodNotFound
 */
export function throwMcpMethodNotFound(message: string) : never {

   throw new McpError(ErrorCode.MethodNotFound, message);
}

