import macroData from "./macro-instructions.jsonc" assert { type: "json" };

/**
 * Singleton wrapper class for macro-instructions.jsonc.
 * Provides lookup methods for macro objects by type or name.
 */
class MacroInstructions {
  static #instance = null;
  #macros = [];

  static VALID_TYPES = Object.freeze(["function", "literal"]);

  constructor() {
    if (MacroInstructions.#instance) {
      return MacroInstructions.#instance;
    }

    if (!macroData?.macros || !Array.isArray(macroData.macros)) {
      throw new Error(
        'Invalid macro-instructions.jsonc: expected a top-level "macros" array.'
      );
    }

    this.#macros = macroData.macros;
    MacroInstructions.#instance = this;
  }

  /**
   * Returns the singleton instance.
   * @returns {MacroInstructions}
   */
  static getInstance() {
    if (!MacroInstructions.#instance) {
      new MacroInstructions();
    }
    return MacroInstructions.#instance;
  }

  /**
   * Returns all macro objects that match the given type.
   * @param {"function"|"literal"} type
   * @returns {Array<{macroName: string, replacement: string, type: string}>}
   */
  getByType(type) {
    if (type === undefined || type === null) {
      throw new TypeError('getByType() requires a type argument.');
    }
    if (typeof type !== "string") {
      throw new TypeError(
        `getByType() expects a string, but received ${typeof type}.`
      );
    }
    const normalized = type.trim().toLowerCase();
    if (!MacroInstructions.VALID_TYPES.includes(normalized)) {
      throw new RangeError(
        `Invalid type "${type}". Valid types are: ${MacroInstructions.VALID_TYPES.join(", ")}.`
      );
    }

    return this.#macros.filter((macro) => macro.type === normalized);
  }

  /**
   * Returns the replacement value for the macro that matches the given name.
   * @param {string} macroName
   * @returns {string} The replacement value.
   */
  getByName(macroName) {
    if (macroName === undefined || macroName === null) {
      throw new TypeError('getByName() requires a macroName argument.');
    }
    if (typeof macroName !== "string") {
      throw new TypeError(
        `getByName() expects a string, but received ${typeof macroName}.`
      );
    }
    if (macroName.trim() === "") {
      throw new RangeError('getByName() requires a non-empty macroName.');
    }

    const match = this.#macros.find((macro) => macro.macroName === macroName);

    if (!match) {
      throw new RangeError(
        `No macro found with the name "${macroName}".`
      );
    }

    return match.replacement;
  }
}

export default MacroInstructions;
