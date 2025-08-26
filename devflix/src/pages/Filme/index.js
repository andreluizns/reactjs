import { useEffect, useState } from "react";
import "./filme.css";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-toastify";

function Filme() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilme() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: "933df604180600d16e5583f3e8eb134e",
            language: "pt-BR",
          },
        })
        .then((response) => {
          setLoading(false);
          setFilme(response.data);
        })
        .catch(() => {
          navigate("/", { replace: true });
          setLoading(false);
          return;
        });
    }

    loadFilme();
  }, [navigate, id]);

  function salvarFilme() {
    const minhaLista = localStorage.getItem("@devflix");

    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilme = filmesSalvos.some(
      (filmesSalvo) => filmesSalvo.id === filme.id
    );

    if (hasFilme) {
      toast.warn("Este filme já está na lista.");
      return;
    } else {
      filmesSalvos.push(filme);
      localStorage.setItem("@devflix", JSON.stringify(filmesSalvos));
      toast.success("Filme salvo com sucesso!");
    }
  }

  if (loading)
    return (
      <div className="loading">
        <h2>Carregando filme...</h2>
      </div>
    );

  return (
    <div className="filme">
      <h1>{filme.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
        alt={`${filme.title}`}
      />
      <h3>Sinopse:</h3>
      <p>{filme.overview}</p>
      <span>
        <strong>Avaliação:</strong> {filme.vote_average} / 10
      </span>

      <div className="area-button">
        <button onClick={salvarFilme}>Salvar</button>{" "}
        <a
          target="blank"
          rel="external"
          href={`https://youtube.com/results?search_query=${filme.title} trailer`}
        >
          Ver Trailer
        </a>
      </div>
    </div>
  );
}

export default Filme;
