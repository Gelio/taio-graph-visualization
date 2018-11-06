import { Omit } from '@material-ui/core';
import firebase from 'firebase';
import React, { ComponentType, PureComponent } from 'react';

type FirebaseAuth = import('firebase').auth.Auth;
type FirebaseUser = import('firebase').User;

export interface WithAuthAdditionalProps {
  user: FirebaseUser | null;
  isSignedIn: boolean;
}

interface AuthGuardState {
  user: FirebaseUser | null;
}

export const withAuth = (getAuth: () => FirebaseAuth) => <
  Props extends Partial<WithAuthAdditionalProps>
>(
  WrappedComponent: ComponentType<Props>
) => {
  type WithAuthProps = Omit<Props, 'user' | 'isSignedIn'>;

  class WithAuth extends PureComponent<WithAuthProps, AuthGuardState> {
    public state: AuthGuardState = {
      user: null
    };

    private unregisterAuthObserver: import('firebase').Unsubscribe;

    public componentDidMount() {
      const firebaseAuth = getAuth();
      this.unregisterAuthObserver = firebaseAuth.onAuthStateChanged(user =>
        this.setState({ user })
      );
    }

    public componentWillUnmount() {
      this.unregisterAuthObserver();
    }

    public render() {
      const { user } = this.state;

      return (
        <WrappedComponent {...this.props} user={user} isSignedIn={!!user} />
      );
    }
  }

  return WithAuth;
};

export const withAuthFirebase = withAuth(() => firebase.auth());
