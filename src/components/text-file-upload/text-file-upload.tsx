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
  onChange?(result: string): any;
}

export class TextFileUpload extends PureComponent<TextFileUploadProps> {
  public render() {
    return (
      <input type="file" accept={this.props.accept} onChange={this.onChange} />
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
