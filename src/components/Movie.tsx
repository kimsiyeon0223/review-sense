import styled from "styled-components";

interface MovieDetailInfo {
  img: string;
  title: string;
  star: string;
}

const Layout = styled.main`
  display: flex;
  flex-direction: column;
  padding: 14px 25px;
  background-color: black;
`;

const MovieImg = styled.img``;

const MovieTitle = styled.span`
  font-size: 20px;
`;

const MovieStar = styled.span`
  font-size: 15px;
`;

const Movie = ({ img, title, star }: MovieDetailInfo) => {
  return (
    <Layout>
      <MovieImg src={`https://image.tmdb.org/t/p/w500${img}`} />
      <MovieTitle>{title}</MovieTitle>
      <MovieStar>{star}</MovieStar>
    </Layout>
  );
};

export default Movie;
