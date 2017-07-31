import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UserTable from '../component/user/Table';
import UserDialog from '../component/user/Modal';
import { tableActions, dialogActions } from './UserRedux';
import FlatButton from 'material-ui/FlatButton'

class UserPage extends Component {
  render() {
    return (
      <div>
        <FlatButton style={style} backgroundColor="#eee" onTouchTap={this.props.dialogActions.openDialog}>New User</FlatButton>
        <UserTable {...this.props.table} {...this.props.tableActions} />
        <UserDialog {...this.props.dialog} {...this.props.dialogActions} />
      </div>
    );
  }
}

export default result = connect(
  state => ({
    table: state.users.table,
    dialog: state.users.dialog,
  }),
  dispatch => ({
    tableActions: bindActionCreators(tableActions, dispatch),
    dialogActions: bindActionCreators(dialogActions, dispatch)
  })
)(UserPage);