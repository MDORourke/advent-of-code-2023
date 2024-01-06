import Day from '../day';

class Day1 extends Day {
  constructor() {
    super(1);
  }

  findDigit(chars: string[]): string | undefined {
    return chars.find((char) => !isNaN(+char));
  }

  parseLine(line: string) {
    const chars = line.split('');
    const firstNum = this.findDigit(chars);
    const lastNum = this.findDigit(chars.reverse());

    return `${firstNum}${lastNum}`;
  }

  reduceValues(previousValue: string, currentValue: string) {
    return `${+previousValue + +currentValue}`;
  }

  solveForPartOne(input: string): string {
    const lines = input.split('\n');
    const result = lines.map(this.parseLine, this).reduce(this.reduceValues);

    return result;
  }

  solveForPartTwo(input: string): string {
    const replaceDigitWords = (line: string) =>
      line
        .replace(/one/g, 'one1one')
        .replace(/two/g, 'two2two')
        .replace(/three/g, 'three3three')
        .replace(/four/g, 'four4four')
        .replace(/five/g, 'five5five')
        .replace(/six/g, 'six6six')
        .replace(/seven/g, 'seven7seven')
        .replace(/eight/g, 'eight8eight')
        .replace(/nine/g, 'nine9nine');

    const lines = input.split('\n');

    const result = lines
      .map(replaceDigitWords)
      .map(this.parseLine, this)
      .reduce(this.reduceValues);

    return result;
  }
}

export default new Day1();
