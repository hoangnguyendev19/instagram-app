const getAllUsers = async () => {
  try {
    const response = await fetch('http://127.0.0.1:5000/api/v1/users', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Get all users failed');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

const getUserById = async (userId) => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/api/v1/users/${userId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Get user failed');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

const UserAPI = {
  getAllUsers,
  getUserById,
};

export default UserAPI;
