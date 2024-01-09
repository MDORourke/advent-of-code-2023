import Day5 from '.';
import { type AlmanacMapEntry } from './almanacParser';

test('parseSeeds', () => {
  const input = 'seeds: 5 2 8 10';
  const output = Day5.parseSeeds(input);
  expect(output).toStrictEqual([5, 2, 8, 10]);
});

test('parseSeedRanges', () => {
  const input = 'seeds: 5 2 8 10';
  const output = Day5.parseSeedRanges(input);
  expect(output).toStrictEqual([
    {
      seedStart: 5,
      seedEnd: 7,
    },
    {
      seedStart: 8,
      seedEnd: 18,
    },
  ]);
});

describe('findNextCategory', () => {
  test('finds the correct destination category', () => {
    const category = 79;
    const map: AlmanacMapEntry[] = [
      {
        destinationRangeStart: 52,
        sourceRangeStart: 50,
        sourceRangeEnd: 98,
      },
    ];
    const output = Day5.findNextCategory(category, map);
    expect(output).toBe(81);
  });

  test('returns the passed in value if none is available', () => {
    const category = 79;
    const map: AlmanacMapEntry[] = [
      {
        destinationRangeStart: 10,
        sourceRangeStart: 0,
        sourceRangeEnd: 50,
      },
    ];
    const output = Day5.findNextCategory(category, map);
    expect(output).toBe(79);
  });
});

test('Part 1', () => {
  const input = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

  const output = Day5.solveForPartOne(input);
  expect(output).toBe('35');
});

test('Part 2', () => {
  const input = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

  const output = Day5.solveForPartTwo(input);
  expect(output).toBe('46');
});
