import { Data, DataSet, Edge, Node } from 'vis';

import { IsomorphismSequences } from './transform-isomorphism-sequences';

const highlightColor = '#f57665';

export function visualizeIsomorphism(
  graph1: Data,
  graph2: Data,
  isomorphismSequences: IsomorphismSequences
) {
  const [sequence1, sequence2] = isomorphismSequences;
  const graph1Nodes = graph1.nodes as DataSet<Node>;
  const graph1Edges = graph1.edges as DataSet<Edge>;
  const graph2Nodes = graph2.nodes as DataSet<Node>;
  const graph2Edges = graph2.edges as DataSet<Edge>;

  for (let i = 0; i < sequence1.length; i++) {
    const v = sequence1[i];
    const u = sequence2[i];

    graph1Nodes.update({
      id: v,
      color: highlightColor,
      label: `${v} (${i})`
    });

    graph2Nodes.update({
      id: u,
      color: highlightColor,
      label: `${u} (${i})`
    });
  }

  graph1Edges.forEach(edge => {
    if (
      sequence1.indexOf(edge.from as number) !== -1 &&
      sequence1.indexOf(edge.to as number) !== -1
    ) {
      graph1Edges.update({
        id: `${edge.from}-${edge.to}`,
        color: {
          color: highlightColor
        }
      });
    }
  });

  graph2Edges.forEach(edge => {
    if (
      sequence2.indexOf(edge.from as number) !== -1 &&
      sequence2.indexOf(edge.to as number) !== -1
    ) {
      graph2Edges.update({
        id: `${edge.from}-${edge.to}`,
        color: {
          color: highlightColor
        }
      });
    }
  });
}
