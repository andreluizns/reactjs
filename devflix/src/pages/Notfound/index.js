import { Link } from "react-router-dom";

import "./notfound.css";

function Notfound() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Página não encontrada</h2>
      <Link to="/">Ver todos os filmes</Link>;
    </div>
  );
}

export default Notfound;
