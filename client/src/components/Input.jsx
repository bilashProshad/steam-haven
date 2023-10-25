import styled from "styled-components";

const Input = styled.input`
  padding: 1rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  color: ${(props) => props.theme.text};

  &:focus {
    outline: 2px solid ${(props) => props.theme.primary};
  }
`;

export default Input;
