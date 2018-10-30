import { Button, Grid } from '@material-ui/core';
import React, { PureComponent, ReactNode } from 'react';
import { Data } from 'vis';

import { Graph } from 'src/components/graph';
import {
  TextFileUpload,
  TextFileUploadProps
} from 'src/components/text-file-upload';
import { createGraphFromCSV } from 'src/graphs/graph-factory';
import {
  IsomorphismSequences,
  transformIsomorphismSequences
} from 'src/graphs/transform-isomorphism-sequences';
import { visualizeIsomorphism } from 'src/graphs/visualize-isomorphism';

interface IsomorphismVisualizationPageState {
  graph1Data?: Data;
  graph2Data?: Data;
  isomorphismSequences?: IsomorphismSequences;

  visualizedGraph1Data?: Data;
  visualizedGraph2Data?: Data;
}

export class IsomorphismVisualizationPage extends PureComponent<
  {},
  IsomorphismVisualizationPageState
> {
  public state: IsomorphismVisualizationPageState = {};

  public render() {
    return (
      <div>
        <TextFileUpload accept=".csv" onChange={this.onGraph1FileChange} />
        <TextFileUpload accept=".csv" onChange={this.onGraph2FileChange} />
        <TextFileUpload
          accept=".csv"
          onChange={this.onIsomorphismSequencesFileChange}
        />

        <Button
          color="primary"
          disabled={!this.canVisualize()}
          onClick={this.generateVisualization}
        >
          Visualize
        </Button>

        {this.renderVisualizedGraphs()}
      </div>
    );
  }

  private canVisualize = () => {
    const { graph1Data, graph2Data, isomorphismSequences } = this.state;

    return graph1Data && graph2Data && isomorphismSequences;
  };

  private onGraph1FileChange: TextFileUploadProps['onChange'] = data => {
    this.setState({
      graph1Data: createGraphFromCSV(data)
    });
  };

  private onGraph2FileChange: TextFileUploadProps['onChange'] = data => {
    this.setState({
      graph2Data: createGraphFromCSV(data)
    });
  };

  private onIsomorphismSequencesFileChange: TextFileUploadProps['onChange'] = data => {
    this.setState({
      isomorphismSequences: transformIsomorphismSequences(data)
    });
  };

  private generateVisualization = () => {
    const { graph1Data, graph2Data, isomorphismSequences } = this.state;
    if (!graph1Data || !graph2Data || !isomorphismSequences) {
      return;
    }

    visualizeIsomorphism(graph1Data, graph2Data, isomorphismSequences);

    this.setState({
      visualizedGraph1Data: graph1Data,
      visualizedGraph2Data: graph2Data
    });
  };

  private renderVisualizedGraphs = (): ReactNode => {
    const { visualizedGraph1Data, visualizedGraph2Data } = this.state;

    if (!visualizedGraph1Data || !visualizedGraph2Data) {
      return null;
    }

    return (
      <Grid container={true} xs={12}>
        <Grid item={true} xs={6}>
          <Graph data={visualizedGraph1Data} />
        </Grid>
        <Grid item={true} xs={6}>
          <Graph data={visualizedGraph2Data} />
        </Grid>
      </Grid>
    );
  };
}
