import { Button, Grid, Typography, withStyles } from '@material-ui/core';
import { StyleRules } from '@material-ui/core/styles';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import React, { PureComponent, ReactNode, StatelessComponent } from 'react';
import { Data } from 'vis';

import { Graph } from 'src/components/graph';
import { PageInfo } from 'src/components/page-info';
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

interface IsomorphismVisualizationPageProps {
  classes: ClassNameMap;
}

interface IsomorphismVisualizationPageState {
  graph1Data?: Data;
  graph2Data?: Data;
  isomorphismSequences?: IsomorphismSequences;

  visualizedGraph1Data?: Data;
  visualizedGraph2Data?: Data;
}

const styles: StyleRules = {
  controls: {
    marginTop: 10,
    marginBottom: 10
  }
};

class IsomorphismVisualizationPage extends PureComponent<
  IsomorphismVisualizationPageProps,
  IsomorphismVisualizationPageState
> {
  public state: IsomorphismVisualizationPageState = {};

  public render() {
    const { classes } = this.props;
    const { graph1Data, graph2Data, isomorphismSequences } = this.state;

    return (
      <div>
        <div className={classes.controls}>
          <PageInfo>
            <Typography variant="body1">
              Select CSV files that describe both graphs and then provide an
              isomorphism mapping.
            </Typography>

            <Grid container={true} alignItems="center">
              <TextFileUpload
                accept=".csv"
                onChange={this.onGraph1FileChange}
                label="Upload graph 1"
              />

              <StatusIcon success={!!graph1Data} />
            </Grid>
            <Grid container={true} alignItems="center">
              <TextFileUpload
                accept=".csv"
                onChange={this.onGraph2FileChange}
                label="Upload graph 2"
              />
              <StatusIcon success={!!graph2Data} />
            </Grid>
            <Grid container={true} alignItems="center">
              <TextFileUpload
                accept=".csv"
                onChange={this.onIsomorphismSequencesFileChange}
                label="Upload mapping"
              />
              <StatusIcon success={!!isomorphismSequences} />
            </Grid>

            <Button
              color="primary"
              disabled={!this.canVisualize()}
              onClick={this.generateVisualization}
            >
              Visualize
            </Button>
          </PageInfo>
        </div>
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
      graph1Data: undefined,
      graph2Data: undefined,
      isomorphismSequences: undefined,
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

const StatusIcon: StatelessComponent<{ success: boolean }> = ({ success }) =>
  success ? <CheckCircleIcon /> : <ReportProblemIcon />;

export default withStyles(styles)(IsomorphismVisualizationPage);
