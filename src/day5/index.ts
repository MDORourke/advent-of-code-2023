import Day from '../day';
import AlmanacParser, {
  type Almanac,
  type AlmanacMapEntry,
} from './almanacParser';

class Day5 extends Day {
  constructor() {
    super(5);
  }

  parseSeeds(seedLine: string) {
    return seedLine
      .replace('seeds: ', '')
      .split(' ')
      .map((entry) => +entry);
  }

  parseSeedRanges(seedLine: string) {
    return seedLine
      .replace('seeds: ', '')
      .match(/[^ ]+ [^ ]+/g)
      ?.map((match) => {
        const [start, range] = match.split(' ');
        return {
          seedStart: +start,
          seedEnd: +start + +range,
        };
      });
  }

  findNextCategory(category: number, map: AlmanacMapEntry[]) {
    const nextCategory = map.find(
      (entry) =>
        category >= entry.sourceRangeStart && category < entry.sourceRangeEnd
    );
    return nextCategory
      ? nextCategory?.destinationRangeStart +
          (category - nextCategory?.sourceRangeStart)
      : category;
  }

  followPath(seedCategory: number, almanac: Almanac) {
    const soil = this.findNextCategory(seedCategory, almanac.SEED2SOIL);
    const fertiliser = this.findNextCategory(soil, almanac.SOIL2FERTILISER);
    const water = this.findNextCategory(fertiliser, almanac.FERTILISER2WATER);
    const light = this.findNextCategory(water, almanac.WATER2LIGHT);
    const temperature = this.findNextCategory(light, almanac.LIGHT2TEMPERATURE);
    const humidity = this.findNextCategory(
      temperature,
      almanac.TEMPERATURE2HUMIDITY
    );
    const location = this.findNextCategory(humidity, almanac.HUMIDITY2LOCATION);
    return location;
  }

  solveForPartOne(input: string): string {
    const lines = input.split('\n');

    const seeds = this.parseSeeds(lines[0]);

    const parser = new AlmanacParser();
    const almanac = parser.parseAlmanac(lines.splice(2));

    const lowestLocation = Math.min(
      ...seeds.map((seed) => this.followPath(seed, almanac))
    );

    return `${lowestLocation}`;
  }

  solveForPartTwo(input: string): string {
    const lines = input.split('\n');

    const seeds = this.parseSeedRanges(lines[0]);

    const parser = new AlmanacParser();
    const almanac = parser.parseAlmanac(lines.splice(2));

    const lowestLocation = seeds
      ? Math.min(
          ...seeds?.flatMap((seed) => {
            console.log(`Seed start: ${seed.seedStart}`);
            let lowestLocation: number | undefined;
            for (let i = seed.seedStart; i < seed.seedEnd; i++) {
              const location = this.followPath(i, almanac);
              if (location < (lowestLocation || location + 1)) {
                lowestLocation = location;
              }
            }
            console.log('Seed end');
            return lowestLocation || 0;
          })
        )
      : 0;

    return `${lowestLocation}`;
  }
}

export default new Day5();
