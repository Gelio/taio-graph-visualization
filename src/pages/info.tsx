import { Typography } from '@material-ui/core';
import { StyleRules } from '@material-ui/core/styles';
import withStyles, { ClassNameMap } from '@material-ui/core/styles/withStyles';
import React, { StatelessComponent } from 'react';
import GitHubButton from 'react-github-button';

import { Graph } from 'src/components/graph';
import { PageInfo } from 'src/components/page-info';
import { createGraphFromCSV } from 'src/graphs/graph-factory';

interface InfoPageProps {
  classes: ClassNameMap;
}

const styles: StyleRules = {
  controls: {
    marginTop: 10,
    marginBottom: 10
  }
};

// prettier-ignore
const graphCsv = `0,1,0,0,1
1,0,1,0,0
0,1,0,1,0
0,0,1,0,1
1,0,0,1,0`;

// prettier-ignore
const isomorphismCsv = `
0,1,5
1,8,4
`

const graph = createGraphFromCSV(graphCsv);

const InfoPage: StatelessComponent<InfoPageProps> = ({ classes }) => (
  <div className={classes.controls}>
    <PageInfo>
      <GitHubButton
        type="stargazers"
        namespace="Gelio"
        repo="taio-graph-visualization"
      />
      <br />
      <br />

      <Typography variant="h4" gutterBottom={true}>
        General
      </Typography>

      <Typography variant="body1" gutterBottom={true}>
        This web app allows to visualize an undirected graph provided as an
        adjacency matrix and visualize an isomorphic subgraph of 2 undirected
        graphs.
      </Typography>

      <Typography variant="h4" gutterBottom={true}>
        Data format
      </Typography>

      <Typography variant="h5" gutterBottom={true}>
        Graph data format
      </Typography>

      <Typography variant="body1" gutterBottom={true}>
        A graph is described by an adjacency matrix in a CSV file. Each line
        contains zeros (0) or ones (1) delimited by a single comma (,). Lines
        are ended by the standard CSV line ending sequence: CRLF (\r\n).
      </Typography>
      <Typography variant="body1" gutterBottom={true}>
        The matrix should be square (the number of columns and rows should be
        the same).
      </Typography>
      <Typography variant="body1" gutterBottom={true}>
        0 in the adjacency table on row i and column j means that there is no
        edge between vertex i and vertex j.
      </Typography>
      <Typography variant="body1" gutterBottom={true}>
        1 in the same place means that there is an edge connecting vertices i
        and j.
      </Typography>

      <Typography variant="h6" gutterBottom={true}>
        Example
      </Typography>
      <Typography variant="body1">CSV:</Typography>
      <div>
        <pre>{graphCsv}</pre>
      </div>
      <Graph data={graph} height="400px" />

      <Typography variant="h5" gutterBottom={true}>
        Isomorphism sequence data format
      </Typography>

      <Typography variant="body1" gutterBottom={true}>
        An isomorphism sequence is a CSV file with 2 lines with equal number of
        items (vertex ids).
      </Typography>
      <Typography variant="body1" gutterBottom={true}>
        Vertices from the first row describe a connected subgraph of the first
        graph. Vertices from the second row describe a connected subgraph of the
        second graph. The subgraphs induced by those vertices should be
        isomorphic.
      </Typography>
      <Typography variant="body1" gutterBottom={true}>
        i-th vertex from the first line is isomorphic with the i-th vertex from
        the second line.
      </Typography>

      <Typography variant="h6">Example</Typography>
      <Typography variant="body1">CSV:</Typography>
      <div>
        <pre>{isomorphismCsv}</pre>
      </div>
      <Typography variant="body1" gutterBottom={true}>
        Describes two induced subgraphs that are isomorphic. The first subgraph
        is induced by vertices 0, 1, 5 from the first graph. The second subgraph
        is induced by vertices 1, 8, 4.
      </Typography>

      <Typography variant="body1" gutterBottom={true}>
        Vertex 0 from the first graph is isomorphic with vertex 1 from the
        second graph.
      </Typography>
      <Typography variant="body1" gutterBottom={true}>
        Vertex 1 from the first graph is isomorphic with vertex 8 from the
        second graph.
      </Typography>
      <Typography variant="body1" gutterBottom={true}>
        Vertex 5 from the first graph is isomorphic with vertex 4 from the
        second graph.
      </Typography>

      <Typography variant="h5" gutterBottom={true}>
        Vertex ids numeration
      </Typography>
      <Typography variant="body1" gutterBottom={true}>
        We assume vertex ids start with 0.
      </Typography>

      <Typography variant="h6" gutterBottom={true}>
        Example
      </Typography>
      <Typography variant="body1" gutterBottom={true}>
        The vertex ids in a graph containing 3 vertices would be: 0, 1, 2.
      </Typography>

      <Typography variant="h5" gutterBottom={true}>
        Permission of use
      </Typography>
      <Typography variant="body1" gutterBottom={true}>
        Permission is granted to use this application to visualize data in your
        projects and reports.
      </Typography>

      <Typography variant="h5" gutterBottom={true}>
        Author
      </Typography>
      <Typography variant="body1" gutterBottom={true}>
        This application was created by Grzegorz Rozdzialik.
      </Typography>
    </PageInfo>
  </div>
);

export default withStyles(styles)(InfoPage);
