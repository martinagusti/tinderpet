import { useEffect, useState } from "react";
import { getAllUsers } from "../services/usersServices";
import { alreadySeen } from "../services/likeServices";
import { getAllMatchs } from "../services/matchServices";

const useUsers = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [matchs, setMatchs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userLogged, setUserLogged] = useState();

  useEffect(() => {
    const userTinder = JSON.parse(localStorage.getItem("userTinder"));
    const loadUsers = async () => {
      try {
        setLoading(true);

        if (userTinder) {
          const data = await getAllUsers();
          const allMatchs = await getAllMatchs();

          for (const user of data) {
            const usuario = await alreadySeen(user.ID, userTinder.id);

            if (usuario.length > 0) {
              user.alreadySeen = true;
            } else {
              user.alreadySeen = false;
            }
          }

          setMatchs(allMatchs);
          setUsuarios(data);
        }
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, [userLogged, matchs]);

  return {
    usuarios,
    loading,
    error,
    matchs,
    userLogged,
    setUserLogged,
  };
};

export default useUsers;
