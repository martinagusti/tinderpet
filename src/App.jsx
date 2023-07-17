import { useEffect, useState } from "react";
import { getAllUsers } from "./services/usersServices";

import "./App.css";
import useUsers from "./hooks/useUsers";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import Initial from "./pages/initial";
import Home from "./pages/Home";
import Matchs from "./pages/Matchs";
import Chat from "./pages/Chat";

import io from "socket.io-client";

const socket = io("http://localhost:3000");

function App() {
  const { usuarios, loading, error, matchs } = useUsers();

  const [userChat, setUserChat] = useState();

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<Initial />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/matchs"
          element={<Matchs matchs={matchs} setUserChat={setUserChat} />}
        />
        <Route path="/home" element={<Home usuarios={usuarios} />} />
        <Route path="/chat" element={<Chat userChat={userChat} />} />
      </Routes>
    </>
  );
}

export default App;
