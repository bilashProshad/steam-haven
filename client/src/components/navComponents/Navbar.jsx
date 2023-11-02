import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import SearchBar from "./SearchBar";
import ProfileMenu from "./ProfileMenu";
import { useAuthContext } from "../../contexts/AuthContext";
import ProfileMenuSm from "./ProfileMenuSm";
import SearchBarSm from "./SearchBarSm";

const Navbar = () => {
  const { user } = useAuthContext();

  return (
    <Header>
      <LogoLink to={"/"}>
        <Logo src={logo} alt="Steam Haven Logo" />
      </LogoLink>

      <Nav>
        <NavLists>
          <NavItem>
            <NavLink to={"/"}>Browse</NavLink>
          </NavItem>
          {user && (
            <NavItem>
              <NavLink to={"/"}>Followed</NavLink>
            </NavItem>
          )}
        </NavLists>

        <NavLists>
          <NavItem>
            <SearchBar />
          </NavItem>
        </NavLists>

        <NavLists>
          <NavItem>
            <SearchBarSm />
          </NavItem>
          {/* <NavItem> */}
          <NavButton to={"/login"}>Login</NavButton>
          {/* </NavItem> */}
          {/* <NavItem> */}
          <NavButtonPrimary to={"/register"}>Register</NavButtonPrimary>
          {/* </NavItem> */}
          {/* <NavItem> */}
          {user && <ProfileMenu />}
          {/* </NavItem> */}
          <ProfileMenuSm />
        </NavLists>
      </Nav>
    </Header>
  );
};

export default Navbar;

const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 0 1rem;
  height: 5.5rem;
  gap: 2rem;
  background-color: ${(props) => props.theme.backgroundForm};
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 90;
`;

const LogoLink = styled(Link)`
  width: 4rem;
  height: 4rem;
  background-color: ${(props) => props.theme.primary};
  border-radius: 50%;
`;

const Logo = styled.img`
  width: 4rem;
  height: 4rem;
  object-fit: contain;
`;

const Nav = styled.nav`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavLists = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const NavItem = styled.li``;

const NavLink = styled(Link)`
  text-decoration: none;
  font-weight: 500;
  font-size: 1.8rem;
  color: ${(props) => props.theme.text};
  transition: color 0.3s ease;

  &:hover {
    color: ${(props) => props.theme.primaryHover};
  }
`;

const NavButton = styled(Link)`
  background-color: ${(props) => props.theme.btnBackground};
  padding: 0.8rem 2rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 500;
  color: ${(props) => props.theme.text};
  transition: all 0.3s ease;

  &:hover {
    background-color: hsl(0, 0%, 83%);
  }

  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const NavButtonPrimary = styled(NavButton)`
  background-color: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.textSecondary};

  &:hover {
    background-color: ${(props) => props.theme.primaryHover};
  }
`;