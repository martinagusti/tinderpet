import { useNavigate } from "react-router-dom";

import "./header.css";

function Header() {
  const navigateTo = useNavigate();

  const login = () => {
    navigateTo(`/login`);
  };

  return (
    <div className="header-container">
      <p>Nombre App</p>
      <nav>
        <ul className="header-ul">
          <li onClick={() => navigateTo(`/`)}>Home</li>
          <li onClick={() => navigateTo(`/matchs`)}>Mis Matchs</li>
          <li onClick={() => login()}>Login</li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
