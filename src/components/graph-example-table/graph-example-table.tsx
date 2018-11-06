import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';
import React, { PureComponent } from 'react';

import { GraphExampleEntry } from 'src/graphs/graph-example-entry';
import { GraphTableRow } from './graph-table-row';

export interface GraphExampleTableProps {
  graphsRef: import('firebase').database.Reference;
}

interface Dictionary<V> {
  [key: string]: V;
}

interface GraphExampleTableState {
  examples: Dictionary<GraphExampleEntry>;
}

export class GraphExampleTable extends PureComponent<
  GraphExampleTableProps,
  GraphExampleTableState
> {
  public state: GraphExampleTableState = {
    examples: {}
  };

  public componentDidMount() {
    this.props.graphsRef.on('value', this.onNewData);
  }

  public componentWillUnmount() {
    this.props.graphsRef.off('value', this.onNewData);
  }

  public render() {
    const { examples } = this.state;

    return (
      <div style={{ marginTop: 20 }}>
        <Typography variant="h6" gutterBottom={true}>
          Example graphs
        </Typography>
        <Typography variant="body1" gutterBottom={true}>
          Beware. The table is not paginated and downloads all the data at once.
          I did not have enough time to improve the performance.
        </Typography>
        <Typography variant="body1" gutterBottom={true}>
          Click on a row to show the comment.
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Graph 1 CSV</TableCell>
              <TableCell>Graph 2 CSV</TableCell>
              <TableCell>Criterium</TableCell>
              <TableCell>Exact result</TableCell>
              <TableCell>Approximate result</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from(Object.entries(examples)).map(this.renderRow)}
          </TableBody>
        </Table>
      </div>
    );
  }

  private renderRow = ([key, row]: [string, GraphExampleEntry]) => {
    return <GraphTableRow key={key} rowKey={key} value={row} />;
  };

  private onNewData = (
    snapshot: import('firebase').database.DataSnapshot | null
  ) => {
    if (!snapshot) {
      this.setState({
        examples: {}
      });

      return;
    }

    const data: Dictionary<GraphExampleEntry> = snapshot.val();

    this.setState({
      examples: data
    });
  };
}
