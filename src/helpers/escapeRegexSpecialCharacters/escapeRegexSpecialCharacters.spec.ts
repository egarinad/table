import { expect, describe, it } from 'vitest';

import { escapeRegexSpecialCharacters } from './escapeRegexSpecialCharacters';

describe('escapeRegexSpecialCharacters', () => {
  it('escapes special characters in a regex pattern', () => {
    const inputText = '[-[{()*+?.\\^$|#\\s]';
    const expectedOutput = '\\[\\-\\[\\{\\(\\)\\*\\+\\?\\.\\\\\\^\\$\\|\\#\\\\s\\]';
    const result = escapeRegexSpecialCharacters(inputText);
    expect(result).toEqual(expectedOutput);
  });

  it('does not modify text without special characters', () => {
    const inputText = 'HelloWorld123';
    const result = escapeRegexSpecialCharacters(inputText);
    expect(result).toEqual(inputText);
  });

  it('handles empty string', () => {
    const inputText = '';
    const result = escapeRegexSpecialCharacters(inputText);
    expect(result).toEqual('');
  });
});
