import styled from "styled-components";

export const Layout = styled.main`
  display: flex;
  flex-direction: column;
  padding: 70px 32px;
`;

export const Nav = styled.nav`
  display: flex;
  gap: 5px;
`;

export const MovieList = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr); 
  gap: 15px;
  padding: 32px 0 0 0;
`;
