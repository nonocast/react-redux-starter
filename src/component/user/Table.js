import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableFooter,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import { connect } from 'react-redux'
import { loadUsers } from './TableRedux'
import { Link } from 'react-router-dom'
import UserDialog from './Dialog'
import * as dialogActions from './DialogRedux'
import * as tableActions from './TableRedux'

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {  openCreateDialog : false }
    this.prevPage = this.prevPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  componentDidMount() {
    this.props.tableActions.loadUsers();
  }

  prevPage() {
    this.props.tableActions.loadUsers(this.props.table.page.number-1);
  }

  nextPage() {
    this.props.tableActions.loadUsers(this.props.table.page.number+1);
  }

  render() {
    const { items, page } = this.props.table;

    const style = { paddingLeft: 10, paddingRight: 10, marginRight: 10, marginBottom: 15, marginTop: 20 }
    const flatButtonStyle = { minWidth: 36 };

    const header = (
      <TableRow>
        <TableHeaderColumn>Name</TableHeaderColumn>
        <TableHeaderColumn>Email</TableHeaderColumn>
        <TableHeaderColumn>Operation</TableHeaderColumn>
      </TableRow>
    )

    const body = items.map((each) =>
      <TableRow key={each.id}>
        <TableRowColumn><Link to={`/user/${each.id}`}>{each.name}</Link></TableRowColumn>
        <TableRowColumn>{each.email}</TableRowColumn>
        <TableRowColumn>
          <div>
            <a href="#" style={{ marginRight: 10 }}>Edit</a>
            <a href="#">Delete</a>
          </div>
        </TableRowColumn>
      </TableRow>
    )

    const pagination = (
      <TableRow>
        <TableRowColumn colSpan={3} style={{ float: 'right', paddingTop: 10, paddingRight: 30 }}>
          <div>
            <span style={{ marginRight: 15, fontSize: 14, color: '#333' }}>{page.number * page.size + 1}-{page.number * page.size + page.size} of {' '} {page.totalElements}</span>
            <FlatButton style={flatButtonStyle} icon={<NavigationChevronLeft />} onTouchTap={this.prevPage} />
            <FlatButton style={flatButtonStyle} icon={<NavigationChevronRight />} onTouchTap={this.nextPage} />
          </div>
        </TableRowColumn>
      </TableRow>
    );

    return (
      <div>
        <Table>
          <TableHeader>{header}</TableHeader>
          <TableBody>{body}</TableBody>
          <TableFooter>{pagination}</TableFooter>
        </Table>
        <UserDialog {...this.props.dialog} {...this.props.dialogActions} />
      </div>
    );
  }
}

Users.propTypes = {
  data: PropTypes.shape ({ 
    items: PropTypes.array,
    page: PropTypes.shape ({
      size: PropTypes.number,
      totalElements: PropTypes.number,
      totalPages: PropTypes.number,
      number: PropTypes.number,

    })
  })
};

Users.defaultProps = {
  table: {
    items: [],
    page: { size: 10, totalElements: 0, totalPages: 0, number: 0 }
  }
};

const mapStateToProps = state => {
  return {
    table: state.users.table,
    dialog: state.users.dialog
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    tableActions: bindActionCreators(tableActions, dispatch),
    dialogActions: bindActionCreators(dialogActions, dispatch)
  }
}

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Users)

export default Container;