import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { increment } from './counter';

class App extends Component {
  refetch = () => {
    console.log('refetch');
    this.props.data.refetch({
      offset: 2,
    });
  }

  render() {
    const { data, count } = this.props;
    const { loading, currentTime } = data;
    return (
      <main>
        <header>
          <h1>Refetch Ignored</h1>
          <p>Conditions required for this bug</p>
          <ul>
            <li>Refetch is called with different variables</li>
            <li>Other props on the componnet get updated before the refetch finishes</li>
          </ul>
          <p>To reproduce</p>
          <ul>
            <li>Once loaded, click the refetch button</li>
            <li>Before the load finishes, click the increment button</li>
          </ul>
        </header>
        <p>Count: {count}<br/>
          <button onClick={this.props.increment}>Increment</button>
        </p>
        {loading ? (
          <p>Loading…</p>
        ) : (
          <p>
            { currentTime }<br />
            <button onClick={this.refetch}>Refetch</button>
          </p>
        )}
      </main>
    );
  }
}

const AppWithData = graphql(
  gql`query currentTime($offset: Int) {
    currentTime(offset: $offset)
  }`, {
    options(ownProps) {
      return {
        variables: {
          offset: 1,
        },
      };
    },
  }
)(App);

function mapStateToProps(state) {
  return {
    count: state.counter,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    increment,
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(AppWithData);
