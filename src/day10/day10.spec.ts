import Day10, { Coordinate, Direction, Instruction, Map, Path } from '.';

describe('isInDirection', () => {
  test.each<[Direction, Coordinate, Coordinate, boolean]>([
    ['NORTH', [0, 0], [1, 0], false],
    ['NORTH', [0, 0], [0, 1], false],
    ['NORTH', [1, 1], [1, 0], false],
    ['NORTH', [1, 1], [0, 1], true],
    ['EAST', [0, 0], [1, 0], false],
    ['EAST', [0, 0], [0, 1], true],
    ['EAST', [1, 1], [1, 0], false],
    ['EAST', [1, 1], [0, 1], false],
    ['SOUTH', [0, 0], [1, 0], true],
    ['SOUTH', [0, 0], [0, 1], false],
    ['SOUTH', [1, 1], [1, 0], false],
    ['SOUTH', [1, 1], [0, 1], false],
    ['WEST', [0, 0], [1, 0], false],
    ['WEST', [0, 0], [0, 1], false],
    ['WEST', [1, 1], [1, 0], true],
    ['WEST', [1, 1], [0, 1], false],
  ])('%p', (directionToCheck, from, to, result) => {
    expect(Day10.isInDirection[directionToCheck](from, to)).toBe(result);
  });
});

describe('followDirection', () => {
  test.each<[Direction, Coordinate, Coordinate]>([
    ['NORTH', [1, 0], [0, 0]],
    ['EAST', [0, 0], [0, 1]],
    ['SOUTH', [0, 0], [1, 0]],
    ['WEST', [0, 1], [0, 0]],
  ])('%p', (direction, currentCoordinate, result) => {
    expect(Day10.followDirection[direction](currentCoordinate)).toStrictEqual(
      result
    );
  });
});

describe('nextCoordinate', () => {
  test('.', () => {
    expect(Day10.nextCoordinate['.']([0, 0], [0, 0])).toBeUndefined();
  });
  test.each<[Instruction, Coordinate, Coordinate, Coordinate | undefined]>([
    ['F', [0, 0], [1, 0], undefined],
    ['F', [0, 0], [0, 1], undefined],
    ['F', [1, 1], [1, 0], [2, 0]],
    ['F', [1, 1], [0, 1], [0, 2]],
    ['L', [0, 0], [1, 0], [1, 1]],
    ['L', [0, 0], [0, 1], undefined],
    ['L', [1, 1], [1, 0], [0, 0]],
    ['L', [1, 1], [0, 1], undefined],
    ['J', [0, 1], [1, 1], [1, 0]],
    ['J', [1, 0], [1, 1], [0, 1]],
    ['J', [1, 1], [1, 0], undefined],
    ['J', [1, 1], [0, 1], undefined],
    ['7', [0, 0], [1, 0], undefined],
    ['7', [0, 0], [0, 1], [1, 1]],
    ['7', [1, 1], [1, 0], undefined],
    ['7', [1, 1], [0, 1], [0, 0]],
    ['|', [0, 0], [1, 0], [2, 0]],
    ['|', [0, 0], [0, 1], undefined],
    ['|', [1, 2], [1, 1], undefined],
    ['|', [2, 1], [1, 1], [0, 1]],
    ['-', [0, 0], [1, 0], undefined],
    ['-', [0, 0], [0, 1], [0, 2]],
    ['-', [1, 2], [1, 1], [1, 0]],
    ['-', [2, 1], [1, 1], undefined],
  ])('%p', (instruction, previousCoordinate, currentCoordinate, result) => {
    expect(
      Day10.nextCoordinate[instruction](previousCoordinate, currentCoordinate)
    ).toStrictEqual(result);
  });
});

test('constructMap', () => {
  const input = ['.....', '.F-7.', '.S.|.', '.L-J.', '.....'];
  const output = Day10.constructMap(input);
  expect(output).toStrictEqual({
    instructions: [
      ['.', '.', '.', '.', '.'],
      ['.', 'F', '-', '7', '.'],
      ['.', 'S', '.', '|', '.'],
      ['.', 'L', '-', 'J', '.'],
      ['.', '.', '.', '.', '.'],
    ],
    startingPoint: [2, 1],
  });
});

describe('checkOutOfBounds', () => {
  const instructions: Instruction[][] = [['.', '.']];

  test.each<[Coordinate]>([
    [[-1, -1]],
    [[-1, 0]],
    [[-1, 1]],
    [[0, -1]],
    [[0, 2]],
    [[1, -1]],
    [[1, 0]],
    [[1, 1]],
  ])('returns true for out of bounds coordinates: %p', (coordinate) => {
    expect(Day10.checkOutOfBounds(instructions, coordinate)).toBeTruthy();
  });

  test('returns false for in bounds coordinates', () => {
    expect(Day10.checkOutOfBounds(instructions, [0, 1])).toBeFalsy();
  });
});

