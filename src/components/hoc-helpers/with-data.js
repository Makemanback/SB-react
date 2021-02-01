import React, {Component} from 'react';

import ErrorIndicator from '../error-indicator';
import Spinner from '../spinner';

const withData = (View) => {
  return class extends Component {

    state = {
      data: null,
      loading: true,
      error: false
    }

    componentDidMount() {
      this.updateComponent()
    }

    componentDidUpdate(prevProps) {
      if (this.props.getData !== prevProps.getData) {
        this.updateComponent()
      }
    }

    updateComponent() {
      this.setState({
        loading: true,
        error: false
      })

      this.props.getData()
      .then((data) => {
        this.setState({
          data,
          loading: false
        });
      })
      .catch(() => {
        this.setState({
          error: true,
          loading: false
        })
      });
    }

    render() {
      const {data, loading, error} = this.state;

      const hasData = !(loading || error);
      const spinner = loading ? <Spinner /> : null;
      const content = hasData ? <View {...this.props} data={data} />: null;
      const failedContent = error ? <ErrorIndicator /> : null;

      return (
        <React.Fragment>
          {spinner}
          {content}
          {failedContent}
        </React.Fragment>
      )
    }
  };
}

export default withData;
