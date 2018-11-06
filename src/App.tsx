import { CssBaseline, Grid, Tab, Tabs, Typography } from '@material-ui/core';
import { TabsProps } from '@material-ui/core/Tabs';
import React, { Component } from 'react';

import GraphExamplesPage from './pages/graph-examples';
import InfoPage from './pages/info';
import IsomorphismVisualizationPage from './pages/isomorphism-visualization';
import SingleGraphPage from './pages/single-graph';

interface AppState {
  pageIndex: number;
}

export class App extends Component<{}, AppState> {
  public state: AppState = {
    pageIndex: 0
  };

  public render() {
    const { pageIndex } = this.state;

    return (
      <>
        <CssBaseline />
        <Grid container={true}>
          <Grid item={true} xs={12}>
            <Typography variant="h1" gutterBottom={true} align="center">
              TAiO graph visualizer
            </Typography>
          </Grid>

          <Grid item={true} xs={12}>
            {this.renderTabs()}

            {pageIndex === 0 && <InfoPage />}
            {pageIndex === 1 && <SingleGraphPage />}
            {pageIndex === 2 && <IsomorphismVisualizationPage />}
            {pageIndex === 3 && <GraphExamplesPage />}
          </Grid>
        </Grid>
      </>
    );
  }

  private renderTabs = () => {
    return (
      <Grid container={true} justify="center">
        <Grid item={true}>
          <Tabs
            value={this.state.pageIndex}
            onChange={this.onTabChange}
            scrollable={true}
            scrollButtons="off"
          >
            <Tab label="Information" />
            <Tab label="Graph visualization" />
            <Tab label="Isomorphism visualization" />
            <Tab label="Example sharing" />
          </Tabs>
        </Grid>
      </Grid>
    );
  };

  private onTabChange: TabsProps['onChange'] = (_, pageIndex: number) => {
    this.setState({
      pageIndex
    });
  };
}
