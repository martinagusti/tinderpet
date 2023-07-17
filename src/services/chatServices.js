import axios from "axios";

export const getChats = async (id) => {
  const user = JSON.parse(localStorage.getItem("userTinder"));

  try {
    let chat = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/chats/${id}`,
      {
        idUser: user.id,
      }
    );

    return chat.data;
  } catch (error) {
    console.log(error);
  }
};

export const newMessage = async (id, text) => {
  const user = JSON.parse(localStorage.getItem("userTinder"));

  try {
    let message = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/chats/message/${id}`,
      {
        idUser: user.id,
        text,
      }
    );

    return message.data;
  } catch (error) {
    console.log(error);
  }
};
