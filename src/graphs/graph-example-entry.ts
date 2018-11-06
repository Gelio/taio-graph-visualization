import { AlgorithmCriterium } from './algorithm-criterium';

export interface GraphExampleEntry {
  name: string;
  graph1Csv: string;
  graph2Csv: string;
  criterium: AlgorithmCriterium;
  approximateResultCsv?: string;
  approximateResultTime?: string;
  exactResultCsv?: string;
  exactResultTime?: string;
  comment: string;
}
