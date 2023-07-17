import { useEffect, useState } from "react";
import { getChats } from "../services/chatServices";
import io from "socket.io-client";

const useChats = (id) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const socket = io("http://localhost:3000");

  useEffect(() => {
    const loadChats = async () => {
      try {
        setLoading(true);
        const data = await getChats(id);

        setChats(data);
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadChats();
  }, []);

  return {
    chats,
    setChats,
    loading,
    error,
  };
};

export default useChats;
