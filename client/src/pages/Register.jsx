import styled from "styled-components";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Form from "../components/Form";
import FormGroup from "../components/FormGroup";
import Input from "../components/Input";
import FormTitle from "../components/FormTitle";
import { useInputValidate } from "../hooks/useInputValidate";
import { useState } from "react";

const Register = () => {
  const [
    username,
    setUsername,
    usernameError,
    setUsernameError,
    isUsernameTouched,
  ] = useInputValidate();
  const [email, setEmail, emailError, setEmailError, isEmailTouched] =
    useInputValidate();
  const [
    password,
    setPassword,
    passwordError,
    setPasswordError,
    isPasswordTouched,
  ] = useInputValidate();
  const [
    confirmPassword,
    setConfirmPassword,
    confirmPasswordError,
    setConfirmPasswordError,
    isConfirmPasswordTouched,
  ] = useInputValidate();

  const [matchPassword, setMatchPassword] = useState(true);

  const submitHandler = (e) => {
    e.preventDefault();

    if (usernameError || emailError || passwordError || confirmPasswordError) {
      return;
    }

    if (username === "") {
      setUsernameError(true);
      return;
    }

    if (email === "") {
      setEmailError(true);
      return;
    }

    if (password === "") {
      setPasswordError(true);
      return;
    }

    if (confirmPassword === "") {
      setConfirmPasswordError(true);
      return;
    }

    if (password !== confirmPassword) {
      setMatchPassword(false);
      return;
    }
  };

  return (
    <Container>
      <Wrapper>
        <FormTitle title={"Register"} logo={logo} href="/" />
        <Form onSubmit={submitHandler}>
          <FormGroup>
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={isUsernameTouched}
              required
            />
            {usernameError && (
              <ErrorMessage>** Enter you username</ErrorMessage>
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
              required
            />
            {emailError && <ErrorMessage>** Enter a valid email</ErrorMessage>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={isPasswordTouched}
              required
            />
            {passwordError && (
              <ErrorMessage>** Enter your password</ErrorMessage>
            )}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={isConfirmPasswordTouched}
              required
            />
            {passwordError && (
              <ErrorMessage>** Enter your password</ErrorMessage>
            )}
            {!matchPassword && (
              <ErrorMessage>
                ** Password and confirm password must be same
              </ErrorMessage>
            )}
          </FormGroup>
          <RegisterLink to={"/login"}>Have an account?</RegisterLink>
          <Button type="submit">Log in</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;

const Container = styled.div`
  height: 100svh;
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

const RegisterLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.text};
`;

const ErrorMessage = styled.span`
  position: absolute;
  color: ${(props) => props.theme.danger};
  bottom: -2rem;

  @media screen and (max-width: 400px) {
    font-size: 1.4rem;
  }

  @media screen and (max-width: 345px) {
    font-size: 1.2rem;
    bottom: -1.8rem;
  }
`;
