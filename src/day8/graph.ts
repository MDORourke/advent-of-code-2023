export default class Graph {
  connections: { [node: string]: [string, string] | [] } = {};

  addConnection(mainNode: string, leftNode: string, rightNode: string) {
    this.connections[mainNode] = [leftNode, rightNode];
  }

  traverseLeft(currentNode: string) {
    return this.connections[currentNode][0];
  }

  traverseRight(currentNode: string) {
    return this.connections[currentNode][1];
  }

  getParentNodes() {
    return Object.keys(this.connections);
  }
}
