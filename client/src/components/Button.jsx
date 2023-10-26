import styled from "styled-components";
import { LuLoader2 } from "react-icons/lu";

const StyledButton = styled.button`
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

const Text = styled.span``;

const Loading = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  > svg {
    /* stroke-width: 3px; */
    scale: 2;
    animation: rotate 1s forwards infinite;

    @keyframes rotate {
      to {
        transform: rotateZ(360deg);
      }
    }
  }
`;

const Button = ({
  children,
  loading = false,
  type,
  disabled = false,
  ...rest
}) => {
  return (
    <StyledButton disabled={disabled} type={type} {...rest}>
      {!loading ? (
        <Text>{children}</Text>
      ) : (
        <Loading>
          <LuLoader2 />
        </Loading>
      )}
    </StyledButton>
  );
};

export default Button;
