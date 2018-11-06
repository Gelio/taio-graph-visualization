import { Button } from '@material-ui/core';
import { ButtonProps } from '@material-ui/core/Button';
import FileSaver from 'file-saver';
import React, { PureComponent } from 'react';

export interface DownloadButtonProps {
  label: string;
  value: string;
  fileName: string;
}

export class DownloadButton extends PureComponent<DownloadButtonProps> {
  public render() {
    const { label } = this.props;

    return (
      <Button
        variant="contained"
        color="secondary"
        onClick={this.onButtonClick}
      >
        {label}
      </Button>
    );
  }

  private onButtonClick: ButtonProps['onClick'] = event => {
    const { value, fileName } = this.props;

    const blob = new Blob([value], {
      type: 'text/csv;charset=utf-8'
    });

    FileSaver.saveAs(blob, fileName);
    event.stopPropagation();
  };
}
