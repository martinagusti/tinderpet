import axios from "axios";

export const insertNewMatch = async (id) => {
  const user = JSON.parse(localStorage.getItem("userTinder"));
  try {
    let inserted = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/matchs/${id}`,
      {
        idUser: user.id,
      }
    );

    return inserted.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllMatchs = async () => {
  const user = JSON.parse(localStorage.getItem("userTinder"));

  try {
    let matchs = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/matchs/`,
      {
        idUser: user.id,
      }
    );

    return matchs.data;
  } catch (error) {
    console.log(error);
  }
};
