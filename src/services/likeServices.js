import axios from "axios";

export const insertLike = async (id, isLiked) => {
  const user = JSON.parse(localStorage.getItem("userTinder"));
  console.log(user);
  try {
    let like = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/like/${id}`,
      {
        isLiked,
        idUser: user.id,
      }
    );

    return like.data;
  } catch (error) {
    console.log(error);
  }
};

export const isMatch = async (id) => {
  const user = JSON.parse(localStorage.getItem("userTinder"));
  try {
    let match = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/like/ismatch/${id}`,
      { idUser: user.id }
    );

    return match.data;
  } catch (error) {
    console.log(error);
  }
};

export const alreadySeen = async (id, idUser) => {
  try {
    let like = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/like/alreadySeen/${id}`,
      {
        idUser,
      }
    );

    return like.data;
  } catch (error) {
    console.log(error);
  }
};
