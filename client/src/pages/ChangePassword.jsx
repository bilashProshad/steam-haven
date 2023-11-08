import styled from "styled-components";
import logo from "../assets/logo.png";
import Button from "../components/Button";
import Form from "../components/Form";
import FormGroup from "../components/FormGroup";
import Input from "../components/Input";
import FormTitle from "../components/FormTitle";
import { useInputValidate } from "../hooks/useInputValidate";
import Layout from "../components/Layout";
import { useState } from "react";
import api from "../http";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const [
    oldPassword,
    setOldPassword,
    oldPasswordError,
    setOldPasswordError,
    isOldPasswordTouched,
  ] = useInputValidate();
  const [
    newPassword,
    setNewPassword,
    newPasswordError,
    setNewPasswordError,
    isNewPasswordTouched,
  ] = useInputValidate();
  const [
    confirmPassword,
    setConfirmPassword,
    confirmPasswordError,
    setConfirmPasswordError,
    isConfirmPasswordTouched,
  ] = useInputValidate();

  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (oldPasswordError || confirmPasswordError) {
      return;
    }

    if (oldPassword === "") {
      setOldPasswordError(true);
      return;
    }

    if (confirmPassword === "") {
      setConfirmPasswordError(true);
      return;
    }

    if (newPassword === "") {
      setNewPasswordError(true);
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New Password & Confirm Password must be same");
      return;
    }

    try {
      setLoading(true);
      const { data } = await api.patch("/api/v1/user/password", {
        oldPassword,
        newPassword,
        confirmPassword,
      });
      if (data.success) {
        toast.success("Password updated successfully");
        setLoading(false);
        setConfirmPassword("");
        setNewPassword("");
        setOldPassword("");
        return;
      }
      toast.error("Something went wrong. Try again later.");
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data);
      toast.error(error.response.data?.message);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Container>
        <Wrapper>
          <FormTitle title={"Change"} logo={logo} href="/" />
          <Form onSubmit={submitHandler}>
            <FormGroup>
              <Label htmlFor="password">Old Password</Label>
              <Input
                type="password"
                id="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                onBlur={isOldPasswordTouched}
                required
              />
              {oldPasswordError && (
                <ErrorMessage>** Enter your old password</ErrorMessage>
              )}
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">New Password</Label>
              <Input
                type="password"
                id="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                onBlur={isNewPasswordTouched}
                required
              />
              {newPasswordError && (
                <ErrorMessage>** Enter your new password</ErrorMessage>
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
              {confirmPasswordError && (
                <ErrorMessage>** Enter your password</ErrorMessage>
              )}
            </FormGroup>

            <Button loading={loading} disabled={loading} type="submit">
              Update
            </Button>
          </Form>
        </Wrapper>
      </Container>
    </Layout>
  );
};

export default ChangePassword;

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
  /* font-size: 1.2rem; */
`;
