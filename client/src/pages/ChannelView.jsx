import styled from "styled-components";
import Layout from "../components/Layout";
import Video from "../components/ChannelView/Video";
import ChatBox from "../components/ChannelView/ChatBox";

const ChannelView = () => {
  return (
    <Layout>
      <Container>
        <Video />
        <ChatBox />
      </Container>
    </Layout>
  );
};

export default ChannelView;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  overflow: hidden;
`;
