import styled from "styled-components";
import Navbar from "./navComponents/Navbar";
import Sidebar from "./navComponents/Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container>
        <Sidebar />
        <Main>{children}</Main>
      </Container>
    </>
  );
};

export default Layout;

const Container = styled.div`
  display: flex;
`;

const Main = styled.div`
  width: 100%;
  padding: 1rem;
  overflow-x: hidden;
`;
