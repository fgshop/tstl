/**
 * Base Exception.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export class Exception extends Error
{
	/* ---------------------------------------------------------
		CONSTRUCTOR
	--------------------------------------------------------- */
	/**
	 * Default Constructor.
	 */
	public constructor();

	/**
	 * Initializer Constructor.
	 * 
	 * @param message The error messgae.
	 */
	public constructor(message: string);

	public constructor(message: string = "")
	{
		super(message);
	}

	/* ---------------------------------------------------------
		ACCESSORS
	--------------------------------------------------------- */
	/**
	 * The error name.
	 */
	public get name(): string
	{
		return "exception";
	}

	/**
	 * Get error message.
	 * 
	 * @return The error message.
	 */
	public what(): string
	{
		return this.message;
	}
}

export type exception = Exception;
export const exception = Exception;