import Day from '../day';
import { createRangeArray } from '../helpers';

export type Instruction = '.' | 'F' | 'L' | 'J' | '7' | '|' | '-' | 'S';

export type Direction = 'NORTH' | 'EAST' | 'SOUTH' | 'WEST';

export type Coordinate = [number, number]; // row, column

export type Path = {
  startingCoordinate: Coordinate;
  visitedCoordinates: Coordinate[];
};

export type Map = {
  instructions: Instruction[][];
  startingPoint: Coordinate;
};

class Day10 extends Day {
  constructor() {
    super(10);
  }

  isInDirection: Record<
    Direction,
    (from: Coordinate, to: Coordinate) => boolean
  > = {
    NORTH: (from, to) => from[0] - to[0] === 1 && from[1] === to[1],
    EAST: (from, to) => from[0] === to[0] && from[1] - to[1] === -1,
    SOUTH: (from, to) => from[0] - to[0] === -1 && from[1] === to[1],
    WEST: (from, to) => from[0] === to[0] && from[1] - to[1] === 1,
  };

  followDirection: Record<Direction, (from: Coordinate) => Coordinate> = {
    NORTH: (from) => [from[0] - 1, from[1]],
    EAST: (from) => [from[0], from[1] + 1],
    SOUTH: (from) => [from[0] + 1, from[1]],
    WEST: (from) => [from[0], from[1] - 1],
  };

  nextCoordinate: Record<
    Instruction,
    (
      previousCoordinate: Coordinate,
      currentCoordinate: Coordinate
    ) => Coordinate | undefined
  > = {
    '.': (_, __) => undefined,
    F: (previousCoordinate, currentCoordinate) =>
      this.isInDirection['WEST'](previousCoordinate, currentCoordinate)
        ? this.followDirection['SOUTH'](currentCoordinate)
        : this.isInDirection['NORTH'](previousCoordinate, currentCoordinate)
        ? this.followDirection['EAST'](currentCoordinate)
        : undefined,
    L: (previousCoordinate, currentCoordinate) =>
      this.isInDirection['WEST'](previousCoordinate, currentCoordinate)
        ? this.followDirection['NORTH'](currentCoordinate)
        : this.isInDirection['SOUTH'](previousCoordinate, currentCoordinate)
        ? this.followDirection['EAST'](currentCoordinate)
        : undefined,
    J: (previousCoordinate, currentCoordinate) =>
      this.isInDirection['EAST'](previousCoordinate, currentCoordinate)
        ? this.followDirection['NORTH'](currentCoordinate)
        : this.isInDirection['SOUTH'](previousCoordinate, currentCoordinate)
        ? this.followDirection['WEST'](currentCoordinate)
        : undefined,
    7: (previousCoordinate, currentCoordinate) =>
      this.isInDirection['EAST'](previousCoordinate, currentCoordinate)
        ? this.followDirection['SOUTH'](currentCoordinate)
        : this.isInDirection['NORTH'](previousCoordinate, currentCoordinate)
        ? this.followDirection['WEST'](currentCoordinate)
        : undefined,
    '|': (previousCoordinate, currentCoordinate) =>
      this.isInDirection['NORTH'](previousCoordinate, currentCoordinate)
        ? this.followDirection['NORTH'](currentCoordinate)
        : this.isInDirection['SOUTH'](previousCoordinate, currentCoordinate)
        ? this.followDirection['SOUTH'](currentCoordinate)
        : undefined,
    '-': (previousCoordinate, currentCoordinate) =>
      this.isInDirection['EAST'](previousCoordinate, currentCoordinate)
        ? this.followDirection['EAST'](currentCoordinate)
        : this.isInDirection['WEST'](previousCoordinate, currentCoordinate)
        ? this.followDirection['WEST'](currentCoordinate)
        : undefined,
    S: (_, __) => undefined,
  };

  constructMap(lines: string[]): Map {
    const instructions = lines.map((line) => line.split('')) as Instruction[][];
    const startingPoint = instructions
      .flatMap((rowInstructions, row) =>
        rowInstructions.map((instruction, column) => ({
          row,
          column,
          instruction,
        }))
      )
      .filter(({ instruction }) => instruction === 'S')[0];

    return {
      instructions,
      startingPoint: [startingPoint.row, startingPoint.column],
    };
  }

  checkOutOfBounds(instructions: Instruction[][], coordinate: Coordinate) {
    return (
      coordinate[0] > instructions.length - 1 ||
      coordinate[1] > instructions[0].length - 1 ||
      coordinate[0] < 0 ||
      coordinate[1] < 0
    );
  }

