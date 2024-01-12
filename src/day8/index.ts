import Day from '../day';
import Graph from './graph';

type Instruction = 'L' | 'R';

class Day8 extends Day {
  constructor() {
    super(8);
  }

  createInstructions(line: string, repeats?: number) {
    return line.repeat(repeats ? repeats + 1 : 1).split('') as Instruction[];
  }

  constructGraph(lines: string[]): Graph {
    const parsedLines = lines
      .map((line) => line.replace(/[ \(\)]/g, ''))
      .map((line) => {
        const [node, childNodes] = line.split('=');
        const [leftNode, rightNode] = childNodes.split(',');
        return {
          node,
          leftNode,
          rightNode,
        };
      });

    const graph = new Graph();
    for (const { node, leftNode, rightNode } of parsedLines) {
      graph.addConnection(node, leftNode, rightNode);
    }
    return graph;
  }

  traverseGraph(graph: Graph, currentNode: string, instruction: Instruction) {
    if (instruction === 'L') {
      return graph.traverseLeft(currentNode);
    }
    return graph.traverseRight(currentNode);
  }

  findNodesEndingIn(nodes: string[], suffix: string) {
    return nodes.filter((node) => node[2] === suffix);
  }

  greatestCommonDenominator(a: number, b: number): number {
    if (b === 0) {
      return a;
    }
    return this.greatestCommonDenominator(b, a % b);
  }

  lowestCommonMultiple(a: number, b: number): number {
    return a * (b / this.greatestCommonDenominator(a, b));
  }

  solveForPartOne(input: string): string {
    const lines = input.split('\n');
    const instructions = this.createInstructions(lines[0], 500);
    const graph = this.constructGraph(lines.splice(2));
    let currentNode = 'AAA';
    let steps = 0;

    while (currentNode !== 'ZZZ' && steps <= instructions.length) {
      currentNode =
        this.traverseGraph(graph, currentNode, instructions[steps]) || '';
      steps = steps + 1;
    }

    if (currentNode !== 'ZZZ') {
      return 'Failed';
    }

    return `${steps}`;
  }

  solveForPartTwo(input: string, maxLoops?: number): string {
    const lines = input.split('\n');
    const instructions = this.createInstructions(lines[0], 100000);
    const graph = this.constructGraph(lines.splice(2));

    const startingNodes = this.findNodesEndingIn(graph.getParentNodes(), 'A');
    const journeySteps: number[] = [];

    for (const startingNode of startingNodes) {
      let currentNode = startingNode;
      let steps = 0;
      while (currentNode[2] !== 'Z' && steps < (maxLoops || 1000000)) {
        currentNode =
          this.traverseGraph(graph, currentNode, instructions[steps]) || '';
        steps = steps + 1;
      }
      journeySteps.push(steps);
    }

    const lowestCommonJourneyLength = journeySteps.reduce((previous, current) =>
      this.lowestCommonMultiple(previous, current)
    );

    return `${lowestCommonJourneyLength}`;
  }
}

export default new Day8();
