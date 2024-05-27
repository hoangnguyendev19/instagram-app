import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import UserAPI from '../../api/UserAPI';

const initialState = {
  users: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

export const getAllUsers = createAsyncThunk('users/getAllUsers', async (thunkAPI) => {
  try {
    return await UserAPI.getAllUsers();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const userSlice = createSlice({
  name: 'users',
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
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.posts = [];
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
