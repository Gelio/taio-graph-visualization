import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import React, { StatelessComponent } from 'react';

export const StatusIcon: StatelessComponent<{ success: boolean }> = ({
  success
}) => (success ? <CheckCircleIcon /> : <ReportProblemIcon />);
