import { Button } from '@material-ui/core';
import React, { PureComponent } from 'react';

export interface SignOutProps {
  firebaseAuth: import('firebase').auth.Auth;
}

export class SignOut extends PureComponent<SignOutProps> {
  public render() {
    return (
      <Button variant="contained" onClick={this.onSignOutClick}>
        Sign out
      </Button>
    );
  }

  private onSignOutClick = () => this.props.firebaseAuth.signOut();
}
