import { Data, DataSet, Edge, Node } from 'vis';

import { csvToMatrix, Matrix } from './common';

export function createGraphFromCSV(data: string): Data {
  const adjacencyMatrix = csvToMatrix(data);
  const nodesCount = adjacencyMatrix.length;

  return {
    nodes: createNodes(nodesCount),
    edges: createEdges(adjacencyMatrix)
  };
}

function createNodes(nodesCount: number): DataSet<Node> {
  const nodes = new DataSet<Node>();

  for (let i = 0; i < nodesCount; i++) {
    nodes.add({
      id: i,
      label: i.toString(),
      color: '#45b7b7'
    });
  }

  return nodes;
}

function createEdges(adjacencyMatrix: Matrix): DataSet<Edge> {
  const nodesCount = adjacencyMatrix.length;
  const edges = new DataSet<Edge>();

  for (let v1 = 0; v1 < nodesCount; v1++) {
    for (let v2 = v1 + 1; v2 < nodesCount; v2++) {
      if (adjacencyMatrix[v1][v2]) {
        edges.add({
          from: v1,
          to: v2,
          color: '#45b7b7'
        });
      }
    }
  }

  return edges;
}
