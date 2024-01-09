import { createRangeArray } from './helpers';

describe('createRangeArray', () => {
  test('creates a range array with the default content', () => {
    const output = createRangeArray(4);
    expect(output).toStrictEqual([0, 0, 0, 0]);
  });

  test('creates a range array with the given content', () => {
    const output = createRangeArray(4, 'a');
    expect(output).toStrictEqual(['a', 'a', 'a', 'a']);
  });
});
