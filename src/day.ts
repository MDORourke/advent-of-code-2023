import fs from 'fs';

abstract class Day {
  id: number;

  constructor(id: number) {
    this.id = id;
  }

  abstract solveForPartOne(input: string): string;

  abstract solveForPartTwo(input: string): string;

  async partOne(): Promise<string> {
    const content = await fs.promises.readFile(
      `./inputs/day${this.id}/part1.txt`
    );
    const result = this.solveForPartOne(content.toString());
    return result;
  }

  async partTwo(): Promise<string> {
    const content = await fs.promises.readFile(
      `./inputs/day${this.id}/part2.txt`
    );
    const result = this.solveForPartTwo(content.toString());
    return result;
  }
}

export default Day;
