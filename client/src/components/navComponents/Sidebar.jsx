import styled from "styled-components";
import { useAuthContext } from "../../contexts/AuthContext";
import { GoSidebarCollapse } from "react-icons/go";
import { useEffect, useState } from "react";
import FollowedChannelsList from "./FollowedChannelsList";
import { toast } from "react-toastify";
import api from "../../http";

const Sidebar = () => {
  const [collapse, setCollapse] = useState(false);
  const [loading, setLoading] = useState(true);
  const [channels, setChannels] = useState([]);

  const { user } = useAuthContext();

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const { data } = await api.get("/api/v1/channels/followed");
        setChannels(data.channels);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data.message);
      }
    };

    if (user) {
      fetchChannels();
    }
  }, [user]);

  const collapseHandler = () => {
    setCollapse((prev) => !prev);
  };

  return (
    <SidebarContainer>
      <Wrapper collapse={collapse}>
        <Collapse collapse={collapse}>
          <CollapseText collapse={collapse}>
            {user ? "Followed Channels" : "Recommended Channels"}
          </CollapseText>
          <CollapseButton onClick={collapseHandler}>
            <GoSidebarCollapse />
          </CollapseButton>
        </Collapse>
        {!loading && (
          <FollowedChannelsList data={channels} collapse={collapse} />
        )}
      </Wrapper>
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = styled.aside`
  height: calc(100vh - 5.5rem);
  position: sticky;
  left: 0;
  top: 5.5rem;
  box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Wrapper = styled.div`
  padding: ${(props) => (props.collapse ? "0" : "1rem")};
  padding-left: ${(props) => (props.collapse ? "1rem" : "1rem")};
`;

const Collapse = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: ${(props) => (props.collapse ? "center" : "space-between")};
  gap: 2rem;
  margin-bottom: 1.6rem;
  transition: all 0.4s;
`;

const CollapseText = styled.h5`
  width: ${(props) => (props.collapse ? 0 : "max-content")};
  text-transform: uppercase;
  font-weight: 500;
  overflow: hidden;
  transition: all 0.4s;
`;

const CollapseButton = styled.button`
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  font-size: 1.8rem;
  transform: translateX(${(props) => (props.collapse ? "0" : "-1rem")});
  cursor: pointer;
`;
