import styled from "styled-components";
import logo from "../assets/logo.png";
import Button from "../components/Button";
import Form from "../components/Form";
import FormGroup from "../components/FormGroup";
import Input from "../components/Input";
import FormTitle from "../components/FormTitle";
import { useInputValidate } from "../hooks/useInputValidate";
import Layout from "../components/Layout";
import TextArea from "../components/TextArea";
import { useEffect, useRef, useState } from "react";
import api from "../http";
import { toast } from "react-toastify";

const Settings = () => {
  const [title, setTitle, titleError, setTitleError, isTitleTouched] =
    useInputValidate();
  const [
    avatarUrl,
    setAvatarUrl,
    avatarUrlError,
    setAvatarUrlError,
    isAvatarUrlTouched,
  ] = useInputValidate();
  const [
    description,
    setDescription,
    descriptionError,
    setDescriptionError,
    isDescriptionTouched,
  ] = useInputValidate();

  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);

  const [streamKey, setStreamKey] = useState("");

  const descriptionRef = useRef();
  useEffect(() => {
    descriptionRef.current.addEventListener("keyup", (e) => {
      descriptionRef.current.style.height = `auto`;
      let scHeight = e.target.scrollHeight;
      descriptionRef.current.style.height = `${scHeight}px`;
    });
  }, []);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await api.get("/api/v1/settings/channel");
        setTitle(data.channel.title);
        setDescription(data.channel.description);
        setStreamKey(data.channel.streamKey);
      } catch (error) {
        toast.error(error.response.data);
        toast.error(error.response.data?.message);
      }
    };

    fetchSettings();
  }, [setDescription, setTitle]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (titleError || titleError || descriptionError) {
      return;
    }

    if (title === "") {
      setTitleError(true);
      return;
    }

    if (avatarUrl === "") {
      setAvatarUrlError(true);
      return;
    }

    if (description === "") {
      setDescriptionError(true);
      return;
    }

    try {
      setLoading(true);
      await api.put("/api/v1/settings/channel", {
        title,
        description,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data);
      toast.error(error.response.data?.message);
    }
  };

  return (
    <Layout>
      <Container>
        <Wrapper>
          <FormTitle logo={logo} />
          <StreamKeyContainer>
            <StreamKeyTitle>Stream Key</StreamKeyTitle>
            <StreamKey>{streamKey}</StreamKey>
          </StreamKeyContainer>

          <Form onSubmit={submitHandler}>
            <FormGroup>
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={isTitleTouched}
                disabled={!edit}
                required
              />
              {titleError && (
                <ErrorMessage>** Enter a valid Title</ErrorMessage>
              )}
            </FormGroup>
            <FormGroup>
              <Label htmlFor="email">Avatar Url</Label>
              <Input
                type="text"
                id="avatarUrl"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                onBlur={isAvatarUrlTouched}
                disabled={!edit}
                required
              />
              {avatarUrlError && (
                <ErrorMessage>** Enter valid url</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="description">Description</Label>
              <TextArea
                type="text"
                id="description"
                rows={4}
                ref={descriptionRef}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onBlur={isDescriptionTouched}
                disabled={!edit}
                required
              />
              {descriptionError && (
                <ErrorMessage>** Enter valid description</ErrorMessage>
              )}
            </FormGroup>

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
          {!edit && <Button onClick={() => setEdit(true)}>Edit</Button>}
        </Wrapper>
      </Container>
    </Layout>
  );
};

export default Settings;

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

const StreamKeyContainer = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  margin-top: 1rem;
`;

const StreamKeyTitle = styled.h2``;

const StreamKey = styled.span``;
