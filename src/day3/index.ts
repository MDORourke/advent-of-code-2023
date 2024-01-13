import Day from '../day';

type PartNumber = {
  identifier: string;
  value: number;
};

class Day3 extends Day {
  constructor() {
    super(3);
  }

  extractPartNumberRanges(line: string) {
    const partNumberMatches = Array.from(line.matchAll(/(\d+)/g));

    const mapPartNumberRanges = (partNumberMatch: {
      index: number;
      match: string;
      identifier: number;
    }) => {
      const startPos = partNumberMatch.index || 0;
      const endPos = partNumberMatch.match.length + startPos;

      return Array(endPos - startPos)
        .fill(startPos)
        .map((_, idx) => [
          startPos + idx,
          partNumberMatch.identifier,
          +partNumberMatch.match,
        ]);
    };

    const partNumberRanges: number[][] = partNumberMatches
      .map((partNumberMatch, idx) => ({
        index: partNumberMatch.index || 0,
        match: partNumberMatch[0],
        identifier: idx,
      }))
      .map(mapPartNumberRanges)
      .flat(1);

    return partNumberRanges;
  }

  extractSpecialCharacterCoordinates(line: string, lineNo: number) {
    return Array.from(line.matchAll(/(\S)/g)).map((match) => ({
      x: match.index || 0,
      y: lineNo,
    }));
  }

  getAdjacentPartNumbers(
    x: number,
    y: number,
    partNumberCoordinates: {
      [coordinate: string]: PartNumber;
    }
  ) {
    const coordinatesToCheck = [
      `${x - 1}|${y - 1}`,
      `${x}|${y - 1}`,
      `${x + 1}|${y - 1}`,
      `${x - 1}|${y}`,
      `${x + 1}|${y}`,
      `${x - 1}|${y + 1}`,
      `${x}|${y + 1}`,
      `${x + 1}|${y + 1}`,
    ];

    const isDuplicate = (partNumbers: PartNumber[], current: PartNumber) =>
      partNumbers
        .map((partNumber) => partNumber.identifier)
        .includes(current.identifier);

    const isPartNumber = (
      partNumber: PartNumber | undefined
    ): partNumber is PartNumber => !!partNumber;

    const adjacentPartNumbers = coordinatesToCheck
      .map((coordinate) =>
        coordinate in partNumberCoordinates
          ? partNumberCoordinates[coordinate]
          : undefined
      )
      .filter(isPartNumber)
      .reduce(
        (partNumbers, current) =>
          isDuplicate(partNumbers, current)
            ? partNumbers
            : [...partNumbers, current],
        [] as PartNumber[]
      );

    return adjacentPartNumbers;
  }

  buildPartNumberCoordinatesMap(lines: string[]) {
    const partNumberCoordinates: {
      [coordinate: string]: PartNumber;
    } = {};

    lines.forEach((line, idx) => {
      const partNumberRanges = this.extractPartNumberRanges(line);
      for (const partNumberRange of partNumberRanges) {
        partNumberCoordinates[`${partNumberRange[0]}|${idx}`] = {
          identifier: `${idx}|${partNumberRange[1]}`,
          value: partNumberRange[2],
        };
      }
    });

    return partNumberCoordinates;
  }

  solveForPartOne(input: string): string {
    const lines = input.split('\n');

    const partNumberCoordinates = this.buildPartNumberCoordinatesMap(lines);

    // Now we know where the values are, remove everything that isn't a special character
    const cleanLines = lines.map((line) => line.replace(/\d|\./g, ' '));

    // Find all remaining characters on each line
    const characterCoordinates = cleanLines.flatMap(
      this.extractSpecialCharacterCoordinates,
      this
    );

    const result = characterCoordinates
      .flatMap(({ x, y }) =>
        this.getAdjacentPartNumbers(x, y, partNumberCoordinates)
      )
      .reduce((previous, current) => previous + current.value, 0);

    return `${result}`;
  }

  solveForPartTwo(input: string): string {
    const lines = input.split('\n');

    const partNumberCoordinates = this.buildPartNumberCoordinatesMap(lines);

    const gearCoordinates = lines.flatMap((line, idx) =>
      Array.from(line.matchAll(/\*/g)).map((match) => ({
        x: match.index || 0,
        y: idx,
      }))
    );

    const result = gearCoordinates
      .map(
        ({ x, y }) => this.getAdjacentPartNumbers(x, y, partNumberCoordinates),
        this
      )
      .filter((coordinates) => coordinates.length === 2)
      .map((partNumbers) => partNumbers[0].value * partNumbers[1].value)
      .reduce((previous, current) => previous + current);

    return `${result}`;
  }
}

export default new Day3();
