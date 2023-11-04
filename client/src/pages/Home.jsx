import styled from "styled-components";
import Layout from "../components/Layout";

const Home = () => {
  return (
    <Layout>
      <Item>Home</Item>
    </Layout>
  );
};

export default Home;

const Item = styled.div`
  height: 200vh;
`;
