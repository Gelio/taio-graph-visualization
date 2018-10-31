import { Grid, Paper, Typography } from '@material-ui/core';
import { StyleRules, withStyles } from '@material-ui/core/styles';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import React, { PureComponent } from 'react';
import { Data } from 'vis';

import { Graph } from 'src/components/graph';
import {
  TextFileUpload,
  TextFileUploadProps
} from 'src/components/text-file-upload';
import { createGraphFromCSV } from 'src/graphs/graph-factory';

import { PageInfo } from 'src/components/page-info';

interface SingleGraphPageProps {
  classes: ClassNameMap;
}

interface SingleGraphPageState {
  graphData?: Data;
}

const styles: StyleRules = {
  controls: {
    marginTop: 10,
    marginBottom: 10
  }
};

class SingleGraphPage extends PureComponent<
  SingleGraphPageProps,
  SingleGraphPageState
> {
  public state: SingleGraphPageState = {};

  public render() {
    const { classes } = this.props;

    return (
      <>
        <div className={classes.controls}>
          <PageInfo>
            <Typography variant="body1">
              Select a CSV that describes a graph and visualize it.
            </Typography>
            <TextFileUpload
              accept=".csv"
              onChange={this.onFileUpload}
              label="Upload CSV"
            />
          </PageInfo>
        </div>
        {this.renderGraph()}
      </>
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

    return (
      <Grid container={true} justify="center">
        <Grid item={true} xs={11}>
          <Paper>
            <Graph data={graphData} options={{}} />
          </Paper>
        </Grid>
      </Grid>
    );
  };
}

export default withStyles(styles)(SingleGraphPage);
