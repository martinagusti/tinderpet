import { useEffect, useState } from "react";
import { getAllUsers } from "./services/usersServices";

import "./App.css";
import useUsers from "./hooks/useUsers";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Matchs from "./pages/Matchs";
import Chat from "./pages/Chat";

function App() {
  const { usuarios, loading, error, matchs, setMatchs, setUserLogged } =
    useUsers();

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
        <Route
          path="/login"
          element={<Login setUserLogged={setUserLogged} />}
        />
        <Route
          path="/matchs"
          element={<Matchs matchs={matchs} setUserChat={setUserChat} />}
        />
        <Route
          path="/"
          element={
            <Home usuarios={usuarios} setMatchs={setMatchs} matchs={matchs} />
          }
        />
        <Route path="/chat" element={<Chat userChat={userChat} />} />
      </Routes>
    </>
  );
}

export default App;
