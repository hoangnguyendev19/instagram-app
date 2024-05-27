const getAllPosts = async () => {
  try {
    const response = await fetch('http://127.0.0.1:5000/api/v1/posts', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Get all posts failed');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

const getAllPostsForUser = async (userId) => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/api/v1/posts/users/${userId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Get all posts failed');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

const getPostById = async (postId) => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/api/v1/posts/${postId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Get post by id failed');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

const createPost = async (post, token) => {
  try {
    const response = await fetch('http://127.0.0.1:5000/api/v1/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(post),
    });

    if (!response.ok) {
      throw new Error('Create post failed');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

const updatePost = async (postId, post, token) => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/api/v1/posts/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(post),
    });

    if (!response.ok) {
      throw new Error('Update post failed');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

const deletePost = async (postId, token) => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/api/v1/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Delete post failed');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

const likePost = async (postId, token) => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/api/v1/posts/${postId}/like`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Like post failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const unlikePost = async (postId, token) => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/api/v1/posts/${postId}/unlike`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Unlike post failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const PostAPI = {
  getAllPosts,
  getAllPostsForUser,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
};

export default PostAPI;
