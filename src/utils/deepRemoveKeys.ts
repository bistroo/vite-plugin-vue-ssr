/**
 * Recursively removes specific keys from an object or array at any nesting level.
 * @template T - The type of the input object or array.
 * @param target - The object or array to be sanitized.
 * @param keysToRemove - An array of strings representing the keys to be removed.
 * @returns A new object or array with the specified keys removed at all levels.
 * @example
 * const obj = {
 *   user: {
 *     password: 'secret',
 *     profile: {
 *       token: 'abc123',
 *       name: 'John Doe',
 *     },
 *   },
 * };
 * const result = deepRemoveKeys(obj, ['password', 'token']);
 * // Result: { user: { profile: { name: 'John Doe' } } }
 */
export const deepRemoveKeys = <T>(target: T, keysToRemove: string[]): T => {
  if (Array.isArray(target)) {
    return target.map((item) => deepRemoveKeys(item, keysToRemove)) as unknown as T;
  } else if (target !== null && typeof target === 'object') {
    return Object.entries(target).reduce((acc, [key, value]) => {
      if (!keysToRemove.includes(key)) {
        (acc as Record<string, unknown>)[key] = deepRemoveKeys(value, keysToRemove);
      }
      return acc;
    }, {} as Record<string, unknown>) as T;
  } else {
    return target;
  }
};
