import Day from '../day';

class Day4 extends Day {
  constructor() {
    super(4);
  }

  removeCardPrefix(line: string) {
    return line.split(':')[1].trim();
  }

  extractNumbers(line: string) {
    return line.split('|').map((split) =>
      split
        .trim()
        .split(/ +/)
        .map((number) => +number)
    );
  }

  countMatches(winningNumbers: number[], cardNumbers: number[]) {
    return winningNumbers.filter((number) => cardNumbers.includes(number))
      .length;
  }

  solveForPartOne(input: string): string {
    const lines = input.split('\n').map(this.removeCardPrefix);

    const result = lines
      .map((line) => this.extractNumbers(line))
      .map((numbers) => this.countMatches(numbers[0], numbers[1]))
      .map((numMatches) => (numMatches === 0 ? 0 : 2 ** (numMatches - 1)))
      .reduce((previous, current) => previous + current);

    return `${result}`;
  }

  solveForPartTwo(input: string): string {
    const lines = input.split('\n').map(this.removeCardPrefix);

    const cardCopies = Array<number>(lines.length).fill(1);

    lines
      .map((line) => this.extractNumbers(line))
      .map((numbers) => this.countMatches(numbers[0], numbers[1]))
      .forEach((numMatches, idx) => {
        const numCopies = cardCopies[idx];
        for (let i = 1; i <= numMatches; i++) {
          cardCopies[idx + i] += numCopies;
        }
      });

    return `${cardCopies.reduce((previous, current) => previous + current)}`;
  }
}

export default new Day4();
