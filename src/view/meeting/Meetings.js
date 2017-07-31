import React, { Component } from 'react'
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
import { loadMeetings } from './Redux'
import { Link } from 'react-router-dom'

class Meetings extends Component {
  constructor(props) {
    super(props);
    this.prevPage = this.prevPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  componentDidMount() {
    this.props.loadMeetings();
  }

  prevPage() {
    this.props.loadMeetings(this.props.data.page.number-1);
  }

  nextPage() {
    this.props.loadMeetings(this.props.data.page.number+1);
  }

  render() {
    const { items, page } = this.props.data;

    const style = { paddingLeft: 10, paddingRight: 10, marginRight: 10, marginBottom: 15, marginTop: 20 }
    const flatButtonStyle = { minWidth: 36 };

    const header = (
      <TableRow>
        <TableHeaderColumn>Title</TableHeaderColumn>
        <TableHeaderColumn>Chairman</TableHeaderColumn>
        <TableHeaderColumn>Date</TableHeaderColumn>
        <TableHeaderColumn>Operation</TableHeaderColumn>
      </TableRow>
    )

    const body = items.map((each) =>
      <TableRow key={each.id}>
        <TableRowColumn><Link to={`/meeting/${each.id}`}>{each.title}</Link></TableRowColumn>
        <TableRowColumn>{each.chairman}</TableRowColumn>
        <TableRowColumn>{each.openedAt}</TableRowColumn>
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
        <FlatButton style={style} backgroundColor="#eee">New Meeting</FlatButton>
        <Table>
          <TableHeader>{header}</TableHeader>
          <TableBody>{body}</TableBody>
          <TableFooter>{pagination}</TableFooter>
        </Table>
      </div>
    );
  }
}

Meetings.propTypes = {
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

Meetings.defaultProps = {
  data: {
    items: [],
    page: { size: 10, totalElements: 0, totalPages: 0, number: 0 }
  }
};

const mapStateToProps = state => {
  return {
    data: state.meetings
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadMeetings: (page = 0) => dispatch(loadMeetings(page))
  }
}

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Meetings)

export default Container;