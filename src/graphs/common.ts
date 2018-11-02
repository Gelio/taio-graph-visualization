export type Matrix = number[][];

export function csvToMatrix(data: string): Matrix {
  return data
    .replace(/\\r/g, '')
    .split('\n')
    .map(row => row.trim())
    .filter(row => row !== '')
    .map(row => row.split(',').map(element => parseInt(element, 10)));
}
