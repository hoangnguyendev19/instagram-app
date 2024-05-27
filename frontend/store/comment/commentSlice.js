// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import CommentAPI from '../../api/CommentAPI';

// const initialState = {
//   comments: [],
//   isLoading: false,
//   isSuccess: false,
//   isError: false,
//   message: '',
// };

// export const createComment = createAsyncThunk(
//   'comments/createComment',
//   async ({ postId, comment, token }, thunkAPI) => {
//     try {
//       return await CommentAPI.createComment(postId, comment, token);
//     } catch (error) {
//       const message =
//         (error.response && error.response.data && error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   },
// );

// export const deleteComment = createAsyncThunk(
//   'comments/deleteComment',
//   async ({ postId, commentId, token }, thunkAPI) => {
//     try {
//       return await CommentAPI.deleteComment(postId, commentId, token);
//     } catch (error) {
//       const message =
//         (error.response && error.response.data && error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   },
// );

// export const likeComment = createAsyncThunk(
//   'comments/likeComment',
//   async ({ postId, commentId, token }, thunkAPI) => {
//     try {
//       return await CommentAPI.likeComment(postId, commentId, token);
//     } catch (error) {
//       const message =
//         (error.response && error.response.data && error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   },
// );

// export const unlikeComment = createAsyncThunk(
//   'comments/unlikeComment',
//   async ({ postId, commentId, token }, thunkAPI) => {
//     try {
//       return await CommentAPI.unlikeComment(postId, commentId, token);
//     } catch (error) {
//       const message =
//         (error.response && error.response.data && error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   },
// );

// const commentSlice = createSlice({
//   name: 'comments',
//   initialState,
//   reducers: {
//     reset: (state) => {
//       state.isLoading = false;
//       state.isSuccess = false;
//       state.isError = false;
//       state.message = '';
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(createComment.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(createComment.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.comments = state.comments.push(action.payload);
//       })
//       .addCase(createComment.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload;
//       })
//       .addCase(deleteComment.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(deleteComment.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         // state.posts = state.posts.push(action.payload);
//       })
//       .addCase(deleteComment.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload;
//       })
//       .addCase(likeComment.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(likeComment.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//       })
//       .addCase(likeComment.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload;
//       })
//       .addCase(unlikeComment.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(unlikeComment.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//       })
//       .addCase(unlikeComment.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload;
//       });
//   },
// });

// export const { reset } = commentSlice.actions;
// export default commentSlice.reducer;
