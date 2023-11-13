import styled from "styled-components";
import { Link } from "react-router-dom";
import avatar from "../../assets/profile-1.jpg";

const FollowedChannel = ({ data, collapse }) => {
  return (
    <Container to={`/${data._id}`}>
      <Left>
        <Avatar src={avatar} />
        {!collapse && <Username>{data?.owner?.username}</Username>}
      </Left>
      {/* --- */}
      {!collapse && <Right>{data.isOnline ? <Online /> : <Offline />}</Right>}
    </Container>
  );
};

export default FollowedChannel;

const Container = styled(Link)`
  display: flex;
  text-decoration: none;
  justify-content: space-between;
  transition: all 0.3s;
  padding: 1rem;
  border-radius: 5px;
  color: ${(props) => props.theme.text};

  &:hover {
    background-color: ${(props) => props.theme.btnBackground};
  }
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Avatar = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
`;

const Username = styled.h4`
  font-weight: 500;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
