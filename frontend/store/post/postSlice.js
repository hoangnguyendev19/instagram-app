import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import PostAPI from '../../api/PostAPI';
import CommentAPI from '../../api/CommentAPI';

const initialState = {
  posts: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

// Post

export const getAllPosts = createAsyncThunk('posts/getAllPosts', async (thunkAPI) => {
  try {
    return await PostAPI.getAllPosts();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const createPost = createAsyncThunk(
  'posts/createPost',
  async ({ post, token }, thunkAPI) => {
    try {
      return await PostAPI.createPost(post, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async ({ postId, token }, thunkAPI) => {
    try {
      return await PostAPI.deletePost(postId, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Comment
export const createComment = createAsyncThunk(
  'posts/createComment',
  async ({ postId, content, token }, thunkAPI) => {
    try {
      return await CommentAPI.createComment(postId, content, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const deleteComment = createAsyncThunk(
  'posts/deleteComment',
  async ({ postId, commentId, token }, thunkAPI) => {
    try {
      return await CommentAPI.deleteComment(postId, commentId, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const likeComment = createAsyncThunk(
  'posts/likeComment',
  async ({ postId, commentId, token }, thunkAPI) => {
    try {
      return await CommentAPI.likeComment(postId, commentId, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const unlikeComment = createAsyncThunk(
  'posts/unlikeComment',
  async ({ postId, commentId, token }, thunkAPI) => {
    try {
      return await CommentAPI.unlikeComment(postId, commentId, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

const postSlice = createSlice({
  name: 'posts',
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
    builder // post
      .addCase(getAllPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.posts = [];
      })
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      }) // comment
      .addCase(createComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        const postId = action.payload.post;

        const updatedPosts = state.posts.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              comments: [...post.comments, action.payload],
            };
          }
          return post;
        });

        state.posts = updatedPosts;
      })
      .addCase(createComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        const postId = action.payload.postId;
        const commentId = action.payload.commentId;

        state.posts = state.posts.map((post) => {
          if (post.id === postId) {
            const commentList = [...post.comments];
            const newComments = commentList.filter((comment) => comment._id !== commentId);
            return {
              ...post,
              comments: newComments,
            };
          }
          return post;
        });
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(likeComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(likeComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        const postId = action.payload.postId;
        const commentId = action.payload.commentId;
        const userId = action.payload.userId;

        state.posts = state.posts.map((post) => {
          if (post.id === postId) {
            post.comments = post.comments.map((comment) => {
              if (comment._id === commentId) {
                return {
                  ...comment,
                  likes: [...comment.likes, userId],
                };
              }
              return comment;
            });
            return {
              ...post,
            };
          }
          return post;
        });
      })
      .addCase(likeComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(unlikeComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unlikeComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        const postId = action.payload.postId;
        const commentId = action.payload.commentId;
        const userId = action.payload.userId;

        state.posts = state.posts.map((post) => {
          if (post.id === postId) {
            post.comments = post.comments.map((comment) => {
              if (comment._id === commentId) {
                const likeList = [...comment.likes];
                const newLikes = likeList.filter((like) => like !== userId);
                return {
                  ...comment,
                  likes: newLikes,
                };
              }
              return comment;
            });
            return {
              ...post,
            };
          }
          return post;
        });
      })
      .addCase(unlikeComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = postSlice.actions;
export default postSlice.reducer;
