import styled from "styled-components";

const Loading = () => {
  return (
    <LoadingContainer>
      <LoadingSpinner />
    </LoadingContainer>
  );
};

export default Loading;

const LoadingContainer = styled.div`
  width: 100vw;
  height: 80vh;
  background-color: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
`;

const LoadingSpinner = styled.div`
  width: 10vmax;
  height: 10vmax;
  border-bottom: 5px solid rgba(0, 0, 0, 0.719);
  border-radius: 50%;
  animation: rotate 0.8s linear infinite;

  @keyframes rotate {
    to {
      transform: rotate(360deg);
    }
  }
`;
