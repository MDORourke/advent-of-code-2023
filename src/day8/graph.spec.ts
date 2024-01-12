import Graph from './graph';

test('addConnection', () => {
  const graph = new Graph();
  graph.addConnection('A', 'B', 'C');
  graph.addConnection('B', 'C', 'D');

  const expectedOutput = {
    ['A']: ['B', 'C'],
    ['B']: ['C', 'D'],
  };

  const output = graph.connections;

  expect(output).toStrictEqual(expectedOutput);
});

test('traverseLeft', () => {
  const graph = new Graph();
  graph.addConnection('A', 'B', 'C');
  const output = graph.traverseLeft('A');
  expect(output).toBe('B');
});

test('traverseRight', () => {
  const graph = new Graph();
  graph.addConnection('A', 'B', 'C');
  const output = graph.traverseRight('A');
  expect(output).toBe('C');
});

test('getParentNodes', () => {
  const graph = new Graph();
  graph.addConnection('A', 'B', 'C');
  graph.addConnection('B', 'C', 'D');
  const output = graph.getParentNodes();
  expect(output).toStrictEqual(['A', 'B']);
});
