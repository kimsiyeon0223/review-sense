import { useState } from "react";
import styled from "styled-components";

interface CategoryInfo {
  text: string;
  onClick?: () => void;
}

const Layout = styled.button<{ isClicked: boolean }>`
  padding: 10px 14px;
  background-color: ${({ isClicked }) => (isClicked ? "black" : "#a9a9a9")};
  border-radius: 10px;
  &:focus {
    outline: none;
  }
`;

const Title = styled.span`
  color: white;
  font-size: 14px;
`;

const Category = ({ text, onClick }: CategoryInfo) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
    if (onClick) onClick();
  };
  return (
    <Layout isClicked={isClicked} onClick={handleClick}>
      <Title>{text}</Title>
    </Layout>
  );
};

export default Category;
