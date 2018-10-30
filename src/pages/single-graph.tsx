import React, { PureComponent } from 'react';
import { Data } from 'vis';

import { Graph } from 'src/components/graph';
import {
  TextFileUpload,
  TextFileUploadProps
} from 'src/components/text-file-upload';
import { createGraphFromCSV } from 'src/graphs/graph-factory';

interface SingleGraphPageState {
  graphData?: Data;
}

export class SingleGraphPage extends PureComponent<{}, SingleGraphPageState> {
  public state: SingleGraphPageState = {};

  public render() {
    return (
      <div>
        <div>
          Select a csv file:
          <TextFileUpload accept=".csv" onChange={this.onFileUpload} />
        </div>
        {this.renderGraph()}
      </div>
    );
  }

  private onFileUpload: TextFileUploadProps['onChange'] = data => {
    this.setState({
      graphData: createGraphFromCSV(data)
    });
  };

  private renderGraph = () => {
    const { graphData } = this.state;

    if (!graphData) {
      return;
    }

    return <Graph data={graphData} options={{}} />;
  };
}
