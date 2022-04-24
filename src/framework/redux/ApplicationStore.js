import { createStore, applyMiddleware } from 'redux';
// import api from '../middleware/api'
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../../redux/Reducers';

const configureStore = (preloadedState) => {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware())
  );
  console.log(store.getState(), '===============');
  return store;
};

export default configureStore();
