import React from 'react';
import Alert from '../components/atoms/Alert';

const ErrorContext = React.createContext();

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
    this.setError = this.setError.bind(this);
  }

  setError = (error) => {
    this.setState({ error });
  };

  render() {
    return (
      <ErrorContext.Provider value={[this.state.error, this.setError]}>
        {this.state.error ? (
          <Alert
            type="danger"
            iconClass="information"
            message={this.state.error && this.state.error.toString()}
          />
        ) : null}
        {this.props.children}
      </ErrorContext.Provider>
    );
  }
}

export { ErrorContext, ErrorBoundary };
