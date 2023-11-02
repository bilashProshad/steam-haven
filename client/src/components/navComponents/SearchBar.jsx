import styled from "styled-components";
import { BiSearch } from "react-icons/bi";

const SearchBar = () => {
  return (
    <Form>
      <Input placeholder="Search" />
      <Button type="submit">
        <BiSearch />
      </Button>
    </Form>
  );
};

export default SearchBar;

const Form = styled.form`
  background-color: ${(props) => props.theme.btnBackground};
  display: flex;
  align-items: center;
  border-radius: 0 0.5rem 0.5rem 0;
  overflow: hidden;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Input = styled.input`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem 0 0 0.5rem;
  transition: all 0.3s ease;
  border: 1px solid ${(props) => props.theme.text};
  color: ${(props) => props.theme.text};
  z-index: 2;
  transition: all 0.3s;

  &:focus {
    outline: 1px solid ${(props) => props.theme.primary};
  }
`;

const Button = styled.button`
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1rem;
  border-radius: 0 0.5rem 0.5rem 0;

  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: hsl(0, 0%, 83%);
  }

  > svg {
    scale: 1.5;
  }
`;
