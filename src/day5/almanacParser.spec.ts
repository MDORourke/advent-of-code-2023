import AlmanacParser from './almanacParser';

test('parseMapEntries', () => {
  const parser = new AlmanacParser();
  const input = '50 98 2';
  const output = parser.parseMapEntries(input);
  expect(output).toStrictEqual({
    destinationRangeStart: 50,
    sourceRangeStart: 98,
    sourceRangeEnd: 100,
  });
});

test.each([
  ['seed-to-soil map:', 'SEED2SOIL'],
  ['soil-to-fertilizer map:', 'SOIL2FERTILISER'],
  ['fertilizer-to-water map:', 'FERTILISER2WATER'],
  ['water-to-light map:', 'WATER2LIGHT'],
  ['light-to-temperature map:', 'LIGHT2TEMPERATURE'],
  ['temperature-to-humidity map:', 'TEMPERATURE2HUMIDITY'],
  ['humidity-to-location map:', 'HUMIDITY2LOCATION'],
])('parseAlmanacHeader', (input, expectedOutput) => {
  const parser = new AlmanacParser();
  const output = parser.parseAlmanacHeader(input);
  expect(output).toBe(expectedOutput);
});

test('parseAlmanac', () => {
  const parser = new AlmanacParser();
  const input = [
    'seed-to-soil map:',
    '50 98 2',
    '52 50 48',
    '',
    'soil-to-fertilizer map:',
    '0 15 37',
    '37 52 2',
    '39 0 15',
    '',
    'fertilizer-to-water map:',
    '49 53 8',
    '0 11 42',
    '42 0 7',
    '57 7 4',
    '',
    'water-to-light map:',
    '88 18 7',
    '18 25 70',
    '',
    'light-to-temperature map:',
    '45 77 23',
    '81 45 19',
    '68 64 13',
    '',
    'temperature-to-humidity map:',
    '0 69 1',
    '1 0 69',
    '',
    'humidity-to-location map:',
    '60 56 37',
    '56 93 4',
  ];
  const output = parser.parseAlmanac(input);
  expect(output).toStrictEqual({
    SEED2SOIL: [
      {
        destinationRangeStart: 50,
        sourceRangeStart: 98,
        sourceRangeEnd: 100,
      },
      {
        destinationRangeStart: 52,
        sourceRangeStart: 50,
        sourceRangeEnd: 98,
      },
    ],
    SOIL2FERTILISER: [
      {
        destinationRangeStart: 0,
        sourceRangeStart: 15,
        sourceRangeEnd: 52,
      },
      {
        destinationRangeStart: 37,
        sourceRangeStart: 52,
        sourceRangeEnd: 54,
      },
      {
        destinationRangeStart: 39,
        sourceRangeStart: 0,
        sourceRangeEnd: 15,
      },
    ],
    FERTILISER2WATER: [
      {
        destinationRangeStart: 49,
        sourceRangeStart: 53,
        sourceRangeEnd: 61,
      },
      {
        destinationRangeStart: 0,
        sourceRangeStart: 11,
        sourceRangeEnd: 53,
      },
      {
        destinationRangeStart: 42,
        sourceRangeStart: 0,
        sourceRangeEnd: 7,
      },
      {
        destinationRangeStart: 57,
        sourceRangeStart: 7,
        sourceRangeEnd: 11,
      },
    ],
    WATER2LIGHT: [
      {
        destinationRangeStart: 88,
        sourceRangeStart: 18,
        sourceRangeEnd: 25,
      },
      {
        destinationRangeStart: 18,
        sourceRangeStart: 25,
        sourceRangeEnd: 95,
      },
    ],
    LIGHT2TEMPERATURE: [
      {
        destinationRangeStart: 45,
        sourceRangeStart: 77,
        sourceRangeEnd: 100,
      },
      {
        destinationRangeStart: 81,
        sourceRangeStart: 45,
        sourceRangeEnd: 64,
      },
      {
        destinationRangeStart: 68,
        sourceRangeStart: 64,
        sourceRangeEnd: 77,
      },
    ],
    TEMPERATURE2HUMIDITY: [
      {
        destinationRangeStart: 0,
        sourceRangeStart: 69,
        sourceRangeEnd: 70,
      },
      {
        destinationRangeStart: 1,
        sourceRangeStart: 0,
        sourceRangeEnd: 69,
      },
    ],
    HUMIDITY2LOCATION: [
      {
        destinationRangeStart: 60,
        sourceRangeStart: 56,
        sourceRangeEnd: 93,
      },
      {
        destinationRangeStart: 56,
        sourceRangeStart: 93,
        sourceRangeEnd: 97,
      },
    ],
  });
});
