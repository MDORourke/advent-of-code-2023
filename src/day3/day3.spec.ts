import Day3 from '.';

describe('extractPartNumberRanges', () => {
  test('extracts numbers correctly', () => {
    const input = '..35.633.';
    const output = Day3.extractPartNumberRanges(input);
    expect(output).toStrictEqual([
      [2, 0, 35],
      [3, 0, 35],
      [5, 1, 633],
      [6, 1, 633],
      [7, 1, 633],
    ]);
  });

  test('correctly separates doubles on the same line', () => {
    const input = '..35..35..';
    const output = Day3.extractPartNumberRanges(input);
    expect(output).toStrictEqual([
      [2, 0, 35],
      [3, 0, 35],
      [6, 1, 35],
      [7, 1, 35],
    ]);
  });
});

test('extractCharacterCoordinates', () => {
  const input = '  * /';
  const output = Day3.extractSpecialCharacterCoordinates(input, 0);
  expect(output).toStrictEqual([
    {
      x: 2,
      y: 0,
    },
    {
      x: 4,
      y: 0,
    },
  ]);
});

describe('getAdjacentPartNumbers', () => {
  test('finds adjacent part numbers', () => {
    const partNumberCoordinates = {
      ['0|0']: {
        identifier: '0|0',
        value: 7,
      },
      ['2|0']: {
        identifier: '0|1',
        value: 10,
      },
      ['0|2']: {
        identifier: '2|0',
        value: 2,
      },
      ['2|2']: {
        identifier: '2|1',
        value: 20,
      },
      ['5|5']: {
        identifier: '5|0',
        value: 100,
      },
    };
    const output = Day3.getAdjacentPartNumbers(1, 1, partNumberCoordinates);
    expect(output).toStrictEqual([
      { identifier: '0|0', value: 7 },
      {
        identifier: '0|1',
        value: 10,
      },
      {
        identifier: '2|0',
        value: 2,
      },
      {
        identifier: '2|1',
        value: 20,
      },
    ]);
  });

  test('ignores duplicate part numbers', () => {
    const partNumberCoordinates = {
      ['0|0']: {
        identifier: '0|0',
        value: 7,
      },
      ['2|0']: {
        identifier: '0|0',
        value: 7,
      },
      ['0|2']: {
        identifier: '2|0',
        value: 2,
      },
    };
    const output = Day3.getAdjacentPartNumbers(1, 1, partNumberCoordinates);
    expect(output).toStrictEqual([
      { identifier: '0|0', value: 7 },
      {
        identifier: '2|0',
        value: 2,
      },
    ]);
  });
});

test('Part 1', () => {
  const input = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

  const output = Day3.solveForPartOne(input);

  expect(output).toBe('4361');
});

test('Part 2', () => {
  const input = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

  const output = Day3.solveForPartTwo(input);

  expect(output).toBe('467835');
});
