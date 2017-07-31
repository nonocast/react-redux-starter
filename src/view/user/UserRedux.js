
import { combineReducers } from 'redux';

import table from '../component/user/TableRedux';
import modal from '../component/user/DialogRedux';

export default combineReducers({
  table,
  modal,
});

export * as tableActions from '../components/user/TableRedux';
export * as modalActions from '../components/user/ModalRedux';