import styled from "styled-components";
import { BiSearch } from "react-icons/bi";
import { useState } from "react";
import Backdrop from "../Backdrop";
import { createPortal } from "react-dom";

const SearchBarSm = () => {
  const [showSearch, setShowSearch] = useState(false);

  const showSearchHandler = () => {
    setShowSearch((prev) => !prev);
  };

  return (
    <>
      <SearchButton onClick={showSearchHandler}>
        <BiSearch />
      </SearchButton>

      {showSearch && <Backdrop onClick={showSearchHandler} />}

      {showSearch &&
        createPortal(
          <SearchContainer>
            <Form>
              <Input type="text" placeholder="Search" />
              <Button>
                <BiSearch />
              </Button>
            </Form>
          </SearchContainer>,
          document.getElementById("overlays")
        )}
    </>
  );
};

export default SearchBarSm;

const SearchButton = styled.button`
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.btnBackground};
  padding: 0.8rem;
  border-radius: 5px;
  text-decoration: none;
  font-size: 1.8rem;
  font-weight: 500;
  color: ${(props) => props.theme.text};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: hsl(0, 0%, 83%);
  }

  @media screen and (min-width: 769px) {
    display: none;
  }
`;

const SearchContainer = styled.div`
  position: fixed;
  width: 100vw;
  padding: 2rem;
  background-color: ${(props) => props.theme.backgroundForm};
  top: 0;
  border-end-start-radius: 10px;
  border-bottom-right-radius: 10px;
  z-index: 100;

  @media screen and (min-width: 769px) {
    display: none;
  }
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  border: none;
  outline: none;
  padding: 1rem;
  font-size: 1.8rem;
  width: 80%;
  border-bottom: 1px solid #999;

  @media screen and (max-width: 600px) {
    width: 95%;
  }
`;

const Button = styled.button`
  border: none;
  font-size: 2rem;
  padding: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #999;
  background-color: ${(props) => props.theme.backgroundForm};
`;
