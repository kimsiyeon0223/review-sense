import Header from "../../components/Header";
import * as S from "./style";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Detail = () => {
  const MovieDetailInfo = [
    { id: 1, title: "개봉", value: "2019.12.19." },
    { id: 2, title: "등급", value: "12세 이상 관람가" },
    { id: 3, title: "장르", value: "드라마, 액션" },
    { id: 4, title: "국가", value: "대한민국" },
    { id: 5, title: "러닝타임", value: "128분" },
    { id: 6, title: "배급", value: "CJ ENM, 덱스터스튜디오" },
    { id: 7, title: "평점", value: "7.7" },
  ];

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
      <S.Layout>
        <S.TitleBox>
          <S.MovieTitle>백두산</S.MovieTitle>
          <S.SeeAge>영화 - 2019.12.19. · 12세 이상 관람가</S.SeeAge>
        </S.TitleBox>
        <S.MainBox>
          <S.MovieDetail>
            {MovieDetailInfo.map((info) => (
              <S.DetailItem key={info.id}>
                <S.DetailTitle>{info.title}</S.DetailTitle>
                <S.DetailValue>{info.value}</S.DetailValue>
              </S.DetailItem>
            ))}
          </S.MovieDetail>
          <S.PosterBox>
            <S.Poster
              src="https://via.placeholder.com/200x300"
              alt="백두산 포스터"
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
    </>
  );
};

export default Detail;
