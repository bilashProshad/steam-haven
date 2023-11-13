import styled from "styled-components";
import Layout from "../components/Layout";
import Video from "../components/ChannelView/Video";
import ChatBox from "../components/ChannelView/ChatBox";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../http";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";

const ChannelView = () => {
  const [loading, setLoading] = useState(true);
  const [channel, setChannel] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const { data } = await api.get(`/api/v1/channels/${id}`);
        setChannel(data.channel);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data.message);
      }
    };

    fetchChannels();
  }, [id]);

  return (
    <Layout>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          <Video channel={channel} />
          <ChatBox />
        </Container>
      )}
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
