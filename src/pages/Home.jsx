import Data from "../components/Data";
import Header from "../components/header/Header";

import "./home.css";

function Home({ usuarios }) {
  return (
    <div>
      <Header />
      <Data usuarios={usuarios} />
    </div>
  );
}

export default Home;