describe('followPath', () => {
  test('populates numbers of steps taken along path', () => {
    const map: Map = {
      instructions: [['S', '-', 'S']],
      startingPoint: [0, 0],
    };
    const path: Path = {
      startingCoordinate: [0, 1],
      visitedCoordinates: [],
    };
    const output = Day10.followPath(map, path);
    expect(output).toStrictEqual({
      startingCoordinate: [0, 1],
      visitedCoordinates: [[0, 1]],
    });
  });

  test('paths leading out of bounds return a -1 for number of steps', () => {
    const map: Map = {
      instructions: [['-']],
      startingPoint: [0, 0],
    };
    const path: Path = {
      startingCoordinate: [0, 0],
      visitedCoordinates: [],
    };
    const output = Day10.followPath(map, path);
    expect(output).toStrictEqual({
      startingCoordinate: [0, 0],
      visitedCoordinates: [],
    });
  });

  test('paths leading to ground return no visited coordinates', () => {
    const map: Map = {
      instructions: [['S', '-', '.']],
      startingPoint: [0, 0],
    };
    const path: Path = {
      startingCoordinate: [0, 1],
      visitedCoordinates: [],
    };
    const output = Day10.followPath(map, path);
    expect(output).toStrictEqual({
      startingCoordinate: [0, 1],
      visitedCoordinates: [],
    });
  });
});

test('calculateAreaOfPath', () => {
  const input: Path = {
    startingCoordinate: [0, 0],
    visitedCoordinates: [
      [1, 0],
      [2, 0],
      [3, 0],
      [3, 1],
      [3, 2],
      [4, 2],
      [4, 3],
      [4, 4],
      [3, 4],
      [2, 4],
      [1, 4],
      [0, 4],
      [0, 3],
      [0, 2],
      [0, 1],
    ],
  };
  const output = Day10.calculateAreaOfPath(input);
  expect(output).toBe(14);
});

test('calculateAreaOfPath2', () => {
  const input: Path = {
    startingCoordinate: [1, 6],
    visitedCoordinates: [
      [1, 6],
      [3, 1],
      [7, 2],
      [4, 4],
      [8, 5],
    ],
  };
  const output = Day10.calculateAreaOfPath(input);
  expect(output).toBe(16.5);
});

test('calculateNumberOfInternalPoints', () => {
  const area = 10;
  const numberOfBoundaryPoints = 8;
  const output = Day10.calculateNumberOfInternalPoints(
    area,
    numberOfBoundaryPoints
  );
  expect(output).toBe(7);
});

describe('createPaths', () => {
  test('returns path objects', () => {
    const input: Coordinate = [1, 1];
    const output = Day10.createPaths(input);
    expect(output).toStrictEqual([
      {
        startingCoordinate: [2, 1],
        visitedCoordinates: [[1, 1]],
      },
      {
        startingCoordinate: [0, 1],
        visitedCoordinates: [[1, 1]],
      },
      {
        startingCoordinate: [1, 2],
        visitedCoordinates: [[1, 1]],
      },
      {
        startingCoordinate: [1, 0],
        visitedCoordinates: [[1, 1]],
      },
    ]);
  });

  test('does not return paths which would lead out of bounds', () => {
    const input: Coordinate = [0, 0];
    const output = Day10.createPaths(input);
    expect(output).toStrictEqual([
      {
        startingCoordinate: [1, 0],
        visitedCoordinates: [[0, 0]],
      },
      {
        startingCoordinate: [0, 1],
        visitedCoordinates: [[0, 0]],
      },
    ]);
  });
});

describe('checkCoordinatesAreEqual', () => {
  test('returns true if coordinates are equal', () => {
    const coordinate1: Coordinate = [0, 0];
    const coordinate2: Coordinate = [0, 0];
    expect(
      Day10.checkCoordinatesAreEqual(coordinate1, coordinate2)
    ).toBeTruthy();
  });

  test('returns false if coordinates are not equal', () => {
    const coordinate1: Coordinate = [0, 0];
    const coordinate2: Coordinate = [1, 0];
    expect(
      Day10.checkCoordinatesAreEqual(coordinate1, coordinate2)
    ).toBeFalsy();
  });
});

describe('Part 1', () => {
  test('simple loop', () => {
    const input = `.....
.S-7.
.|.|.
.L-J.
.....`;
    const output = Day10.solveForPartOne(input);

    expect(output).toBe('4');
  });

  test('complex loop', () => {
    const input = `..F7.
.FJ|.
SJ.L7
|F--J
LJ...`;
    const output = Day10.solveForPartOne(input);

    expect(output).toBe('8');
  });
});

test('Part 2', () => {
  const input = `.F----7F7F7F7F-7....
.|F--7||||||||FJ....
.||.FJ||||||||L7....
FJL7L7LJLJ||LJ.L-7..
L--J.L7...LJS7F-7L7.
....F-J..F7FJ|L7L7L7
....L7.F7||L7|.L7L7|
.....|FJLJ|FJ|F7|.LJ
....FJL-7.||.||||...
....L---J.LJ.LJLJ...`;
  const output = Day10.solveForPartTwo(input);

  expect(output).toBe('8');
});
