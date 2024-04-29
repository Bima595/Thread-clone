import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from './authUser/reducer';
import talkDetailReducer from './talkDetail/reducer';
import talksReducer from './talks/reducer';
import usersReducer from './users/reducer';
 
const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    users: usersReducer,
    talks: talksReducer,
    detailThread: talkDetailReducer,
  },
});
 
export default store;