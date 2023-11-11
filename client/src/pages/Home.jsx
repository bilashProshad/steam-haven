import { useEffect, useState } from "react";
import Channels from "../components/Channels";
import Layout from "../components/Layout";
import api from "../http";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const { data } = await api.get("/api/v1/channels");
        setChannels(data.channels);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data.message);
      }
    };

    fetchChannels();
  }, []);

  return (
    <Layout>
      {!loading && <Channels channelData={channels} />}
      {loading && <Loading />}
    </Layout>
  );
};

export default Home;
