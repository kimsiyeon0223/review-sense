import styled from "styled-components";

const Layout = styled.main`
  display: flex;
  gap: 5px;
`;

const InputBox = styled.input`
  width: 212px;
  border: 1px solid #d9d9d9;
  padding: 9px 12px;
  border-radius: 4px;
  font-size: 12px;
  &:focus {
    outline: none;
  }
`;
const SearchBtn = styled.button`
  padding: 10px 15px;
  background-color: black;
  color: white;
  border-radius: 4px;
  &:focus {
    outline: none;
  }
`;

const Search = () => {
  return (
    <Layout>
      <InputBox placeholder="영화제목을 입력하세요." />
      <SearchBtn>검색</SearchBtn>
    </Layout>
  );
};

export default Search;
