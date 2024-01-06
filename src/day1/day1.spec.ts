import Day1 from '.';

test('Part 1', () => {
  const input = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

  const output = Day1.solveForPartOne(input);

  expect(output).toBe('142');
});

describe('Part 2', () => {
  test('solves the given test input', () => {
    const input = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

    const output = Day1.solveForPartTwo(input);

    expect(output).toBe('281');
  });

  test('converts all words into digits', () => {
    const input = 'oneoneone';

    const output = Day1.solveForPartTwo(input);

    expect(output).toBe('11');
  });
});
