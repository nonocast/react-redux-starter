import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

import { meetings } from '../view/meeting/Redux';

import userTable from '../view/user/TableRedux'
import userDialog from '../view/user/DialogRedux'

export default combineReducers({
  meetings,
  users: combineReducers({
    table: userTable,
    dialog: userDialog
  }),
  routerReducer
});