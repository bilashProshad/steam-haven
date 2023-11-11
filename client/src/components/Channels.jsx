import styled from "styled-components";
import ChannelCard from "./ChannelCard";

const Channels = ({ channelData = [] }) => {
  return (
    <>
      {channelData.length > 0 && (
        <Container>
          {channelData.map((channel) => (
            <ChannelCard
              key={channel._id}
              _id={channel._id}
              title={channel.title}
              username={channel.username}
              isOnline={channel.isOnline}
              // avatarUrl={channel.avatar}
              avatarUrl={
                "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&q=80&w=1957&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
            />
          ))}
        </Container>
      )}
      {channelData.length <= 0 && (
        <NotFoundContainer>
          <NotFoundText>No channels are available</NotFoundText>
        </NotFoundContainer>
      )}
    </>
  );
};

export default Channels;

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  row-gap: 2rem;

  @media screen and (max-width: 860px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }

  @media screen and (max-width: 600px) {
    padding: 1rem;
  }

  @media screen and (max-width: 310px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;

const NotFoundContainer = styled.div`
  text-align: center;
  width: 100%;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NotFoundText = styled.p`
  font-weight: 500;
  font-size: 2vmax;
  color: #777;
`;
