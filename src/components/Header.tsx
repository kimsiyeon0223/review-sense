import Logo from "../assets/movie_logo.svg";
import styled from "styled-components";

const Layout = styled.main`
  display: flex;
  padding: 29px 0 29px 29px;
  align-items: center;
`;

const LogoTitle = styled.span`
  font-size: 24px;
`;

const Header = () => {
  return (
    <Layout>
      <img src={Logo} />
      <LogoTitle>reviewSense</LogoTitle>
    </Layout>
  );
};

export default Header;
