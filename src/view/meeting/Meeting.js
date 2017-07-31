import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { loadMeeting } from './Redux'


class Meeting extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.loadMeeting(id);
  }

  render() {
    console.log(this.props.current);
    const current = this.props.current;

    return (
      <div>
        <h1>{current.title}</h1>
      </div>
    );
  }
}

Meeting.propTypes = {
  current: PropTypes.object
};

Meeting.defaultProps = {
  current: {}
};

const mapStateToProps = state => {
  return {
    current: state.meetings.current
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadMeeting: (id) => dispatch(loadMeeting(id))
  }
}

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Meeting)

export default Container;