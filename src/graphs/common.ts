export type Matrix = number[][];

export function csvToMatrix(data: string): Matrix {
  return data
    .split('\r\n')
    .map(row => row.split(',').map(element => parseInt(element, 10)));
}
