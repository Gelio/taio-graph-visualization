import { Button } from '@material-ui/core';
import withStyles, {
  ClassNameMap,
  StyleRules
} from '@material-ui/core/styles/withStyles';
import React, { ChangeEventHandler, PureComponent } from 'react';

function readFileToString(file: File) {
  return new Promise<string>((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onloadend = () => resolve(fileReader.result as string);
    fileReader.onerror = reject;
    fileReader.readAsText(file);
  });
}

export interface TextFileUploadProps {
  accept?: string;
  label: string;
  classes: ClassNameMap;
  onChange?(result: string): any;
}

interface TextFileUploadState {
  inputId: string;
}

const styles: StyleRules = {
  input: {
    display: 'none'
  }
};

let lastId = 0;

function generateUniqueId() {
  return `file-input-${lastId++}`;
}

class TextFileUpload extends PureComponent<
  TextFileUploadProps,
  TextFileUploadState
> {
  public state: TextFileUploadState = {
    inputId: generateUniqueId()
  };

  public render() {
    const { classes, accept, label } = this.props;
    const { inputId } = this.state;

    return (
      <>
        <input
          type="file"
          id={inputId}
          className={classes.input}
          accept={accept}
          onChange={this.onChange}
        />
        <label htmlFor={inputId}>
          <Button component="span" variant="contained">
            {label}
          </Button>
        </label>
      </>
    );
  }

  private onChange: ChangeEventHandler<HTMLInputElement> = async event => {
    const { files } = event.target;

    if (!files) {
      return;
    }

    const { onChange } = this.props;
    if (!onChange) {
      return;
    }

    const file = files[0];
    const result = await readFileToString(file);
    onChange(result);
  };
}

const EnhancedTextFileUpload = withStyles(styles)(TextFileUpload);

export { EnhancedTextFileUpload as TextFileUpload };
