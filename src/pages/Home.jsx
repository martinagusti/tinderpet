import Data from "../components/Data";
import Header from "../components/header/Header";

import "./home.css";

function Home({ usuarios, setMatchs, matchs }) {
  return (
    <div>
      <Header />
      <Data usuarios={usuarios} setMatchs={setMatchs} matchs={matchs} />
    </div>
  );
}

export default Home;
