import { Typography } from '@material-ui/core';
import React, { StatelessComponent } from 'react';

export interface UserInfoProps {
  user: import('firebase').User;
}

export const UserInfo: StatelessComponent<UserInfoProps> = ({ user }) => (
  <Typography variant="body1">
    You are signed in as {user.displayName}
  </Typography>
);
