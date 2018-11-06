import {
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  TextField,
  Typography
} from '@material-ui/core';
import { InputProps } from '@material-ui/core/Input';
import React, { PureComponent } from 'react';

import { AlgorithmCriterium } from 'src/graphs/algorithm-criterium';
import {
  csvToMatrix,
  isGraphValid,
  isIsomorphismSequenceValid,
  Matrix
} from 'src/graphs/common';
import { GraphExampleEntry } from 'src/graphs/graph-example-entry';
import { StatusIcon } from '../status-icon';
import { TextFileUpload, TextFileUploadProps } from '../text-file-upload';

export interface GraphExampleUploadProps {
  onSubmit?(entry: GraphExampleEntry): any;
}

interface GraphExampleUploadState {
  entry: GraphExampleEntry;
  graph1?: Matrix;
  graph2?: Matrix;
}

function isUndefinedOrValidNumber(value: string | undefined) {
  if (!value) {
    return true;
  }

  return !Number.isNaN(Number(value)) && parseInt(value, 10) > 0;
}

export class GraphExampleUpload extends PureComponent<
  GraphExampleUploadProps,
  GraphExampleUploadState
> {
  public state: GraphExampleUploadState = {
    entry: {
      comment: '',
      criterium: AlgorithmCriterium.VerticesCount,
      graph1Csv: '',
      graph2Csv: '',
      approximateResultTime: '',
      exactResultTime: '',
      name: ''
    }
  };

  public render() {
    const { entry } = this.state;

    const hasNameError = !entry.name;
    const hasGraphsError = !entry.graph1Csv || !entry.graph2Csv;
    const hasTimeResultErrors =
      !isUndefinedOrValidNumber(entry.approximateResultTime) ||
      !isUndefinedOrValidNumber(entry.exactResultTime);
    const isSubmitDisabled =
      hasNameError || hasGraphsError || hasTimeResultErrors;

    return (
      <>
        <div>
          <Typography variant="body1" gutterBottom={true}>
            Providing the results is optional.
          </Typography>

          <div>
            <FormControl>
              <InputLabel htmlFor="input-name">Name</InputLabel>
              <Input
                error={!entry.name}
                onChange={this.onFormInputChange('name')}
                id="input-name"
                value={entry.name}
              />
            </FormControl>
          </div>
          <div>
            <TextFileUpload
              accept=".csv"
              label="Graph 1 CSV"
              onChange={this.onGraphChange('graph1Csv', 'graph1')}
            />

            <StatusIcon success={!!entry.graph1Csv} />
          </div>
          <div>
            <TextFileUpload
              accept=".csv"
              label="Graph 2 CSV"
              onChange={this.onGraphChange('graph2Csv', 'graph2')}
            />
            <StatusIcon success={!!entry.graph2Csv} />
          </div>

          <div>
            <TextField
              select={true}
              onChange={this.onFormInputChange('criterium')}
              value={entry.criterium}
              label="Algorithm criterium"
              style={{ width: 300, marginTop: 8, marginBottom: 8 }}
            >
              <MenuItem value={AlgorithmCriterium.VerticesCount}>
                Vertices count
              </MenuItem>
              <MenuItem value={AlgorithmCriterium.SumVerticesAndEdges}>
                Sum vertices count and edges count
              </MenuItem>
            </TextField>
          </div>

          <div>
            <TextField
              label="Comment"
              multiline={true}
              rows={6}
              fullWidth={true}
              value={entry.comment}
              onChange={this.onFormInputChange('comment')}
              margin="normal"
            />
          </div>

          <div>
            <FormControl style={{ width: 300 }}>
              <InputLabel htmlFor="input-exact-result-time">
                Exact result time (ms)
              </InputLabel>
              <Input
                error={!isUndefinedOrValidNumber(entry.exactResultTime)}
                onChange={this.onFormInputChange('exactResultTime')}
                id="input-exact-result-time"
                value={entry.exactResultTime}
              />
            </FormControl>

            <TextFileUpload
              accept=".csv"
              label="Exact result (CSV mapping)"
              onChange={this.onIsomorphismMappingChange('exactResultCsv')}
            />
            <StatusIcon success={!!entry.exactResultCsv} />
          </div>

          <div>
            <FormControl style={{ width: 300 }}>
              <InputLabel htmlFor="input-approximate-result-time">
                Approximate result time (ms)
              </InputLabel>
              <Input
                error={!isUndefinedOrValidNumber(entry.approximateResultTime)}
                onChange={this.onFormInputChange('approximateResultTime')}
                id="input-approximate-result-time"
                value={entry.approximateResultTime}
              />
            </FormControl>

            <TextFileUpload
              accept=".csv"
              label="Approximate result (CSV mapping)"
              onChange={this.onIsomorphismMappingChange('approximateResultCsv')}
            />
            <StatusIcon success={!!entry.approximateResultCsv} />
          </div>

          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={this.onSubmit}
              disabled={isSubmitDisabled}
            >
              Submit
            </Button>
          </div>
        </div>
      </>
    );
  }

  private onFormInputChange = (
    fieldName: keyof GraphExampleEntry
  ): InputProps['onChange'] => event => {
    const value = event.target.value;

    this.setState(state => ({
      entry: {
        ...state.entry,
        [fieldName]: value
      }
    }));
  };

  private onGraphChange = (
    fieldName: keyof GraphExampleEntry,
    graphName: keyof GraphExampleUploadState
  ): TextFileUploadProps['onChange'] => result => {
    const graph = csvToMatrix(result);
    if (!isGraphValid(graph)) {
      alert('Invalid graph data format');

      return;
    }

    this.setState(state => ({
      entry: {
        ...state.entry,
        approximateResultCsv: '',
        exactResultCsv: '',
        [fieldName]: result
      },
      [graphName]: graph
    }));
  };

  private onIsomorphismMappingChange = (
    solutionType: keyof Pick<
      GraphExampleEntry,
      'approximateResultCsv' | 'exactResultCsv'
    >
  ): TextFileUploadProps['onChange'] => result => {
    const { graph1, graph2 } = this.state;

    if (!graph1 || !graph2) {
      alert('Please upload the graphs first');

      return;
    }

    const isomorphismSequence = csvToMatrix(result);

    if (!isIsomorphismSequenceValid(graph1, graph2, isomorphismSequence)) {
      alert('The isomorphism sequence does not match with the graphs provided');

      return;
    }

    this.setState(state => ({
      entry: {
        ...state.entry,
        [solutionType]: result
      }
    }));
  };

  private onSubmit = () => {
    const { onSubmit } = this.props;

    if (onSubmit) {
      onSubmit(this.state.entry);
    }

    this.setState({
      graph1: undefined,
      graph2: undefined,
      entry: {
        comment: '',
        criterium: AlgorithmCriterium.VerticesCount,
        graph1Csv: '',
        graph2Csv: '',
        approximateResultTime: '',
        exactResultTime: '',
        name: ''
      }
    });
  };
}
