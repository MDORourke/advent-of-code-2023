import Day7, { Hand, Rank } from '.';

test('parseHands', () => {
  const input = ['32T3K 765', 'T55J5 684'];
  const output = Day7.parseHands(input);
  expect(output).toStrictEqual([
    {
      cards: ['3', '2', 'T', '3', 'K'],
      bid: 765,
    },
    {
      cards: ['T', '5', '5', 'J', '5'],
      bid: 684,
    },
  ]);
});

describe('rankFunctions', () => {
  test.each<[Hand, Rank]>([
    [
      {
        cards: ['2', '3', '4', '5', '6'],
        bid: 0,
      },
      Rank.HIGH,
    ],
    [
      {
        cards: ['2', '2', '3', '4', '5'],
        bid: 0,
      },
      Rank.PAIR,
    ],
    [
      {
        cards: ['2', '2', '3', '3', '4'],
        bid: 0,
      },
      Rank.TWO_PAIR,
    ],
    [
      {
        cards: ['2', '2', '2', '3', '4'],
        bid: 0,
      },
      Rank.THREE_OF_A_KIND,
    ],
    [
      {
        cards: ['2', '2', '2', '3', '3'],
        bid: 0,
      },
      Rank.FULL_HOUSE,
    ],
    [
      {
        cards: ['2', '2', '2', '2', '3'],
        bid: 0,
      },
      Rank.FOUR_OF_A_KIND,
    ],
    [
      {
        cards: ['2', '2', '2', '2', '2'],
        bid: 0,
      },
      Rank.FIVE_OF_A_KIND,
    ],
  ])('ranks standard hands', (hand, rank) => {
    const output = Day7.calculateRank(hand);
    expect(output).toBe(rank);
  });

  test.each<[Hand, Rank]>([
    [
      {
        cards: ['2', 'X', '3', '4', '5'],
        bid: 0,
      },
      Rank.PAIR,
    ],
    [
      {
        cards: ['2', '2', 'X', '4', '5'],
        bid: 0,
      },
      Rank.THREE_OF_A_KIND,
    ],
    [
      {
        cards: ['2', '2', '3', '3', 'X'],
        bid: 0,
      },
      Rank.FULL_HOUSE,
    ],
    [
      {
        cards: ['2', '2', '2', 'X', '3'],
        bid: 0,
      },
      Rank.FOUR_OF_A_KIND,
    ],
    [
      {
        cards: ['2', '2', 'X', 'X', '3'],
        bid: 0,
      },
      Rank.FOUR_OF_A_KIND,
    ],
    [
      {
        cards: ['2', '2', '2', '2', 'X'],
        bid: 0,
      },
      Rank.FIVE_OF_A_KIND,
    ],
  ])('ranks joker hands', (hand, rank) => {
    const output = Day7.calculateRank(hand);
    expect(output).toBe(rank);
  });
});

test('compareHands', () => {
  const handOne: Hand = {
    cards: ['K', 'T', 'J', 'J', 'T'],
    bid: 220,
  };
  const handTwo: Hand = {
    cards: ['K', 'K', '6', '7', '7'],
    bid: 28,
  };
  const output = Day7.compareHands(handOne, handTwo);
  expect(output).toBe(-3);
});

test('Part 1', () => {
  const input = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

  const output = Day7.solveForPartOne(input);

  expect(output).toBe('6440');
});

test('Part 2', () => {
  const input = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

  const output = Day7.solveForPartTwo(input);

  expect(output).toBe('5905');
});
