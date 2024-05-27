const register = async (user) => {
  try {
    const response = await fetch('http://127.0.0.1:5000/api/v1/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    const data = await response.json();
    if (data.data) {
      localStorage.setItem('user', JSON.stringify(data.data.user));
      localStorage.setItem('token', JSON.stringify(data.data.token));
    }
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

const login = async (email, password) => {
  try {
    const response = await fetch('http://127.0.0.1:5000/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    if (data.data) {
      localStorage.setItem('user', JSON.stringify(data.data.user));
      localStorage.setItem('token', JSON.stringify(data.data.token));
    }
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

const logout = async () => {
  try {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  } catch (error) {
    console.error(error);
  }
};

const updatePassword = async (currPassword, newPassword, token) => {
  try {
    const response = await fetch('http://127.0.0.1:5000/api/v1/users/update-password', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ currPassword, newPassword }),
    });

    if (!response.ok) {
      throw new Error('Password update failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const updateProfile = async (profile, token) => {
  try {
    const response = await fetch('http://127.0.0.1:5000/api/v1/users/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profile),
    });

    if (!response.ok) {
      throw new Error('Update profile failed');
    }

    const data = await response.json();
    if (data.data) {
      localStorage.removeItem('user');
      localStorage.setItem('user', JSON.stringify(data.data));
    }
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

const followUser = async (userId, token) => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/api/v1/users/${userId}/follow`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Follow user failed');
    }

    const data = await response.json();
    if (data.data) {
      localStorage.removeItem('user');
      localStorage.setItem('user', JSON.stringify(data.data));
    }
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

const unfollowUser = async (userId, token) => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/api/v1/users/${userId}/unfollow`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Unfollow user failed');
    }

    const data = await response.json();
    if (data.data) {
      localStorage.removeItem('user');
      localStorage.setItem('user', JSON.stringify(data.data));
    }
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

const AuthAPI = {
  login,
  register,
  logout,
  updatePassword,
  updateProfile,
  followUser,
  unfollowUser,
};

export default AuthAPI;
