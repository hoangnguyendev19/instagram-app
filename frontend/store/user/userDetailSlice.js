import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import UserAPI from '../../api/UserAPI';

const initialState = {
  user: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

export const getUserById = createAsyncThunk('userDetail/getUserById', async (userId, thunkAPI) => {
  try {
    return await UserAPI.getUserById(userId);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const userDetailSlice = createSlice({
  name: 'user',
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
      .addCase(getUserById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = {};
      });
  },
});

export const { reset } = userDetailSlice.actions;
export default userDetailSlice.reducer;
