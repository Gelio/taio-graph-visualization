import { csvToMatrix } from './common';

export type IsomorphismSequences = [number[], number[]];

export function transformIsomorphismSequences(
  data: string
): IsomorphismSequences {
  const matrix = csvToMatrix(data);

  return matrix as IsomorphismSequences;
}
