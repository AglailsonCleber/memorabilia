'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const options = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_TMDB_ACESS_TOKEN,
  },
};

export default function MoviesList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredMovie, setHoveredMovie] = useState(null); // Para gerenciar o filme que está sendo hoverado

  const router = useRouter();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.request(options);
        setMovies(response.data.results);
      } catch (error) {
        console.error('Erro ao buscar lançamentos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <p>Carregando filmes...</p>;
  }

  return (
    <div className="movies-list">
      {movies.length > 0 ? (
        movies.map((movie) => (
          <div
            key={movie.id}
            className="movie-item"
            onClick={() => router.push(`/movies/${movie.id}`)} // Redireciona para a página de detalhes ao clicar no card
            onMouseEnter={() => setHoveredMovie(movie.id)} // Mostra informações ao passar o mouse
            onMouseLeave={() => setHoveredMovie(null)} // Esconde informações ao tirar o mouse
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width="200"
            />
            {hoveredMovie === movie.id && ( // Exibe informações apenas se o card estiver sendo hoverado
              <div className="movie-info">
                <h2>{movie.title}</h2>
                <p>{movie.release_date}</p>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>Nenhum filme encontrado.</p>
      )}
    </div>
  );
}
