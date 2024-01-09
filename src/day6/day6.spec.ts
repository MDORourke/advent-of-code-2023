import Day6 from '.';

test('parseRaces', () => {
  const input = ['Time:      7  15   30', 'Distance:  9  40  200'];
  const output = Day6.parseRaces(input);
  expect(output).toStrictEqual([
    {
      time: 7,
      distance: 9,
    },
    {
      time: 15,
      distance: 40,
    },
    {
      time: 30,
      distance: 200,
    },
  ]);
});

test('calculatePossibleDistances', () => {
  const input = 7;
  const output = Day6.calculatePossibleDistances(input);
  expect(output).toStrictEqual([0, 6, 10, 12, 12, 10, 6]);
});

test('Part 1', () => {
  const input = `Time:      7  15   30
Distance:  9  40  200`;

  const output = Day6.solveForPartOne(input);

  expect(output).toBe('288');
});

test('Part 2', () => {
  const input = `Time:      7  15   30
Distance:  9  40  200`;

  const output = Day6.solveForPartTwo(input);

  expect(output).toBe('71503');
});
