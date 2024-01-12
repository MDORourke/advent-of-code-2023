import Day from '../day';

const CARD_TO_VALUE = {
  ['A']: 14,
  ['K']: 13,
  ['Q']: 12,
  ['J']: 11,
  ['T']: 10,
  ['9']: 9,
  ['8']: 8,
  ['7']: 7,
  ['6']: 6,
  ['5']: 5,
  ['4']: 4,
  ['3']: 3,
  ['2']: 2,
  ['X']: 1, // Joker
};

type CardValue = keyof typeof CARD_TO_VALUE;

export type Hand = {
  cards: CardValue[];
  bid: number;
};

export enum Rank {
  HIGH,
  PAIR,
  TWO_PAIR,
  THREE_OF_A_KIND,
  FULL_HOUSE,
  FOUR_OF_A_KIND,
  FIVE_OF_A_KIND,
}

const checkForCardType = (
  matchingGroups: [string, number][],
  cardType: string
) => matchingGroups.map((group) => group[0]).includes(cardType);

const rankFunctions: {
  [length: number]: (matchingGroups: [string, number][]) => Rank;
} = {
  [5]: (matchingGroups) => {
    if (checkForCardType(matchingGroups, 'X')) {
      return Rank.PAIR;
    }
    return Rank.HIGH;
  },
  [4]: (matchingGroups) => {
    if (checkForCardType(matchingGroups, 'X')) {
      return Rank.THREE_OF_A_KIND;
    }
    return Rank.PAIR;
  },
  [3]: (matchingGroups) => {
    if (checkForCardType(matchingGroups, 'X')) {
      if (matchingGroups[2][1] === 3) {
        return Rank.FOUR_OF_A_KIND;
      } else if (matchingGroups[0][0] === 'X') {
        return Rank.FULL_HOUSE;
      }
      return Rank.FOUR_OF_A_KIND;
    }

    if (matchingGroups[2][1] === 3) {
      return Rank.THREE_OF_A_KIND;
    }
    return Rank.TWO_PAIR;
  },
  [2]: (matchingGroups) => {
    if (checkForCardType(matchingGroups, 'X')) {
      return Rank.FIVE_OF_A_KIND;
    } else if (matchingGroups[0][1] === 1) {
      return Rank.FOUR_OF_A_KIND;
    } else {
      return Rank.FULL_HOUSE;
    }
  },
  [1]: (_) => Rank.FIVE_OF_A_KIND,
};

class Day7 extends Day {
  constructor() {
    super(7);
  }

  parseHands(lines: string[]): Hand[] {
    return lines.map<Hand>((line) => {
      const [hand, bid] = line.split(' ');
      return {
        cards: hand.split('').map((char) => char as CardValue),
        bid: +bid,
      };
    });
  }

  calculateRank({ cards }: Hand): Rank {
    const matchingGroups = Object.entries(
      cards.reduce((charMap, char) => {
        charMap[char] = (charMap[char] || 0) + 1;
        return charMap;
      }, {} as { [key: string]: number })
    ).sort((a, b) => a[1] - b[1]);

    return rankFunctions[matchingGroups.length](matchingGroups);
  }

  compareHands(handOne: Hand, handTwo: Hand): number {
    for (let i = 0; i < handOne.cards.length; i++) {
      const cardOneValue = CARD_TO_VALUE[handOne.cards[i]];
      const cardTwoValue = CARD_TO_VALUE[handTwo.cards[i]];
      if (cardOneValue !== cardTwoValue) {
        return cardOneValue - cardTwoValue;
      }
    }
    return 0;
  }

  solveForPartOne(input: string): string {
    const lines = input.split('\n');
    const hands = this.parseHands(lines);
    const result = hands
      .map((hand) => ({
        ...hand,
        rank: this.calculateRank(hand),
      }))
      .sort(
        (handOne, handTwo) =>
          handOne.rank - handTwo.rank || this.compareHands(handOne, handTwo)
      )
      .reduce(
        (previous, current, idx) => previous + current.bid * (idx + 1),
        0
      );
    return `${result}`;
  }

  solveForPartTwo(input: string): string {
    const lines = input.replace(/J/g, 'X').split('\n');
    const hands = this.parseHands(lines);
    const result = hands
      .map((hand) => ({
        ...hand,
        rank: this.calculateRank(hand),
      }))
      .sort(
        (handOne, handTwo) =>
          handOne.rank - handTwo.rank || this.compareHands(handOne, handTwo)
      )
      .reduce(
        (previous, current, idx) => previous + current.bid * (idx + 1),
        0
      );
    return `${result}`;
  }
}

export default new Day7();
