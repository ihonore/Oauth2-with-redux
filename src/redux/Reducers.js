import { combineReducers } from 'redux';
import reducer from '../ToDoReducer';
import authReducer from '../framework/redux/module/Authorization';

export default combineReducers({
  auth: authReducer,
  todoss: reducer,
});
