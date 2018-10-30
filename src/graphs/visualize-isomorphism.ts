import { Data, DataSet, Edge, Node } from 'vis';

import { IsomorphismSequences } from './transform-isomorphism-sequences';

export function visualizeIsomorphism(
  graph1: Data,
  graph2: Data,
  isomorphismSequences: IsomorphismSequences
) {
  const [sequence1, sequence2] = isomorphismSequences;
  const graph1Nodes = graph1.nodes as DataSet<Node>;
  const graph2Nodes = graph2.nodes as DataSet<Node>;

  for (let i = 0; i < sequence1.length; i++) {
    const v = sequence1[i];
    const u = sequence2[i];

    graph1Nodes.update({
      id: v,
      color: '#f57665',
      label: `${v} (${i})`
    });

    graph2Nodes.update({
      id: u,
      color: '#f57665',
      label: `${u} (${i})`
    });
  }

  (graph1.edges as DataSet<Edge>).forEach(edge => {
    if (
      sequence1.indexOf(edge.from as number) !== -1 &&
      sequence1.indexOf(edge.to as number) !== -1
    ) {
      edge.color = '#f57665';
    }
  });

  (graph2.edges as DataSet<Edge>).forEach(edge => {
    if (
      sequence2.indexOf(edge.from as number) !== -1 &&
      sequence2.indexOf(edge.to as number) !== -1
    ) {
      edge.color = '#f57665';
    }
  });
}
