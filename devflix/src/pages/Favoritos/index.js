import { useEffect, useState } from "react";
import "./favoritos.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Favoritos() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    let minhaLista = localStorage.getItem("@devflix");

    setFilmes(JSON.parse(minhaLista) || []);
  }, []);

  function excluirFilme(id) {
    let filtroFilmes = filmes.filter((item) => {
      return item.id !== id;
    });

    setFilmes(filtroFilmes);
    localStorage.setItem("@devflix", JSON.stringify(filtroFilmes));
    toast.success("Filme excluído com sucesso!");
  }

  return (
    <div className="itens-favoritos">
      <h1>Favoritos</h1>

      {filmes.length === 0 && (
        <span className="sem-filme">Não há nenhum filme na lista</span>
      )}

      <ul>
        {filmes.map((filme) => {
          return (
            <li key={filme.id}>
              <span>{filme.title}</span>
              <div className="buttons-filmes">
                <Link to={`/filme/${filme.id}`}>Ver Detalhes</Link>
                <button onClick={() => excluirFilme(filme.id)}>Excluir</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Favoritos;
