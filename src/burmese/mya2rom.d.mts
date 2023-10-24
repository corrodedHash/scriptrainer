/**
 *
 * @param {string} word
 * @param {SYSTEMS} system
 * @param {boolean} show_nice_alts
 * @param {boolean} is_manual
 * @returns {string}
 */
export function mya2rom(
  word: string,
  system: SYSTEMS,
  show_nice_alts?: boolean,
  is_manual?: boolean
): string
export function to_syllables(word: any): any
/**********************************/
export function mya2rom_all(word: any, show_nice_alts?: boolean, is_manual?: boolean): string[]
/**
 * *
 */
export type SYSTEMS = 'ipa' | 'mlcts' | 'mlcts2' | 'simple' | 'simple2'
/**
 * Array containing the presently supported transcription systems.
 * These values are arranged in the same order as they appear in the romanisations table in [romanisations.js]
 * @readonly
 * @enum {('ipa'| 'mlcts'| 'mlcts2'| 'simple'| 'simple2')}
 * */
export const SYSTEMS: readonly string[]
