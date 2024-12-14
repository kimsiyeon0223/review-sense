import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import * as S from "./style";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

interface MovieDetailType {
  title: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
  runtime: number;
  genres: { name: string }[];
  overview: string;
}

const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const [movieDetail, setMovieDetail] = useState<MovieDetailType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    const fetchMovieDetail = async () => {
      try {
        const response = await axios.get(`${TMDB_BASE_URL}/movie/${id}`, {
          params: {
            api_key: TMDB_API_KEY,
            language: "ko-KR",
          },
        });
        setMovieDetail(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch movie detail:", error);
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id]);

  const chartData = {
    labels: ["너무 좋아요", "좋아요", "별로예요", "그저 그래요"],
    datasets: [
      {
        data: [40, 30, 20, 10],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#A9A9A9"],
        hoverBackgroundColor: ["#FF4384", "#3592EB", "#FFBE56", "#909090"],
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <>
      <Header />
      {loading ? (
        <p>Loading...</p>
      ) : movieDetail ? (
        <S.Layout>
          <S.TitleBox>
            <S.MovieTitle>{movieDetail.title}</S.MovieTitle>
            <S.SeeAge>
              영화 - {movieDetail.release_date} · {movieDetail.vote_average}{" "}
              평점
            </S.SeeAge>
          </S.TitleBox>
          <S.MainBox>
            <S.MovieDetail>
              <S.DetailItem>
                <S.DetailTitle>개봉</S.DetailTitle>
                <S.DetailValue>{movieDetail.release_date}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailTitle>장르</S.DetailTitle>
                <S.DetailValue>
                  {movieDetail.genres.map((genre) => genre.name).join(", ")}
                </S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailTitle>러닝타임</S.DetailTitle>
                <S.DetailValue>{movieDetail.runtime}분</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailTitle>줄거리</S.DetailTitle>
                <S.DetailValue>{movieDetail.overview}</S.DetailValue>
              </S.DetailItem>
            </S.MovieDetail>
            <S.PosterBox>
              <S.Poster
                src={`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`}
                alt={movieDetail.title}
              />
            </S.PosterBox>
          </S.MainBox>
          <S.ReviewBox>
            <S.ReviewTitle>리뷰</S.ReviewTitle>
            <S.ChartContainer>
              <Pie data={chartData} options={chartOptions} />
            </S.ChartContainer>
          </S.ReviewBox>
        </S.Layout>
      ) : (
        <p>영화 정보를 불러올 수 없습니다.</p>
      )}
    </>
  );
};

export default Detail;
