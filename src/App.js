import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Sidebar from './view/sidebar/Sidebar'
import Meetings from './view/meeting/Meetings'
import Meeting from './view/meeting/Meeting'
import UserTable from './view/user/Table'
import User from './view/user/User'
import NotFound from './view/misc/NotFound'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isDrawerOpen : true }
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer() {
    const { isDrawerOpen } = this.state;
    this.setState({ isDrawerOpen: !isDrawerOpen });
  }

  render() {
    const contentStyle = { transition: 'margin-left 450ms cubic-bezier(0.23, 1, 0.32, 1)' };
    contentStyle.marginLeft = this.state.isDrawerOpen ? 256 : 0;

    return (
      <MuiThemeProvider>
        <div>
          <AppBar onLeftIconButtonTouchTap={this.toggleDrawer} />
          <Sidebar docker={false} open={this.state.isDrawerOpen} onToggleDrawer={this.toggleDrawer} />
          <div style={contentStyle} className="main">
            <Switch>
              <Redirect exact from='/' to='/meeting' />
              <Route path='/meeting/:id' component={Meeting} />
              <Route path='/user/:id' component={User} />
              <Route path='/meeting' component={Meetings} />
              <Route path='/user' component={UserTable} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
