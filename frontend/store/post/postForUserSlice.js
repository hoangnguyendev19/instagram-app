import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import PostAPI from '../../api/PostAPI';

const initialState = {
  posts: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

export const getAllPostsForUser = createAsyncThunk(
  'postsForUser/getAllPostsForUser',
  async (userId, thunkAPI) => {
    try {
      return await PostAPI.getAllPostsForUser(userId);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

const postForUserSlice = createSlice({
  name: 'postsForUser',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPostsForUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPostsForUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload;
      })
      .addCase(getAllPostsForUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.posts = [];
      });
  },
});

export const { reset } = postForUserSlice.actions;
export default postForUserSlice.reducer;
