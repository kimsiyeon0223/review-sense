import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState<MovieType[]>([]);
  const [filteredData, setFilteredData] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<string>("popular");

  // API 호출
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let allMovies: MovieType[] = [];
        const totalPages = 3; // 가져올 페이지 수
        for (let page = 1; page <= totalPages; page++) {
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
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // 영화 클릭 시 상세 페이지로 이동
  const handleMovieClick = (id: number) => {
    navigate(`/detail/${id}`);
  };

  // 영화 정렬
  const sortMovies = (type: "popular" | "name" | "recommended") => {
    const sortedMovies =
      type === "name"
        ? [...movieData].sort((a, b) => a.title.localeCompare(b.title, "ko-KR"))
        : [...movieData].sort((a, b) => b.star - a.star);

    setFilteredData(sortedMovies);
    setActiveCategory(type);
  };

  // 영화 검색
  const searchMovies = async (query: string) => {
    if (!query) {
      setFilteredData(movieData); // 검색어가 없으면 전체 데이터 표시
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
              <div
                key={movie.id}
                onClick={() => handleMovieClick(movie.id)}
                style={{ cursor: "pointer" }} // 클릭 가능 표시
              >
                <Movie img={movie.img} title={movie.title} star={movie.star} />
              </div>
            ))
          )}
        </S.MovieList>
      </S.Layout>
    </>
  );
};

export default Main;
