import styled from "styled-components";
import avatar from "../../assets/profile-1.jpg";

const channelData = {
  _id: 1,
  title: "Test 1",
  username: "Bilash",
  avatar:
    "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&q=80&w=1957&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  isOnline: false,
};

const Video = () => {
  return (
    <Container>
      <Stream>This is Video</Stream>
      <Description>
        <Title>{channelData.title}</Title>
        <Left>
          <Avatar src={avatar} alt={channelData.username} />
          <ChannelInfo>
            <Username>{channelData.username}</Username>
            <TotalFollowers>1000 Followers</TotalFollowers>
          </ChannelInfo>
          <Follow>Follow</Follow>
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
  background-color: #afabab;
  width: 100%;
  aspect-ratio: 16/9;
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
  border: none;
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
