import styled from "styled-components";

const Button = styled.button`
  margin-top: 0.5rem;
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.textSecondary};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.primaryHover};
  }
`;

export default Button;
