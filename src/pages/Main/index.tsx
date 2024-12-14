import { useState, useEffect } from "react";
import axios from "axios";
import Category from "../../components/Category";
import Header from "../../components/Header";
import Movie from "../../components/Movie";
import Search from "../../components/Search";
import * as S from "./style";

interface MovieType {
  id: number;
  img: string;
  title: string;
  star: number;
}

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const Main = () => {
  const [movieData, setMovieData] = useState<MovieType[]>([]);
  const [filteredData, setFilteredData] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("popular");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let allMovies: MovieType[] = [];
        for (let page = 1; page <= 3; page++) {
          const response = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
            params: {
              api_key: TMDB_API_KEY,
              language: "ko-KR",
              page,
            },
          });

          const movies = response.data.results.map(
            (movie: {
              id: number;
              poster_path: string;
              title: string;
              vote_average: number;
            }) => ({
              id: movie.id,
              img: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
              title: movie.title,
              star: movie.vote_average,
            }),
          );

          allMovies = [...allMovies, ...movies];
        }

        setMovieData(allMovies);
        setFilteredData(allMovies);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const sortMovies = (type: "popular" | "name" | "recommended") => {
    let sortedMovies;
    if (type === "popular") {
      sortedMovies = [...movieData].sort((a, b) => b.star - a.star);
    } else if (type === "name") {
      sortedMovies = [...movieData].sort((a, b) =>
        a.title.localeCompare(b.title, "ko-KR"),
      );
    } else if (type === "recommended") {
      sortedMovies = [...movieData].sort((a, b) => b.star - a.star);
    } else {
      return;
    }
    setFilteredData(sortedMovies);
    setActiveCategory(type);
  };

  const searchMovies = async (query: string) => {
    if (!query) {
      setFilteredData(movieData);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
        params: {
          api_key: TMDB_API_KEY,
          language: "ko-KR",
          query,
        },
      });

      const searchResults = response.data.results.map(
        (movie: {
          id: number;
          poster_path: string;
          title: string;
          vote_average: number;
        }) => ({
          id: movie.id,
          img: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          title: movie.title,
          star: movie.vote_average,
        }),
      );

      setFilteredData(searchResults);
    } catch (error) {
      console.error("Failed to search movies:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <S.Layout>
        <S.Nav>
          <Category
            text="인기순"
            onClick={() => sortMovies("popular")}
            isActive={activeCategory === "popular"}
          />
          <Category
            text="이름순"
            onClick={() => sortMovies("name")}
            isActive={activeCategory === "name"}
          />
          <Category
            text="추천순"
            onClick={() => sortMovies("recommended")}
            isActive={activeCategory === "recommended"}
          />
          <Search onSearch={searchMovies} />
        </S.Nav>
        <S.MovieList>
          {loading ? (
            <p>Loading...</p>
          ) : (
            filteredData.map((movie) => (
              <Movie
                key={movie.id}
                img={movie.img}
                title={movie.title}
                star={movie.star}
              />
            ))
          )}
        </S.MovieList>
      </S.Layout>
    </>
  );
};

export default Main;