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
import { useEffect, useRef } from "react";

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

  const descriptionRef = useRef();
  useEffect(() => {
    descriptionRef.current.addEventListener("keyup", (e) => {
      descriptionRef.current.style.height = `auto`;
      let scHeight = e.target.scrollHeight;
      descriptionRef.current.style.height = `${scHeight}px`;
    });
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (titleError || titleError || descriptionError) {
      return;
    }

    if (title === "" || !title.includes("@")) {
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
  };

  return (
    <Layout>
      <Container>
        <Wrapper>
          <FormTitle title={"Settings"} logo={logo} href="/" />
          <Form onSubmit={submitHandler}>
            <FormGroup>
              <Label htmlFor="email">Title</Label>
              <Input
                type="email"
                id="email"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={isTitleTouched}
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
                required
              />
              {avatarUrlError && (
                <ErrorMessage>** Enter valid url</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">Description</Label>
              <TextArea
                type="text"
                id="avatarUrl"
                rows={4}
                ref={descriptionRef}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onBlur={isDescriptionTouched}
                required
              />
              {descriptionError && (
                <ErrorMessage>** Enter valid description</ErrorMessage>
              )}
            </FormGroup>

            <Button type="submit">Save Changes</Button>
          </Form>
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
    height: 100svh;
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
