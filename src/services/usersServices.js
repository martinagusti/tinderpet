import axios from "axios";

export const getAllUsers = async () => {
  try {
    let users = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users`);

    return users.data;
  } catch (error) {
    console.log(error);
  }
};
