import { createPortal } from "react-dom";
import styled from "styled-components";

const Backdrop = ({ onClick, ...rest }) => {
  return (
    <>
      {createPortal(
        <Overlay onClick={() => onClick()} {...rest} />,
        document.getElementById("overlays")
      )}
    </>
  );
};

export default Backdrop;

const Overlay = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.2);
`;
