import styled from "styled-components";
import avatar from "../../assets/Profile.png";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../http";
import { ReactFlvPlayer } from "react-flv-player";

const Video = ({ channel }) => {
  const [followersCount, setFollowersCount] = useState(
    channel?.numberOfFollowers
  );
  const [isFollowing, setIsFollowing] = useState(channel.following);

  const handleFollow = async () => {
    try {
      await api.put(`/api/v1/channels/follow/${channel._id}`);
      setIsFollowing(true);
      setFollowersCount((prev) => prev + 1);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleUnfollow = async () => {
    try {
      await api.put(`/api/v1/channels/unfollow/${channel._id}`);
      setIsFollowing(false);
      setFollowersCount((prev) => prev - 1);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Container>
      <Stream>
        {channel.isOnline ? (
          <ReactFlvPlayer width="100%" height="100%" url={channel.streamUrl} />
        ) : (
          <Offline>Channel is offline</Offline>
        )}
      </Stream>
      <Description>
        <Title>{channel?.title}</Title>
        <Left>
          <Avatar src={avatar} alt={channel?.owner?.username} />
          <ChannelInfo>
            <Username>{channel?.owner?.username}</Username>
            <TotalFollowers>
              {followersCount} {followersCount <= 1 ? "Follower" : "Followers"}
            </TotalFollowers>
          </ChannelInfo>
          {!isFollowing ? (
            <Follow onClick={handleFollow}>Follow</Follow>
          ) : (
            <Following onClick={handleUnfollow}>Following</Following>
          )}
        </Left>
      </Description>
    </Container>
  );
};

export default Video;

const Container = styled.div`
  width: 100%;
`;

const Stream = styled.div`
  width: 100%;
`;

const Offline = styled.h2`
  background-color: #afabab;
  aspect-ratio: 16/9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 2vmax;
  color: #333;
`;

const Description = styled.div`
  margin-top: 1rem;
`;

const Title = styled.h3`
  font-weight: 500;
  margin-bottom: 1rem;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  width: 6.4rem;
  height: 6.4rem;
  border-radius: 50%;
`;

const ChannelInfo = styled.div`
  margin-left: 0.8rem;
  margin-right: 2rem;
`;

const Username = styled.h4`
  font-weight: 500;
`;

const TotalFollowers = styled.small``;

const Follow = styled.button`
  border: 1px solid ${(props) => props.theme.primary};
  background-color: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.textSecondary};
  padding: 0.8rem 1.2rem;
  border-radius: 50px;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.primaryHover};
  }
`;

const Following = styled.button`
  border: 2px solid ${(props) => props.theme.primary};
  background-color: inherit;
  color: ${(props) => props.theme.primary};
  font-weight: 500;
  padding: 0.8rem 1.2rem;
  border-radius: 50px;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.textSecondary};
  }
`;
