import { Typography } from '@material-ui/core';
import withStyles, {
  ClassNameMap,
  StyleRules
} from '@material-ui/core/styles/withStyles';
import firebase from 'firebase';
import React, { StatelessComponent } from 'react';

import {
  SignOut,
  WithAuthAdditionalProps,
  withAuthFirebase
} from 'src/components/auth';
import { SignIn, UserInfo } from 'src/components/auth';
import { PageInfo } from 'src/components/page-info';

interface GraphExamplesPageProps {
  classes: ClassNameMap;
}

const styles: StyleRules = {
  controls: {
    marginTop: 10,
    marginBottom: 10
  }
};

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
