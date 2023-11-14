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
import placeHolderThumbnail from "../assets/thumbnail.jpg";

const Settings = () => {
  const [title, setTitle, titleError, setTitleError, isTitleTouched] =
    useInputValidate();

  const [
    description,
    setDescription,
    descriptionError,
    setDescriptionError,
    isDescriptionTouched,
  ] = useInputValidate();

  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(placeHolderThumbnail);

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
        if (data.channel.thumbnail && data.channel.thumbnail.public_id) {
          setImagePreview(data.channel.thumbnail.url);
        }
      } catch (error) {
        toast.error(error.response.data);
        toast.error(error.response.data?.message);
      }
    };

    fetchSettings();
  }, [setDescription, setTitle]);

  useEffect(() => {
    async function updateImage(myForm) {
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      };
      try {
        setLoading(true);
        await api.put(`/api/v1/settings/thumbnail`, myForm, config);
        setLoading(false);
        toast.success("The user updated successfully.");
      } catch (error) {
        toast.error(error.response.data);
        toast.error(error.response.data?.message);
        setLoading(false);
      }
    }

    if (image) {
      const myForm = new FormData();
      myForm.append("image", image);
      updateImage(myForm);
    }
  }, [image]);

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

    if (titleError || titleError || descriptionError) {
      return;
    }

    if (title === "") {
      setTitleError(true);
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
      setEdit(false);
      toast.success("Settings are updated");
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
              <Label>
                <ThumbnailTitle>Thumbnail</ThumbnailTitle>
                <Thumbnail src={imagePreview} alt="thumbnail" />
                <ThumbnailInput
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={setImageFile}
                />
              </Label>
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
  width: 100%;
  position: relative;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
  transition: all 0.3s;

  &:hover {
    opacity: 0.7;
  }
`;

const ThumbnailTitle = styled.p`
  /* position: absolute; */
  z-index: 1;
`;

const ThumbnailInput = styled.input`
  display: none;
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
