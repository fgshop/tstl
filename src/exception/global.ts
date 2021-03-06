import { is_node } from "../utility/node";
import { _Get_root } from "../base/Global";

/**
 * Terminate program.
 */
export function terminate(): void
{
	if (is_node() === true)
		global.process.exit();
	else
	{
		if (typeof window !== "undefined" && self.open instanceof Function)
			self.open("", "_self", "");
		self.close();
	}
}

/**
 * Set terminate handler.
 * 
 * @param func The terminate handler.
 */
export function set_terminate(func: () => void): void
{
	//----
	// PREPARE EVENT LISTENER
	//----
	let type: string;
	let register: Dispatcher;
	let eraser: Dispatcher;

	if (is_node() === true)
	{
		type = "exit";
		register = (type, listener) => global.process.addListener(type, listener);
		eraser = (type, listener) => global.process.removeListener(type, listener);
	}
	else
	{
		// IF WORKER, THEN CANNOT ASSURE ACTIVATION.
		type = (typeof window !== "undefined") 
			? "unload" 
			: "close";
		register = (type, listener) => self.addEventListener(type, <any>listener);
		eraser = (type, listener) => self.removeEventListener(type, <any>listener);
	}

	//----
	// ENROLL THE LISTENER
	//----
	// ERASE ORDINARY
	if (_Get_root().__s_pTerminate_handler !== undefined)
		eraser(type, _Get_root().__s_pTerminate_handler);
	
	// DO REGISTER
	register("exit", func);

	// ARCHIVE THE LISTENER
	_Get_root().__s_pTerminate_handler = func;
}

/**
 * Get terminate handler.
 * 
 * @return The terminate handler.
 */
export function get_terminate(): () => void
{
	return _Get_root().__s_pTerminate_handler;
}

/**
 * @hidden
 */
type Dispatcher = (type: string, listener: Function) => void;