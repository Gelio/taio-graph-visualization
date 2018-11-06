export type Matrix = number[][];

export function csvToMatrix(data: string): Matrix {
  return data
    .replace(/\\r/g, '')
    .split('\n')
    .map(row => row.trim())
    .filter(row => row !== '')
    .map(row => row.split(',').map(element => parseInt(element, 10)));
}

export function isGraphValid(graph: Matrix) {
  const n = graph.length;

  return graph.every(row => row.length === n);
}

function isVertexSequenceValid(graph: Matrix, sequence: number[]) {
  const n = graph.length;

  return sequence.every(vertex => vertex >= 0 && vertex < n);
}

export function isIsomorphismSequenceValid(
  graph1: Matrix,
  graph2: Matrix,
  isomorphismSequence: Matrix
) {
  return (
    isomorphismSequence.length === 2 &&
    isomorphismSequence[0].length === isomorphismSequence[1].length &&
    isVertexSequenceValid(graph1, isomorphismSequence[0]) &&
    isVertexSequenceValid(graph2, isomorphismSequence[1])
  );
}
