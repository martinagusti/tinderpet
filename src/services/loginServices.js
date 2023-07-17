import axios from "axios";

export const login = async (email, password) => {
  try {
    let log = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/users/login`,
      {
        email,
        password,
      }
    );

    return log.data;
  } catch (error) {
    console.log(error);
  }
};
