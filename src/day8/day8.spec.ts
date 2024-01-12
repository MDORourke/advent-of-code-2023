import Day8 from '.';
import Graph from './graph';

test('createInstructions', () => {
  const input = 'LLLR';
  const output = Day8.createInstructions(input, 2);
  expect(output).toStrictEqual([
    'L',
    'L',
    'L',
    'R',
    'L',
    'L',
    'L',
    'R',
    'L',
    'L',
    'L',
    'R',
  ]);
});

test('constructGraph', () => {
  const input = ['AAA = (BBB, BBB)', 'BBB = (AAA, ZZZ)', 'ZZZ = (ZZZ, ZZZ)'];
  const output = Day8.constructGraph(input);
  const graph = new Graph();
  graph.addConnection('AAA', 'BBB', 'BBB');
  graph.addConnection('BBB', 'AAA', 'ZZZ');
  graph.addConnection('ZZZ', 'ZZZ', 'ZZZ');

  expect(output).toStrictEqual(graph);
});

describe('traverseGraph', () => {
  const graph = new Graph();
  graph.addConnection('AAA', 'BBB', 'CCC');

  test('left', () => {
    const output = Day8.traverseGraph(graph, 'AAA', 'L');
    expect(output).toBe('BBB');
  });

  test('right', () => {
    const output = Day8.traverseGraph(graph, 'AAA', 'R');
    expect(output).toBe('CCC');
  });
});

test('findNodesEndingIn', () => {
  const input = ['AAA', 'BBA', 'CCC'];
  const output = Day8.findNodesEndingIn(input, 'A');
  expect(output).toStrictEqual(['AAA', 'BBA']);
});

test('greatestCommonDenominator', () => {
  const output = Day8.greatestCommonDenominator(48, 18);
  expect(output).toBe(6);
});

test('lowestCommonMultiple', () => {
  const output = Day8.lowestCommonMultiple(4, 6);
  expect(output).toBe(12);
});

describe('Part 1', () => {
  test('Input 1', () => {
    const input = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`;
    const output = Day8.solveForPartOne(input);
    expect(output).toBe('2');
  });

  test('Input 2', () => {
    const input = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`;
    const output = Day8.solveForPartOne(input);
    expect(output).toBe('6');
  });
});

test('Part 2', () => {
  const input = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`;
  const output = Day8.solveForPartTwo(input, 10);
  expect(output).toBe('6');
});
