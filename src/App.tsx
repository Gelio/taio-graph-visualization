import { Tab, Tabs } from '@material-ui/core';
import { TabsProps } from '@material-ui/core/Tabs';
import React, { Component } from 'react';
import './App.css';

import { IsomorphismVisualizationPage } from './pages/isomorphism-visualization';
import { SingleGraphPage } from './pages/single-graph';

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
      <div className="App">
        <h1>TAiO graph visualizer</h1>

        <Tabs value={pageIndex} onChange={this.onTabChange}>
          <Tab label="Graph visualization" />
          <Tab label="Isomorphism visualization" />
        </Tabs>

        {pageIndex === 0 && <SingleGraphPage />}
        {pageIndex === 1 && <IsomorphismVisualizationPage />}
      </div>
    );
  }

  private onTabChange: TabsProps['onChange'] = (_, pageIndex: number) => {
    this.setState({
      pageIndex
    });
  };
}
