import styled from "styled-components";
import FollowedChannel from "./FollowedChannel";

const FollowedChannelsList = ({ data = [], collapse }) => {
  return (
    <>
      <Channels>
        {data.length > 0 &&
          data.map((channel) => (
            <FollowedChannel
              key={channel._id}
              data={channel}
              collapse={collapse}
            />
          ))}
      </Channels>
    </>
  );
};

export default FollowedChannelsList;

const Channels = styled.div`
  display: flex;
  flex-direction: column;
  /* gap: 1.2rem; */
`;
