import styled from "styled-components";
import avatar from "../assets/Profile.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import placeholderThumbnail from "../assets/thumbnail.jpg";

const ChannelCard = ({ channel }) => {
  const [imagePreview, setImagePreview] = useState(placeholderThumbnail);
  const [avatarPreview, setAvatarPreview] = useState(avatar);

  useEffect(() => {
    if (channel.thumbnail && channel.thumbnail.public_id) {
      setImagePreview(channel.thumbnail.url);
    }
  }, [channel]);

  useEffect(() => {
    if (channel.owner.avatar && channel.owner.avatar.public_id) {
      setAvatarPreview(channel.owner.avatar.url);
    }
  }, [channel]);

  return (
    <Card to={`/channel/${channel._id}`}>
      <Thumbnail src={imagePreview} alt={channel?.title} />
      <Details>
        <Left>
          <Avatar src={avatarPreview} alt={channel?.owner?.username} />
          <Info>
            <Title>{channel?.title}</Title>
            <Username>{channel?.owner?.username}</Username>
          </Info>
        </Left>
        <Right>{channel?.isOnline ? <Online /> : <Offline />}</Right>
      </Details>
    </Card>
  );
};

export default ChannelCard;

const Card = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.text};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  /* gap: 1rem; */
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 20rem;
  object-fit: cover;
  transition: all 0.4s;

  &:hover {
    scale: 1.05;
  }
`;

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
`;

const Left = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Avatar = styled.img`
  width: 4rem;
  height: 4rem;
  object-fit: cover;
  border-radius: 50%;
`;

const Info = styled.div``;

const Title = styled.h4`
  font-weight: 500;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Username = styled.small``;

const Right = styled.div`
  display: flex;
  align-items: center;
`;

const Online = styled.div`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: #02b802;
`;

const Offline = styled.div`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: #e60202;
`;
