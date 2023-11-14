import styled from "styled-components";
import avatar from "../assets/Profile.png";
import Button from "../components/Button";
import Form from "../components/Form";
import FormGroup from "../components/FormGroup";
import Input from "../components/Input";
import { useInputValidate } from "../hooks/useInputValidate";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import {
  CLEAR_ERROR,
  UPDATE_PROFILE_FAILED,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
} from "../contexts/constants/AuthConstant";
import api from "../http";

const Profile = () => {
  const { user, error, dispatch, loading } = useAuthContext();

  const [
    username,
    setUsername,
    usernameError,
    setUsernameError,
    isUsernameTouched,
  ] = useInputValidate(user?.username);
  const [email, setEmail, emailError, setEmailError, isEmailTouched] =
    useInputValidate(user?.email);

  const [edit, setEdit] = useState(false);

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(avatar);

  useEffect(() => {
    if (user && user.avatar && user.avatar.public_id) {
      setImagePreview(user.avatar.url);
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      toast.error(error.data);
      toast.error(error.data?.message);
      dispatch({ type: CLEAR_ERROR });
    }
  }, [error, dispatch]);

  useEffect(() => {
    async function updateImage(myForm) {
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      };
      try {
        dispatch({ type: UPDATE_PROFILE_REQUEST });
        const { data } = await api.put(`/api/v1/user/avatar`, myForm, config);
        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.user });
        toast.success("The user updated successfully.");
      } catch (error) {
        dispatch({ type: UPDATE_PROFILE_FAILED, payload: error.response });
      }
    }

    if (image) {
      const myForm = new FormData();
      myForm.append("image", image);
      updateImage(myForm);
    }
  }, [image, dispatch]);

  const setImageFile = (e) => {
    setImage(e.target.files[0]);
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImagePreview(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

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

    try {
      dispatch({ type: UPDATE_PROFILE_REQUEST });
      const { data } = await api.put(`/api/v1/user/me`, {
        username,
        email,
      });
      dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.user });
      toast.success("User updated successfully");
      setEdit(false);
    } catch (error) {
      dispatch({ type: UPDATE_PROFILE_FAILED, payload: error.response });
    }
  };

  return (
    <Layout>
      <Container>
        <Wrapper>
          <AvatarLabel htmlFor="avatar">
            <Avatar src={imagePreview} alt={user?.username} />
            <AvatarInput
              type="file"
              id="avatar"
              name="image"
              accept="image/*"
              onChange={setImageFile}
            />
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

            {edit && (
              <Button loading={loading} disabled={loading} type="submit">
                Update
              </Button>
            )}
          </Form>
          {edit && (
            <Button
              disabled={loading}
              color="danger"
              onClick={() => setEdit(false)}
            >
              Cancel
            </Button>
          )}
          {!edit && (
            <Button
              loading={loading}
              disabled={loading}
              onClick={() => setEdit(true)}
            >
              Edit
            </Button>
          )}
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
