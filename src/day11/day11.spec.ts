import Day11, { Coordinate } from '.';

test('parseMatrix', () => {
  const input = ['.....', '.....'];
  const output = Day11.parseMatrix(input);
  expect(output).toStrictEqual([
    ['.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.'],
  ]);
});

describe('transposeMatrix', () => {
  test('transposes a matrix', () => {
    const input = [
      ['.', '#', '.', '.'],
      ['.', '.', '.', '#'],
    ];
    const output = Day11.transposeMatrix(input);
    expect(output).toStrictEqual([
      ['.', '.'],
      ['#', '.'],
      ['.', '.'],
      ['.', '#'],
    ]);
  });

  test('returns a transposed matrix to its original state', () => {
    const input = [
      ['.', '.'],
      ['#', '.'],
      ['.', '.'],
      ['.', '#'],
    ];
    const output = Day11.transposeMatrix(input);
    expect(output).toStrictEqual([
      ['.', '#', '.', '.'],
      ['.', '.', '.', '#'],
    ]);
  });
});

test('getExpandedRowsAndColumns', () => {
  const input = [
    ['.', '.', '.', '.'],
    ['#', '.', '.', '.'],
    ['.', '.', '.', '.'],
    ['.', '#', '.', '.'],
  ];
  const output = Day11.getExpandedRowsAndColumns(input);
  expect(output).toStrictEqual({
    expandedRows: [0, 2],
    expandedColumns: [2, 3],
  });
});

test('getGalaxyCoordinates', () => {
  const input = [
    ['.', '.', '.', '.'],
    ['.', '#', '.', '.'],
    ['.', '.', '.', '#'],
  ];
  const output = Day11.getGalaxyCoordinates(input);
  expect(output).toStrictEqual([
    [1, 1],
    [2, 3],
  ]);
});

describe('getExpandedCoordinates', () => {
  test('returns expanded coordinates with a default factor of 1', () => {
    const coordinates: Coordinate[] = [
      [0, 0],
      [2, 0],
      [0, 4],
    ];
    const expandedRowsAndColumns = {
      expandedRows: [1],
      expandedColumns: [1, 3],
    };
    const output = Day11.getExpandedCoordinates(
      coordinates,
      expandedRowsAndColumns
    );
    expect(output).toStrictEqual([
      [0, 0],
      [3, 0],
      [0, 6],
    ]);
  });

  test('returns expanded coordinates with a provided expansion factor', () => {
    const coordinates: Coordinate[] = [
      [0, 0],
      [2, 0],
      [0, 4],
    ];
    const expandedRowsAndColumns = {
      expandedRows: [1],
      expandedColumns: [1, 3],
    };
    const output = Day11.getExpandedCoordinates(
      coordinates,
      expandedRowsAndColumns,
      100
    );
    expect(output).toStrictEqual([
      [0, 0],
      [102, 0],
      [0, 204],
    ]);
  });
});

test('findCoordinatePairs', () => {
  const input: Coordinate[] = [
    [1, 2],
    [1, 3],
    [3, 1],
    [4, 2],
    [5, 1],
  ];
  const output = Day11.findCoordinatePairs(input);
  expect(output).toStrictEqual([
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [1, 2],
    [1, 3],
    [1, 4],
    [2, 3],
    [2, 4],
    [3, 4],
  ]);
});

test('findManhattanDistance', () => {
  const firstCoordinate: Coordinate = [6, 1];
  const secondCoordinate: Coordinate = [11, 5];
  const output = Day11.findManhattanDistance(firstCoordinate, secondCoordinate);
  expect(output).toBe(9);
});

test('Part 1', () => {
  const input = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`;

  const output = Day11.solveForPartOne(input);
  expect(output).toBe('374');
});

test('Part 2', () => {
  const input = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`;

  const output = Day11.solveForPartTwo(input);
  expect(output).toBe('82000210');
});
