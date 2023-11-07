import styled from "styled-components";

const TextArea = styled.textarea`
  padding: 1rem;
  border: 2px solid #000;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  color: ${(props) => props.theme.text};

  &:focus {
    outline: 2px solid ${(props) => props.theme.primary};
  }
`;

export default TextArea;
