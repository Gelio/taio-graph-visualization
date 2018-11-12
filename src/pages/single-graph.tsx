import {
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  Typography
} from '@material-ui/core';
import { CheckboxProps } from '@material-ui/core/Checkbox';
import { StyleRules, withStyles } from '@material-ui/core/styles';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import React, { PureComponent } from 'react';
import { Data, Options } from 'vis';

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
  options: Options;
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
  public state: SingleGraphPageState = {
    options: { physics: true }
  };

  public render() {
    const { classes } = this.props;
    const { options } = this.state;

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

            <hr />

            <FormControlLabel
              control={
                <Checkbox
                  checked={options.physics}
                  onChange={this.onPhysicsCheckboxChange}
                  color="primary"
                  value="physics"
                />
              }
              label="Enable physics"
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
    const { graphData, options } = this.state;

    if (!graphData) {
      return;
    }

    return (
      <Grid container={true} justify="center">
        <Grid item={true} xs={11}>
          <Paper>
            <Graph data={graphData} options={options} />
          </Paper>
        </Grid>
      </Grid>
    );
  };

  private onPhysicsCheckboxChange: CheckboxProps['onChange'] = event => {
    const { checked } = event.target;

    this.setState(state => ({
      options: {
        ...state.options,
        physics: checked
      }
    }));
  };
}

export default withStyles(styles)(SingleGraphPage);
