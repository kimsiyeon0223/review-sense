import styled from "styled-components";

export const Layout = styled.div`
  padding-top: 63px;
`;

export const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 63px 66px;
  color: white;
  background-color: black;
  border-top-right-radius: 50px;
  border-top-left-radius: 50px;
`;

export const MovieTitle = styled.span`
  font-size: 48px;
`;

export const SeeAge = styled.span`
  font-size: 36px;
  color: gray;
`;

export const MainBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 65px 69px;
`;

export const MovieDetail = styled.div`
  flex: 1;
  margin-right: 20px;
`;

export const DetailItem = styled.div`
  display: flex;
  margin-bottom: 10px;
  font-size: 25px;
`;

export const DetailTitle = styled.span`
  font-weight: bold;

  width: 100px;
`;

export const DetailValue = styled.span`
  color: #555;
`;

export const PosterBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Poster = styled.img`
  width: 400px;
  height: 500px;
  border-radius: 10px;
  object-fit: cover;
  margin-bottom: 20px;
`;

export const ScoreBox = styled.div`
  text-align: center;
`;

export const ScoreText = styled.p`
  font-size: 19px;
  margin-bottom: 5px;
`;

export const ScoreValue = styled.p`
  font-size: 25px;
  font-weight: bold;
`;

export const StarRating = styled.p`
  font-size: 23px;
  color: gold;
`;

export const ReviewBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 75px 30px 75px;
`;

export const ReviewTitle = styled.h2`
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const ChartContainer = styled.div`
  display: flex;
  width: 400px;
  height: 400px;
  canvas {
    max-width: 100%;
    max-height: 100%;
  }
`;
