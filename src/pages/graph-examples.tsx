import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography
} from '@material-ui/core';
import withStyles, {
  ClassNameMap,
  StyleRules
} from '@material-ui/core/styles/withStyles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import firebase from 'firebase';
import React, { StatelessComponent } from 'react';

import {
  SignOut,
  WithAuthAdditionalProps,
  withAuthFirebase
} from 'src/components/auth';
import { SignIn, UserInfo } from 'src/components/auth';
import { GraphExampleTable } from 'src/components/graph-example-table';
import { GraphExampleUpload } from 'src/components/graph-example-upload';
import { PageInfo } from 'src/components/page-info';
import { GraphExampleEntry } from 'src/graphs/graph-example-entry';

interface GraphExamplesPageProps {
  classes: ClassNameMap;
}

const styles: StyleRules = {
  controls: {
    marginTop: 10,
    marginBottom: 10
  }
};

const getGraphsRef = () => firebase.database().ref('graphs');

function uploadGraphExample(graphExample: GraphExampleEntry) {
  getGraphsRef().push(graphExample);
}

const GraphExamplesPageContent: StatelessComponent<WithAuthAdditionalProps> = ({
  isSignedIn,
  user
}) => {
  if (!isSignedIn || !user) {
    return (
      <>
        <Typography variant="body1">
          Sign in to view examples and add your own.
        </Typography>
        <SignIn />
      </>
    );
  }

  return (
    <>
      <UserInfo user={user} />
      <SignOut firebaseAuth={firebase.auth()} />

      <ExpansionPanel style={{ marginTop: 10 }}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Graph example upload form</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <GraphExampleUpload onSubmit={uploadGraphExample} />
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <hr />

      <GraphExampleTable graphsRef={getGraphsRef()} />
    </>
  );
};

const EnhancedGraphExamplesPageContent = withAuthFirebase(
  GraphExamplesPageContent
);

const GraphExamplesPage: StatelessComponent<GraphExamplesPageProps> = ({
  classes
}) => {
  return (
    <div className={classes.controls}>
      <PageInfo>
        <Typography variant="h6" gutterBottom={true}>
          Graph examples sharing
        </Typography>
        <EnhancedGraphExamplesPageContent />
      </PageInfo>
    </div>
  );
};

export default withStyles(styles)(GraphExamplesPage);
