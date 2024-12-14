import styled from "styled-components";

interface CategoryInfo {
  text: string;
  onClick?: () => void;
  isActive: boolean;
}

const Layout = styled.button<{ isActive: boolean }>`
  padding: 10px 14px;
  background-color: ${({ isActive }) => (isActive ? "black" : "#a9a9a9")};
  border-radius: 10px;
  color: white;
  font-size: 14px;
  &:focus {
    outline: none;
  }
`;

const Title = styled.span`
  font-size: 14px;
`;

const Category = ({ text, onClick, isActive }: CategoryInfo) => {
  return (
    <Layout isActive={isActive} onClick={onClick}>
      <Title>{text}</Title>
    </Layout>
  );
};

export default Category;
