import styled from "styled-components";
import avatar from "../assets/profile-1.jpg";
import Button from "../components/Button";
import Form from "../components/Form";
import FormGroup from "../components/FormGroup";
import Input from "../components/Input";
import { useInputValidate } from "../hooks/useInputValidate";
import Layout from "../components/Layout";
import { useState } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const [
    username,
    setUsername,
    usernameError,
    setUsernameError,
    isUsernameTouched,
  ] = useInputValidate();
  const [email, setEmail, emailError, setEmailError, isEmailTouched] =
    useInputValidate();

  const [edit, setEdit] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (usernameError || emailError) {
      return;
    }

    if (username === "") {
      setUsernameError(true);
      return;
    }

    if (email === "" || !email.includes("@")) {
      setEmailError(true);
      return;
    }
  };

  return (
    <Layout>
      <Container>
        <Wrapper>
          <AvatarLabel htmlFor="avatar">
            <Avatar src={avatar} alt="avatar" />
            <AvatarInput type="file" id="avatar" name="image" />
          </AvatarLabel>
          <Form onSubmit={submitHandler}>
            <FormGroup>
              <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onBlur={isUsernameTouched}
                disabled={!edit}
                required
              />
              {usernameError && (
                <ErrorMessage>** Enter a valid Username</ErrorMessage>
              )}
            </FormGroup>
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={isEmailTouched}
                disabled={!edit}
                required
              />
              {emailError && (
                <ErrorMessage>** Enter a valid email</ErrorMessage>
              )}
            </FormGroup>

            <A to={`/profile/password/change`}>Change Your Password?</A>

            {edit && <Button type="submit">Update</Button>}
          </Form>
          {edit && (
            <Button color="danger" onClick={() => setEdit(false)}>
              Cancel
            </Button>
          )}
          {!edit && <Button onClick={() => setEdit(true)}>Edit</Button>}
        </Wrapper>
      </Container>
    </Layout>
  );
};

export default Profile;

const Container = styled.div`
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 600px) {
    height: initial;
    display: initial;
  }
`;

const Wrapper = styled.div`
  background: ${(props) => props.theme.backgroundForm};
  width: 40rem;
  padding: 3rem 1.6rem;
  border-radius: 0.5rem;
  box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 600px) {
    padding-top: 5rem;
    height: calc(100svh - 8rem);
    width: 100%;
    border-radius: 0;
  }
`;

const Label = styled.label`
  font-size: 1.6rem;
  cursor: pointer;
`;

const ErrorMessage = styled.span`
  position: absolute;
  color: ${(props) => props.theme.danger};
  bottom: -2rem;
`;

const AvatarLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

const Avatar = styled.img`
  width: 15rem;
  height: 15rem;
  border-radius: 50%;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    filter: brightness(0.8);
  }
`;

const AvatarInput = styled.input`
  display: none;
`;

const A = styled(Link)`
  color: ${(props) => props.theme.primary};
  text-decoration: none;
  display: inline-block;
  margin-bottom: 0.5rem;
`;
