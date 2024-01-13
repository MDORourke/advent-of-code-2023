import Day9 from '.';

describe('calculateNextStep', () => {
  test('exit criteria', () => {
    const input = [0, 0, 0, 0];
    const output = Day9.calculateNextStep(input);
    expect(output).toBe(0);
  });

  test('calculates difference correctly', () => {
    const input = [0, 3, 6, 9, 12, 15];
    const output = Day9.calculateNextStep(input);
    expect(output).toBe(18);
  });
});

test('Part 1', () => {
  const input = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;
  const output = Day9.solveForPartOne(input);
  expect(output).toBe('114');
});

test('Part 2', () => {
  const input = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;
  const output = Day9.solveForPartTwo(input);
  expect(output).toBe('2');
});
