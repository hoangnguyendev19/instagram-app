const createComment = async (postId, content, token) => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/api/v1/posts/${postId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      throw new Error('Create comment failed');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

const deleteComment = async (postId, commentId, token) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:5000/api/v1/posts/${postId}/comments/${commentId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error('Delete comment failed');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

const likeComment = async (postId, commentId, token) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:5000/api/v1/posts/${postId}/comments/${commentId}/like`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error('Like comment failed');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

const unlikeComment = async (postId, commentId, token) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:5000/api/v1/posts/${postId}/comments/${commentId}/unlike`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error('Unlike comment failed');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

const UserAPI = {
  createComment,
  deleteComment,
  likeComment,
  unlikeComment,
};

export default UserAPI;
