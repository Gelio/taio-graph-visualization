import { Grid, Paper } from '@material-ui/core';
import { StyleRules, withStyles } from '@material-ui/core/styles';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import React, { StatelessComponent } from 'react';

const styles: StyleRules = {
  paper: {
    padding: 10
  }
};

interface PageInfoProps {
  classes: ClassNameMap;
}

const PageInfo: StatelessComponent<PageInfoProps> = ({ children, classes }) => (
  <Grid container={true}>
    <Grid item={true} xs={12}>
      <Grid container={true} justify="center" spacing={8}>
        <Grid item={true} xs={12} md={6}>
          <Paper className={classes.paper}>{children}</Paper>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

const EnhancedPageInfo = withStyles(styles)(PageInfo);

export { EnhancedPageInfo as PageInfo };
