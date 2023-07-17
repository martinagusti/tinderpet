import { useState, useEffect } from "react";
import Header from "../components/header/Header";
import useChats from "../hooks/useChats";
import { useForm } from "react-hook-form";
import io from "socket.io-client";

import "./home.css";
import { newMessage } from "../services/chatServices";

const socket = io("http://localhost:3000");

function Chat({ userChat }) {
  const { chats, setChats, loading, error } = useChats(userChat);

  useEffect(() => {
    socket.on("message", receiveMessage);

    return () => {
      socket.off("message", receiveMessage);
    };
  }, []);

  const receiveMessage = (message) => {
    setChats((state) => [...state, message]);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (dataUser, e) => {
    try {
      const message = await newMessage(userChat, dataUser.text);

      if (message) {
        setChats([...chats, message]);
        socket.emit("message", message);
      }
    } catch (error) {
      console.log(error);
    }

    e.target.reset();
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  if (chats.length === 0) {
    return (
      <div>
        <Header />
        <p>Se el primero en iniciar la conversacion!</p>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              {...register("text", {
                required: true,
                maxLength: 500,
              })}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      {chats.map((element) => {
        return (
          <div key={element.ID}>
            <p>{element.text}</p>
          </div>
        );
      })}
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            {...register("text", {
              required: true,
              maxLength: 500,
            })}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
