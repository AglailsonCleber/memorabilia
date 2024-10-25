'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';

const TMDB_ACESS_TOKEN = process.env.NEXT_PUBLIC_TMDB_ACESS_TOKEN;

interface Movie {
  poster_path?: string;
  title?: string;
  release_date?: string;
  overview?: string;
  vote_average?: number;
  runtime?: number;
}

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id && TMDB_ACESS_TOKEN) {
      const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer ' + TMDB_ACESS_TOKEN,
        },
      };

      const fetchMovieDetails = async () => {
        try {
          const response = await axios.request(options);
          setMovie(response.data);
        } catch (error) {
          console.error('Erro ao buscar detalhes do filme:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchMovieDetails();
    }
  }, [id, TMDB_ACESS_TOKEN]);

  if (loading) {
    return <p className="text-center mt-10">Carregando detalhes do filme...</p>;
  }

  if (!movie) {
    return <p className="text-center mt-10">Filme não encontrado.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
        {/* Poster do filme */}
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path ?? ''}`}
          alt={movie.title ?? 'Título indisponível'}
          className="w-full md:w-1/3 rounded-lg shadow-lg"
        />

        {/* Informações do filme */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800">{movie.title ?? 'Título indisponível'}</h1>
          <p className="text-gray-600 text-sm mt-1">{movie.release_date ?? 'Data indisponível'}</p>

          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-700">Sinopse</h2>
            <p className="text-gray-700 mt-2">{movie.overview ?? 'Sinopse indisponível'}</p>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-700">Avaliação</h2>
            <p className="text-gray-600">{movie.vote_average ?? 'N/A'} / 10</p>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-700">Duração</h2>
            <p className="text-gray-600">{movie.runtime ? `${movie.runtime} minutos` : 'Duração indisponível'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
