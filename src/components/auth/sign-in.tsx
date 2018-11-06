import firebase from 'firebase';
import React, { StatelessComponent } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const signInConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false
  }
};

export const SignIn: StatelessComponent = () => (
  <StyledFirebaseAuth uiConfig={signInConfig} firebaseAuth={firebase.auth()} />
);
