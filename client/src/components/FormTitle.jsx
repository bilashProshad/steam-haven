import styled from "styled-components";
import { Link } from "react-router-dom";

const FormTitle = ({ logo, title, href = "/" }) => {
  return (
    <TitleWrapper>
      <Title to={href}>
        {logo && <Logo src={logo} alt="Logo" />}
        <TitleText>{title}</TitleText>
      </Title>
    </TitleWrapper>
  );
};

export default FormTitle;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
`;

const Logo = styled.img`
  width: 6rem;
  height: 6rem;
  background-color: ${(props) => props.theme.primary};
  border-radius: 50%;
`;

const TitleText = styled.h2`
  font-size: 3rem;
  color: ${(props) => props.theme.text};
`;
