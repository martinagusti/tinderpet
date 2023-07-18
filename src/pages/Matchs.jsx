import Header from "../components/header/Header";
import { useNavigate } from "react-router-dom";
import "./matchs.css";

function Matchs({ matchs, setUserChat }) {
  const navigateTo = useNavigate();

  const goChat = (id) => {
    navigateTo(`/chat`);
    setUserChat(id);
  };

  console.log(matchs);

  return (
    <>
      <Header />
      <div className="matchs-container">
        {matchs.map((person) => {
          return (
            <div
              key={person.ID}
              className="match-person-container"
              onClick={() => goChat(person.ID)}
            >
              <p>{person.userName}</p>
              <img
                className="matchs-img"
                src={`${import.meta.env.VITE_BACKEND_URL}/images/${
                  person.image
                }`}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Matchs;
