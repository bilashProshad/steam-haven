import styled from "styled-components";
import ChannelCard from "./ChannelCard";

const channelData = [
  {
    _id: 1,
    title: "Test 1",
    username: "Bilash",
    avatar:
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&q=80&w=1957&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isOnline: false,
  },
  {
    _id: 2,
    title: "Test 2",
    username: "John",
    avatar:
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&q=80&w=1957&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isOnline: true,
  },
  {
    _id: 3,
    title: "Test 3",
    username: "Joyee",
    avatar:
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&q=80&w=1957&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isOnline: false,
  },
  {
    _id: 4,
    title: "Test 4",
    username: "Max",
    avatar:
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&q=80&w=1957&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isOnline: false,
  },
  {
    _id: 5,
    title: "Test 5",
    username: "Mimi",
    avatar:
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&q=80&w=1957&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isOnline: true,
  },
  {
    _id: 6,
    title: "Test 6",
    username: "Jack",
    avatar:
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&q=80&w=1957&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isOnline: true,
  },
];

const Channels = () => {
  return (
    <Container>
      {channelData.map((channel) => (
        <ChannelCard
          key={channel._id}
          _id={channel._id}
          title={channel.title}
          username={channel.username}
          isOnline={channel.isOnline}
          avatarUrl={channel.avatar}
        />
      ))}
    </Container>
  );
};

export default Channels;

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;

  @media screen and (max-width: 860px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }

  @media screen and (max-width: 310px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;
