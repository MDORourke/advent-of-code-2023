import Day from '../day';

type RoundInfo = {
  numRed: number;
  numGreen: number;
  numBlue: number;
};

type GameInfo = {
  id: number;
  maxRed: number;
  maxGreen: number;
  maxBlue: number;
};

class Day2 extends Day {
  constructor() {
    super(2);
  }

  parseRound(round: string): RoundInfo {
    const findGroup = (
      groups: { number: number; type: string }[],
      groupType: string
    ) => groups.find((group) => group.type === groupType)?.number || 0;

    const groups = round
      .split(', ')
      .map((group) => group.trim())
      .map((group) => group.split(' '))
      .map((group) => ({
        number: +group[0],
        type: group[1],
      }));

    return {
      numRed: findGroup(groups, 'red'),
      numGreen: findGroup(groups, 'green'),
      numBlue: findGroup(groups, 'blue'),
    };
  }

  parseGame(line: string): GameInfo {
    const gameID = +(line.match(/Game (\d+)/)?.[1] || 0);

    const rounds = line.replace(/Game (\d+):/, '').split(';');

    const maxRound = rounds
      .map(this.parseRound)
      .reduce((previousRound, currentRound) => {
        return {
          numRed:
            currentRound.numRed > previousRound.numRed
              ? currentRound.numRed
              : previousRound.numRed,
          numGreen:
            currentRound.numGreen > previousRound.numGreen
              ? currentRound.numGreen
              : previousRound.numGreen,
          numBlue:
            currentRound.numBlue > previousRound.numBlue
              ? currentRound.numBlue
              : previousRound.numBlue,
        };
      });

    return {
      id: gameID,
      maxRed: maxRound.numRed,
      maxGreen: maxRound.numGreen,
      maxBlue: maxRound.numBlue,
    };
  }

  checkGamePossible(
    info: GameInfo,
    allowedRed: number,
    allowedGreen: number,
    allowedBlue: number
  ) {
    return (
      info.maxRed <= allowedRed &&
      info.maxGreen <= allowedGreen &&
      info.maxBlue <= allowedBlue
    );
  }

  solveForPartOne(input: string): string {
    const lines = input.split('\n');
    const result = lines
      .map(this.parseGame, this)
      .filter((game) => this.checkGamePossible(game, 12, 13, 14))
      .map((game) => game.id)
      .reduce((previous, current) => previous + current);

    return `${result}`;
  }

  solveForPartTwo(input: string): string {
    const lines = input.split('\n');
    const result = lines
      .map(this.parseGame, this)
      .map((game) => game.maxRed * game.maxGreen * game.maxBlue)
      .reduce((previous, current) => previous + current);

    return `${result}`;
  }
}

export default new Day2();
