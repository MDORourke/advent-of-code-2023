import Day from '../day';
import { createRangeArray } from '../helpers';

export type Matrix = string[][];

export type Coordinate = [number, number];

class Day11 extends Day {
  constructor() {
    super(11);
  }

  parseMatrix(lines: string[]): Matrix {
    const matrix = lines.map((line) => line.split(''));
    return matrix;
  }

  transposeMatrix(matrix: Matrix): Matrix {
    return matrix[0].map((_, colIdx) => matrix.map((row) => row[colIdx]));
  }

  getExpandedRowsAndColumns(matrix: Matrix): {
    expandedRows: number[];
    expandedColumns: number[];
  } {
    const getExpandedRows = (matrix: Matrix) =>
      matrix
        .map<[string[], number]>((row, idx) => [row, idx])
        .filter((row) => row[0].indexOf('#') === -1)
        .map((row) => row[1]);
    const expandedRows = getExpandedRows(matrix);
    const transposedMatrix = this.transposeMatrix(matrix);
    const expandedColumns = getExpandedRows(transposedMatrix);

    return {
      expandedRows,
      expandedColumns,
    };
  }

  getGalaxyCoordinates(matrix: Matrix) {
    const galaxyCoordinates: Coordinate[] = [];
    matrix.forEach((row, rowIdx) => {
      row.forEach((value, colIdx) => {
        if (value === '#') {
          galaxyCoordinates.push([rowIdx, colIdx]);
        }
      });
    });
    return galaxyCoordinates;
  }

  getExpandedCoordinates(
    coordinates: Coordinate[],
    {
      expandedRows,
      expandedColumns,
    }: {
      expandedRows: number[];
      expandedColumns: number[];
    },
    expansionFactor: number = 1
  ): Coordinate[] {
    return coordinates.map((coordinate) => {
      const applicableExpandedRows = expandedRows.filter(
        (row) => row < coordinate[0]
      ).length;
      const applicableExpandedColumns = expandedColumns.filter(
        (column) => column < coordinate[1]
      ).length;
      return [
        coordinate[0] + applicableExpandedRows * expansionFactor,
        coordinate[1] + applicableExpandedColumns * expansionFactor,
      ];
    });
  }

  findCoordinatePairs(coordinates: Coordinate[]) {
    return createRangeArray(coordinates.length)
      .flatMap((_, i) =>
        createRangeArray(coordinates.length).map((_, j) => {
          if (j > i) {
            return [i, j];
          }
          return [];
        })
      )
      .filter((pair) => pair.length > 0);
  }

  findManhattanDistance(
    firstCoordinate: Coordinate,
    secondCoordinate: Coordinate
  ) {
    return (
      Math.abs(firstCoordinate[0] - secondCoordinate[0]) +
      Math.abs(firstCoordinate[1] - secondCoordinate[1])
    );
  }

  solveForPartOne(input: string): string {
    const lines = input.split('\n');
    const matrix = this.parseMatrix(lines);
    const expandedRowsAndColumns = this.getExpandedRowsAndColumns(matrix);
    const galaxyCoordinates = this.getGalaxyCoordinates(matrix);
    const expandedCoordinates = this.getExpandedCoordinates(
      galaxyCoordinates,
      expandedRowsAndColumns
    );
    const pairs = this.findCoordinatePairs(expandedCoordinates);
    const total = pairs
      .map((pair) =>
        this.findManhattanDistance(
          expandedCoordinates[pair[0]],
          expandedCoordinates[pair[1]]
        )
      )
      .reduce((previous, current) => previous + current);

    return `${total}`;
  }

  solveForPartTwo(input: string): string {
    const lines = input.split('\n');
    const matrix = this.parseMatrix(lines);
    const expandedRowsAndColumns = this.getExpandedRowsAndColumns(matrix);
    const galaxyCoordinates = this.getGalaxyCoordinates(matrix);
    const expandedCoordinates = this.getExpandedCoordinates(
      galaxyCoordinates,
      expandedRowsAndColumns,
      999999
    );
    const pairs = this.findCoordinatePairs(expandedCoordinates);
    const total = pairs
      .map((pair) =>
        this.findManhattanDistance(
          expandedCoordinates[pair[0]],
          expandedCoordinates[pair[1]]
        )
      )
      .reduce((previous, current) => previous + current);

    return `${total}`;
  }
}

export default new Day11();
