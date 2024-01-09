export type AlmanacMapEntry = {
  destinationRangeStart: number;
  sourceRangeStart: number;
  sourceRangeEnd: number;
};

export type AlmanacMapKey =
  | 'SEED2SOIL'
  | 'SOIL2FERTILISER'
  | 'FERTILISER2WATER'
  | 'WATER2LIGHT'
  | 'LIGHT2TEMPERATURE'
  | 'TEMPERATURE2HUMIDITY'
  | 'HUMIDITY2LOCATION';

const ALMANAC_HEADER_MAP: {
  [key: string]: AlmanacMapKey;
} = {
  ['seed-to-soil map:']: 'SEED2SOIL',
  ['soil-to-fertilizer map:']: 'SOIL2FERTILISER',
  ['fertilizer-to-water map:']: 'FERTILISER2WATER',
  ['water-to-light map:']: 'WATER2LIGHT',
  ['light-to-temperature map:']: 'LIGHT2TEMPERATURE',
  ['temperature-to-humidity map:']: 'TEMPERATURE2HUMIDITY',
  ['humidity-to-location map:']: 'HUMIDITY2LOCATION',
};

export type Almanac = {
  [Key in AlmanacMapKey]: AlmanacMapEntry[];
};

export default class AlmanacParser {
  parseMapEntries(line: string): AlmanacMapEntry {
    const [destinationRangeStart, sourceRangeStart, range] = line
      .split(' ')
      .map((entry) => +entry);
    return {
      destinationRangeStart,
      sourceRangeStart,
      sourceRangeEnd: sourceRangeStart + range,
    };
  }

  parseAlmanacHeader(line: string): AlmanacMapKey {
    return ALMANAC_HEADER_MAP[line];
  }

  parseAlmanac(lines: string[]): Almanac {
    const almanac: Almanac = {
      SEED2SOIL: [],
      SOIL2FERTILISER: [],
      FERTILISER2WATER: [],
      WATER2LIGHT: [],
      LIGHT2TEMPERATURE: [],
      TEMPERATURE2HUMIDITY: [],
      HUMIDITY2LOCATION: [],
    };

    // Seed to soil is a fairly safe bet
    let currentMap: AlmanacMapKey = 'SEED2SOIL';

    for (const line of lines) {
      // Ignore empty lines
      if (line.length === 0) {
        continue;
      }

      // If the line starts with a digit, parse the line
      // and add it to the current map
      if (/^\d/.test(line)) {
        almanac[currentMap].push(this.parseMapEntries(line));
      } else {
        currentMap = this.parseAlmanacHeader(line);
      }
    }

    return almanac;
  }
}
