import { RuntimeError } from "./RuntimeError";

import { ErrorCode } from "./ErrorCode";
import { ErrorCategory } from "./ErrorCategory";

/**
 * System Error.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export class SystemError extends RuntimeError
{
	/**
	 * @hidden
	 */
	protected code_: ErrorCode;
	
	/* ---------------------------------------------------------
		CONSTRUCTORS
	--------------------------------------------------------- */
	/**
	 * Initializer Constructor.
	 * 
	 * @param code An error code.
	 * @param message A detailed error message.
	 */
	public constructor(code: ErrorCode, message?: string);

	/**
	 * Construct from references.
	 * 
	 * @param val Identnfier of an error code in *category*.
	 * @param category An error category.
	 * @param message A detailed error message.
	 */
	public constructor(val: number, category: ErrorCategory, message?: string);

	public constructor(...args: any[])
	{
		super("");

		if (args.length >= 2 && typeof args[0] === "number")
		{
			let val: number = args[0];
			let category: ErrorCategory = args[1];

			this.code_ = new ErrorCode(val, category);
		}
		else
		{
			this.code_ = args[0];
		}
	}

	/* ---------------------------------------------------------
		ACCESSORS
	--------------------------------------------------------- */
	/**
	 * @inheritDoc
	 */
	public get name(): string
	{
		return "system_error";
	}

	/**
	 * Get error code.
	 * 
	 * @return The error code.
	 */
	public code(): ErrorCode
	{
		return this.code_;
	}
}

export type system_error = SystemError;
export var system_error = SystemError;