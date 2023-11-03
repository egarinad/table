/**
 * Removes diacritics (accents) from a given text.
 *
 * @param {string} text - The input text with diacritics.
 * @returns {string} Text with diacritics removed.
 */
export const removeDiacritics = (text: string): string => {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};