  getNextCoordinate(
    nextInstruction: Instruction,
    previousCoordinate: Coordinate,
    currentCoordinate: Coordinate
  ) {
    const nextCoordinate = this.nextCoordinate[nextInstruction]?.(
      previousCoordinate,
      currentCoordinate
    );
    return nextCoordinate || [-1, -1];
  }

  followPath(map: Map, path: Path) {
    let previousCoordinate = map.startingPoint;
    let currentCoordinate = path.startingCoordinate;
    let nextCoordinate: Coordinate | undefined = undefined;
    let nextInstruction =
      map.instructions[currentCoordinate[0]][currentCoordinate[1]];
    while (nextInstruction !== 'S') {
      nextCoordinate = this.getNextCoordinate(
        nextInstruction,
        previousCoordinate,
        currentCoordinate
      );
      if (this.checkOutOfBounds(map.instructions, nextCoordinate)) {
        return {
          ...path,
          visitedCoordinates: [],
        };
      }
      nextInstruction = map.instructions[nextCoordinate[0]][nextCoordinate[1]];
      if (nextInstruction === '.') {
        return {
          ...path,
          visitedCoordinates: [],
        };
      }
      path.visitedCoordinates.push(currentCoordinate);
      previousCoordinate = currentCoordinate;
      currentCoordinate = nextCoordinate;
    }
    return path;
  }

  calculateAreaOfPath(path: Path) {
    const cornerCoordinates = [
      ...path.visitedCoordinates,
      path.startingCoordinate,
    ];
    const area = createRangeArray(cornerCoordinates.length).reduce(
      (runningTotal, _, idx) => {
        if (idx === cornerCoordinates.length - 1) {
        }
        const currentCoordinate = cornerCoordinates[idx];
        const nextCoordinate =
          idx === cornerCoordinates.length - 1
            ? cornerCoordinates[0]
            : cornerCoordinates[idx + 1];
        const shoelace =
          currentCoordinate[0] * nextCoordinate[1] -
          currentCoordinate[1] * nextCoordinate[0];
        return runningTotal + shoelace;
      },
      0
    );
    return Math.abs(area) / 2;
  }

  calculateNumberOfInternalPoints(
    area: number,
    numberOfBoundaryPoints: number
  ) {
    return area - numberOfBoundaryPoints / 2 + 1;
  }

  createPaths(startingCoordinate: Coordinate): Path[] {
    const startingCoordinates: Coordinate[] = [
      [startingCoordinate[0] + 1, startingCoordinate[1]],
      [startingCoordinate[0] - 1, startingCoordinate[1]],
      [startingCoordinate[0], startingCoordinate[1] + 1],
      [startingCoordinate[0], startingCoordinate[1] - 1],
    ];
    return startingCoordinates
      .map<Path>((coordinate) => ({
        startingCoordinate: coordinate,
        visitedCoordinates: [startingCoordinate],
      }))
      .filter(
        (path) =>
          path.startingCoordinate[0] >= 0 && path.startingCoordinate[1] >= 0
      );
  }

  checkCoordinatesAreEqual(coordinate1: Coordinate, coordinate2: Coordinate) {
    return (
      coordinate1[0] === coordinate2[0] && coordinate1[1] === coordinate2[1]
    );
  }

  solveForPartOne(input: string): string {
    const lines = input.split('\n');
    const map = this.constructMap(lines);
    const paths = this.createPaths(map.startingPoint);
    const maxNumSteps = paths
      .map((path) => this.followPath(map, path))
      .filter((path) => path.visitedCoordinates.length > 0)
      .sort(
        (a, b) => b.visitedCoordinates.length - a.visitedCoordinates.length
      )[0].visitedCoordinates.length;
    return `${Math.floor(maxNumSteps / 2)}`;
  }

  solveForPartTwo(input: string): string {
    const lines = input.split('\n');
    const map = this.constructMap(lines);
    const mainPath = this.createPaths(map.startingPoint)
      .map((path) => this.followPath(map, path))
      .filter((path) => path.visitedCoordinates.length > 0)
      .sort(
        (a, b) => b.visitedCoordinates.length - a.visitedCoordinates.length
      )[0];
    const area = this.calculateAreaOfPath(mainPath);
    const numberOfInternalPoints = this.calculateNumberOfInternalPoints(
      area,
      mainPath.visitedCoordinates.length
    );
    return `${Math.floor(numberOfInternalPoints)}`;
  }
}

export default new Day10();
