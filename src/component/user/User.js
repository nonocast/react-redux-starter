import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { loadUser } from './TableRedux'


class User extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.loadUser(id);
  }

  render() {
    const current = this.props.current;

    return (
      <div>
        <h1>{current.name}</h1>
        <p>{current.email}</p>
      </div>
    );
  }
}

User.propTypes = {
  current: PropTypes.object
};

User.defaultProps = {
  current: {}
};

const mapStateToProps = state => {
  return {
    current: state.users.current
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadUser: (id) => dispatch(loadUser(id))
  }
}

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(User)

export default Container;