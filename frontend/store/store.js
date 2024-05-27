import { configureStore } from '@reduxjs/toolkit';
import postReducer from './post/postSlice';
import postForUserReducer from './post/postForUserSlice';
import postDetailReducer from './post/postDetailSlice';
import userReducer from './user/userSlice';
import userDetailReducer from './user/userDetailSlice';
import authReducer from './auth/authSlice';
import commentReducer from './comment/commentSlice';

const store = configureStore({
  reducer: {
    post: postReducer,
    postForUser: postForUserReducer,
    postDetail: postDetailReducer,
    user: userReducer,
    userDetail: userDetailReducer,
    auth: authReducer,
    comment: commentReducer,
  },
});

export default store;
