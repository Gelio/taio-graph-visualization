import { TableCell, TableRow } from '@material-ui/core';
import { TableRowProps } from '@material-ui/core/TableRow';
import React, { PureComponent } from 'react';

import { AlgorithmCriterium } from 'src/graphs/algorithm-criterium';
import { GraphExampleEntry } from 'src/graphs/graph-example-entry';
import { DownloadButton } from './download-button';

export interface GraphTableRowProps {
  rowKey: string;
  value: GraphExampleEntry;
}

interface GraphTableRowState {
  isOpen: boolean;
}

const stringifyCriterium = (criterium: AlgorithmCriterium) =>
  criterium === AlgorithmCriterium.SumVerticesAndEdges ? '|V| + |E|' : '|V|';

export class GraphTableRow extends PureComponent<
  GraphTableRowProps,
  GraphTableRowState
> {
  public state: GraphTableRowState = {
    isOpen: false
  };

  public render() {
    const { value } = this.props;
    const { isOpen } = this.state;

    return (
      <>
        <TableRow onClick={this.onToggle}>
          <TableCell component="th" scope="row">
            {value.name}
          </TableCell>
          <TableCell>
            <DownloadButton
              fileName={`${value.name}-1.csv`}
              value={value.graph1Csv}
              label="Download"
            />
          </TableCell>
          <TableCell>
            <DownloadButton
              fileName={`${value.name}-2.csv`}
              value={value.graph2Csv}
              label="Download"
            />
          </TableCell>
          <TableCell>{stringifyCriterium(value.criterium)}</TableCell>
          <TableCell>
            {value.exactResultCsv && (
              <DownloadButton
                fileName={`${value.name}-exact.csv`}
                label="Download"
                value={value.exactResultCsv}
              />
            )}
            {value.exactResultTime && `${value.exactResultTime} ms`}
          </TableCell>
          <TableCell>
            {value.approximateResultCsv && (
              <DownloadButton
                fileName={`${value.name}-approximate.csv`}
                label="Download"
                value={value.approximateResultCsv}
              />
            )}
            {value.approximateResultTime && `${value.approximateResultTime} ms`}
          </TableCell>
        </TableRow>

        {isOpen && (
          <TableRow style={{ backgroundColor: '#e2e2e2' }}>
            <TableCell colSpan={6}>
              <pre>{value.comment}</pre>
            </TableCell>
          </TableRow>
        )}
      </>
    );
  }

  private onToggle: TableRowProps['onClick'] = event => {
    if (!this.props.value.comment) {
      return;
    }

    this.setState(state => ({ isOpen: !state.isOpen }));
  };
}
