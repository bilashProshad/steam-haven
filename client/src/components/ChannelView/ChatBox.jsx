import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const messages = [
  { _id: 1, username: "Bilash", text: "hello" },
  { _id: 2, username: "John", text: "hi" },
  { _id: 3, username: "Joyee", text: "hey" },
  { _id: 4, username: "Max", text: "Hey guys. How are you doing?" },
];

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const textAreaRef = useRef();

  const cancelHandler = () => {};

  useEffect(() => {
    textAreaRef.current.addEventListener("keyup", (e) => {
      textAreaRef.current.style.height = `auto`;
      let scHeight = e.target.scrollHeight;
      textAreaRef.current.style.height = `${scHeight}px`;
    });
  }, []);

  return (
    <Container>
      <MessageContainer>
        {messages.map((msg) => (
          <Message key={msg._id}>
            <Username>{msg.username}:</Username>
            <Text>{msg.text}</Text>
          </Message>
        ))}
      </MessageContainer>
      <Form>
        <Input
          ref={textAreaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Send a message"
        />
        {message.length > 0 && (
          <Buttons>
            <CancelButton onClick={cancelHandler}>Cancel</CancelButton>
            <SendButton>Send</SendButton>
          </Buttons>
        )}
      </Form>
    </Container>
  );
};

export default ChatBox;

const Container = styled.div`
  background-color: #fff;
  width: 40rem;
  height: calc(100vh - 8rem);
  position: sticky;
  right: 0;
  /* top: rem; */
  box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1rem;
  overflow-y: auto;
`;

const MessageContainer = styled.div`
  overflow-y: auto;
  /* width */
  &::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    /* background: #f1f1f1; */
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.btnBackground};
    border-radius: 10px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const Message = styled.div`
  margin-bottom: 1.2rem;
  transition: all 0.3s;
  padding: 0.5rem;
  border-radius: 5px;

  &:hover {
    background-color: ${(props) => props.theme.btnBackground};
  }
`;

const Username = styled.span`
  font-weight: 500;
  display: inline-block;
  margin-right: 1rem;
`;

const Text = styled.span``;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.textarea`
  color: ${(props) => props.theme.text};
  resize: none;
  padding-left: 1rem;
  padding-top: 1rem;
  border-radius: 0.5rem;
  line-height: 1.3;
  max-height: 10rem;
  transition: all 0.3s ease;

  &:focus {
    outline: 2px solid ${(props) => props.theme.primary};
  }
`;

const Buttons = styled.div`
  align-self: flex-end;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SendButton = styled.button`
  border: none;
  border: 1px solid ${(props) => props.theme.primary};
  background-color: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.textSecondary};
  padding: 0.8rem 1.2rem;
  border-radius: 50px;
  font-weight: 500;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.primaryHover};
  }
`;

const CancelButton = styled.button`
  border: none;
  background: inherit;
  color: ${(props) => props.theme.danger};
  padding: 0.8rem 1.2rem;
  border-radius: 50px;
  font-weight: 500;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.danger};
    color: ${(props) => props.theme.textSecondary};
  }
`;
