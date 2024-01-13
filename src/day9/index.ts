import Day from '../day';
import { createRangeArray } from '../helpers';

class Day9 extends Day {
  constructor() {
    super(9);
  }

  calculateNextStep(pattern: number[]): number {
    // Assumption made here that the pattern will either increase
    // or decrease linearly
    if (pattern[0] === 0 && pattern[pattern.length - 1] === 0) {
      return 0;
    }
    const differences = createRangeArray(pattern.length - 1).map(
      (_, idx) => pattern[idx + 1] - pattern[idx]
    );
    const nextDifference = this.calculateNextStep(differences);
    return pattern[pattern.length - 1] + nextDifference;
  }

  solveForPartOne(input: string): string {
    const lines = input.split('\n');
    const result = lines
      .map((line) => line.split(' '))
      .map((pattern) => pattern.map((value) => +value))
      .map(this.calculateNextStep, this)
      .reduce((previous, current) => previous + current);
    return `${result}`;
  }

  solveForPartTwo(input: string): string {
    const lines = input.split('\n');
    const result = lines
      .map((line) => line.split(' '))
      .map((pattern) => pattern.map((value) => +value).reverse())
      .map(this.calculateNextStep, this)
      .reduce((previous, current) => previous + current);
    return `${result}`;
  }
}

export default new Day9();
