import { useEffect, useState } from "react";

import api from "../../services/api";

import { Link } from "react-router-dom";

import "./home.css";

function Home() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadFilmes() {
      await api
        .get("movie/now_playing", {
          params: {
            api_key: "933df604180600d16e5583f3e8eb134e",
            language: "pt-BR",
            page: 1,
          },
        })
        .then((response) => {
          console.log(response.data.results);
          setFilmes(response.data.results);
          setLoading(false);
          setError(null);
        })
        .catch(() => {
          setError("Filmes não encontrados");
        });
    }

    loadFilmes();
  }, []);

  if (loading) return <div className="loading">Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <div className="lista-filme">
        {filmes.map((filme) => {
          return (
            <article key={filme.id}>
              <strong>{filme.title}</strong>
              <span className="sinopse">{filme.overview}</span>
              <img
                src={`https://image.tmdb.org/t/p/w500/${filme.poster_path}`}
                alt={filme.title}
              />
              <Link to={`/filme/${filme.id}`}>Acessar</Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
