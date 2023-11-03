import { expect, describe, it } from 'vitest';

import { removeDiacritics } from './removeDiacritics';

describe('removeDiacritics', () => {
  it('removes diacritics from letters with diacritics', () => {
    const inputText = 'Těst Štrìñg';
    const expectedOutput = 'Test String';
    const result = removeDiacritics(inputText);
    expect(result).toEqual(expectedOutput);
  });

  it('does not modify text without diacritics', () => {
    const inputText = 'Hello World';
    const result = removeDiacritics(inputText);
    expect(result).toEqual(inputText);
  });

  it('handles empty string', () => {
    const inputText = '';
    const result = removeDiacritics(inputText);
    expect(result).toEqual(inputText);
  });
});
