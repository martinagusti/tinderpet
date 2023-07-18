import { useState } from "react";
import { insertLike } from "../services/likeServices";
import { alreadySeen, isMatch } from "../services/likeServices";

import "./data.css";
import { insertNewMatch } from "../services/matchServices";

function Data({ usuarios, setMatchs, matchs }) {
  const userTinder = JSON.parse(localStorage.getItem("userTinder"));
  const [position, setPosition] = useState(0);
  const [match, setMatchNotification] = useState();

  usuarios = usuarios.filter((user) => {
    return user.alreadySeen === false;
  });

  usuarios = usuarios.filter((user) => {
    return user.ID !== userTinder.id;
  });

  const siguiente = async () => {
    await insertLike(usuarios[position].ID, false);
    setPosition(position + 1);
  };

  const like = async () => {
    await insertLike(usuarios[position].ID, true);
    const matched = await isMatch(usuarios[position].ID);

    if (matched.length === 1) {
      setMatchNotification(true);
      await insertNewMatch(usuarios[position].ID);
      setMatchs([...matchs, matched]);
      setTimeout(() => {
        setPosition(position + 1);
        setMatchNotification(false);
      }, 2000);
    } else {
      setMatchNotification(false);
      setPosition(position + 1);
    }
  };

  return (
    <div className="data-container">
      <p className="data-userName">{usuarios[position]?.userName}</p>
      {position <= usuarios.length - 1 && (
        <img
          className="data-img"
          src={`${import.meta.env.VITE_BACKEND_URL}/images/${
            usuarios[position]?.image
          }`}
        />
      )}
      <p className="data-bio">{usuarios[position]?.bio}</p>
      {position > usuarios.length - 1 && (
        <p>No hay mas perfiles en tu zona para mostrar</p>
      )}
      <div className="data-actions-container">
        {position <= usuarios.length - 1 && (
          <button className="btn-action-next" onClick={() => siguiente()}>
            Siguiente
          </button>
        )}
        {position <= usuarios.length - 1 && (
          <button className="btn-action-like" onClick={() => like()}>
            Like
          </button>
        )}
      </div>

      {match === true && <p>Has hecho Match con esta persona!!!</p>}
    </div>
  );
}

export default Data;
