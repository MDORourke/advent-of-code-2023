import Day2 from '.';

describe('parseRound', () => {
  test('parses round', () => {
    const input = '3 blue, 4 red';
    const output = Day2.parseRound(input);
    expect(output).toStrictEqual({
      numRed: 4,
      numGreen: 0,
      numBlue: 3,
    });
  });

  test('removes extra spaces from round components', () => {
    const input = ' 16 red, 2 blue, 7 green ';
    const output = Day2.parseRound(input);
    expect(output).toStrictEqual({
      numRed: 16,
      numGreen: 7,
      numBlue: 2,
    });
  });
});

test('parseGame', () => {
  const input =
    'Game 26: 16 red, 2 blue, 7 green; 1 blue, 7 green, 8 red; 1 blue, 3 red, 9 green';
  const output = Day2.parseGame(input);
  expect(output).toStrictEqual({
    id: 26,
    maxRed: 16,
    maxGreen: 9,
    maxBlue: 2,
  });
});

describe('checkGamePossible', () => {
  test('returns true if game is possible', () => {
    const input = {
      id: 1,
      maxRed: 4,
      maxGreen: 3,
      maxBlue: 2,
    };
    const output = Day2.checkGamePossible(input, 5, 5, 5);
    expect(output).toBeTruthy();
  });

  test('returns false if game is not possible', () => {
    const input = {
      id: 2,
      maxRed: 10,
      maxGreen: 3,
      maxBlue: 2,
    };
    const output = Day2.checkGamePossible(input, 5, 5, 5);
    expect(output).toBeFalsy();
  });
});

test('Part 1', () => {
  const input = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
    Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
    Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
    Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
    Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

  const output = Day2.solveForPartOne(input);

  expect(output).toBe('8');
});

test('Part 2', () => {
  const input = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
    Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
    Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
    Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
    Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

  const output = Day2.solveForPartTwo(input);

  expect(output).toBe('2286');
});
