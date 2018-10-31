import { StyleRules, withStyles } from '@material-ui/core/styles';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import React, { createRef, PureComponent } from 'react';
import { Data, Network, Options } from 'vis';

export interface GraphProps {
  data: Data;
  options?: Options;
  classes: ClassNameMap;
}

const styles: StyleRules = {
  graph: {
    height: '600px'
  }
};

class Graph extends PureComponent<GraphProps> {
  public static defaultProps: Partial<GraphProps> = {
    options: {}
  };

  private containerRef = createRef<HTMLDivElement>();
  private network: Network;

  public componentDidMount() {
    const { data, options } = this.props;
    if (!this.containerRef.current) {
      // tslint:disable-next-line:no-console
      console.error(
        'Cannot create the network. The container component cannot be accessed'
      );

      return;
    }

    this.network = new Network(this.containerRef.current, data, options);
  }

  public componentDidUpdate(prevProps: GraphProps) {
    const { data, options } = this.props;
    if (data !== prevProps.data) {
      this.network.setData(data);
    }

    if (options && options !== prevProps.options) {
      this.network.setOptions(options);
    }
  }

  public render() {
    return <div ref={this.containerRef} className={this.props.classes.graph} />;
  }
}

const EnhancedGraph = withStyles(styles)(Graph);

export { EnhancedGraph as Graph };
