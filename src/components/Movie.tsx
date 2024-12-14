import styled from "styled-components";

interface MovieDetailInfo {
  img: string;
  title: string;
  star: number;
}

const Layout = styled.main`
  display: flex;
  flex-direction: column;
  padding: 14px 25px;
  background-color: black;
  color: white;
  align-items: center;
  border-radius: 10px;
`;

const MovieImg = styled.img`
  width: 212px;
  height: 303px;
`;

const MovieTitle = styled.span`
  font-size: 20px;
  padding-top: 9px;
`;

const MovieStar = styled.span`
  font-size: 15px;
`;

const Movie = ({ img, title, star }: MovieDetailInfo) => {
  return (
    <Layout>
      <MovieImg src={img} />
      <MovieTitle>{title}</MovieTitle>
      <MovieStar>{star}</MovieStar>
    </Layout>
  );
};

export default Movie;
