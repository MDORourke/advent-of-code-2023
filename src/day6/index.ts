import Day from '../day';
import { createRangeArray } from '../helpers';

type Race = {
  time: number;
  distance: number;
};

class Day6 extends Day {
  constructor() {
    super(6);
  }

  parseRaces(lines: string[]): Race[] {
    // Assumes the lines contain the same number of elements
    const times = lines[0]
      .replace('Time:', '')
      .trim()
      .split(/\s+/)
      .map((time) => +time);
    const distances = lines[1]
      .replace('Distance:', '')
      .trim()
      .split(/\s+/)
      .map((distance) => +distance);

    return times.map((time, idx) => ({
      time,
      distance: distances[idx],
    }));
  }

  calculatePossibleDistances(time: number): number[] {
    return createRangeArray(time).map((_, idx) => idx * (time - idx));
  }

  solveForPartOne(input: string): string {
    const lines = input.split('\n');
    const races = this.parseRaces(lines);
    const result = races
      .flatMap(
        ({ distance, time }) =>
          this.calculatePossibleDistances(time).filter(
            (possibleDistance) => possibleDistance > distance
          ).length
      )
      .reduce((previous, current) => previous * current);
    return `${result}`;
  }

  solveForPartTwo(input: string): string {
    const lines = input.split('\n');
    const time = +lines[0].replace(/Time:| +/g, '');
    const distance = +lines[1].replace(/Distance:| +/g, '');

    let winningDistances = 0;
    for (let i = 0; i < time; i++) {
      const possibleDistance = i * (time - i);
      if (possibleDistance > distance) {
        winningDistances++;
      }
    }

    return `${winningDistances}`;
  }
}

export default new Day6();
