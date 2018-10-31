import { CssBaseline, Grid, Tab, Tabs, Typography } from '@material-ui/core';
import { TabsProps } from '@material-ui/core/Tabs';
import React, { Component } from 'react';

import { IsomorphismVisualizationPage } from './pages/isomorphism-visualization';
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
            <Tabs value={pageIndex} onChange={this.onTabChange} centered={true}>
              <Tab label="Graph visualization" />
              <Tab label="Isomorphism visualization" />
            </Tabs>

            {pageIndex === 0 && <SingleGraphPage />}
            {pageIndex === 1 && <IsomorphismVisualizationPage />}
          </Grid>
        </Grid>
      </>
    );
  }

  private onTabChange: TabsProps['onChange'] = (_, pageIndex: number) => {
    this.setState({
      pageIndex
    });
  };
}