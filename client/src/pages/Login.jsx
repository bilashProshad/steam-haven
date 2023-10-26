import styled from "styled-components";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Form from "../components/Form";
import FormGroup from "../components/FormGroup";
import Input from "../components/Input";
import FormTitle from "../components/FormTitle";
import { useInputValidate } from "../hooks/useInputValidate";
import { useAuthContext } from "../contexts/AuthContext";
import {
  CLEAR_ERROR,
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
} from "../contexts/constants/AuthConstant";
import api from "../http";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail, emailError, setEmailError, isEmailTouched] =
    useInputValidate();
  const [
    password,
    setPassword,
    passwordError,
    setPasswordError,
    isPasswordTouched,
  ] = useInputValidate();

  const { loading, error, dispatch } = useAuthContext();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: CLEAR_ERROR });
    }
  }, [error, dispatch]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (passwordError || emailError) {
      return;
    }

    if (email === "" || !email.includes("@")) {
      setEmailError(true);
      return;
    }

    if (password === "") {
      setPasswordError(true);
      return;
    }

    try {
      dispatch({ type: LOGIN_REQUEST });
      const { data } = await api.post(`/api/v1/auth/login`, {
        email,
        password,
      });
      dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({ type: LOGIN_FAILED, payload: error.response.data });
    }
  };

  return (
    <>
      <Container>
        <Wrapper>
          <FormTitle title={"Login"} logo={logo} href="/" />
          <Form onSubmit={submitHandler}>
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
              {emailError && (
                <ErrorMessage>** Enter a valid email</ErrorMessage>
              )}
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
            <RegisterLink to={"/register"}>
              Don&apos;t have an account?
            </RegisterLink>
            <Button type="submit" disabled={loading} loading={loading}>
              Login
            </Button>
          </Form>
        </Wrapper>
      </Container>
    </>
  );
};

export default Login;

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
`;
