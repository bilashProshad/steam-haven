import styled from "styled-components";
import { useEffect, useState } from "react";
import Backdrop from "../Backdrop";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import { RxPerson } from "react-icons/rx";
import { useAuthContext } from "../../contexts/AuthContext";
import api from "../../http";
import {
  CLEAR_ERROR,
  LOGOUT_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
} from "../../contexts/constants/AuthConstant";
import { toast } from "react-toastify";

const ProfileMenuSm = ({ avatar }) => {
  const [showMenu, setShowMenu] = useState(false);

  const { user, dispatch, error } = useAuthContext();

  const showMenuHandler = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: CLEAR_ERROR });
    }
  }, [error, dispatch]);

  const handleLogout = async () => {
    try {
      dispatch({ type: LOGOUT_REQUEST });
      await api.get("/api/v1/auth/logout");
      dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
      dispatch({ type: LOGOUT_FAILED, payload: error.response.data.message });
    }
  };

  return (
    <Profile onClick={showMenuHandler}>
      {user && (
        <ProfileImgContainer>
          <ProfileImg src={avatar} alt="profile photo" />
        </ProfileImgContainer>
      )}

      {!user && (
        <ProfileIcon>
          <RxPerson />
        </ProfileIcon>
      )}

      {showMenu &&
        createPortal(
          <MenuList>
            {!user && (
              <>
                <MenuItem>
                  <MenuLink to={"/login"}>Login</MenuLink>
                </MenuItem>
                <MenuItem>
                  <MenuLink to={"/register"}>Register</MenuLink>
                </MenuItem>
              </>
            )}
            {user && (
              <>
                <MenuItem>
                  <MenuLink to={"/profile"}>Profile</MenuLink>
                </MenuItem>
                <MenuItemSM>
                  <MenuLink to={"/browse"}>Browse</MenuLink>
                </MenuItemSM>
                <MenuItemSM>
                  <MenuLink to={"/followed"}>Followed</MenuLink>
                </MenuItemSM>
                <MenuItem>
                  <MenuLink to={"/settings"}>Settings</MenuLink>
                </MenuItem>
                <MenuItem>
                  <MenuButton onClick={handleLogout}>Logout</MenuButton>
                </MenuItem>
              </>
            )}
          </MenuList>,
          document.getElementById("overlays")
        )}

      {showMenu && (
        <Backdrop style={{ zIndex: 91 }} onClick={showMenuHandler} />
      )}
    </Profile>
  );
};

export default ProfileMenuSm;

const Profile = styled.button`
  background: transparent;
  border: none;
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
`;

const ProfileImgContainer = styled.div`
  position: relative;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 92;

  &:hover {
    filter: brightness(0.8);
  }
`;

const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const ProfileIcon = styled.div`
  position: relative;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  color: ${(props) => props.theme.text};
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 92;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.4rem;
  transition: color 0.3s ease;

  &:hover {
    color: ${(props) => props.theme.primaryHover};
  }

  > svg {
    stroke-width: 0.5px;
  }
`;

const MenuList = styled.ul`
  position: absolute;
  background-color: ${(props) => props.theme.backgroundForm};
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  top: 5rem;
  right: 1rem;
  list-style: none;
  padding: 1.5rem 3rem;
  z-index: 92;
`;

const MenuItem = styled.li`
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const MenuItemSM = styled(MenuItem)`
  display: none;
  @media screen and (max-width: 450px) {
    display: block;
  }
`;

const MenuLink = styled(Link)`
  text-decoration: none;
  font-weight: 500;
  font-size: 1.8rem;
  color: ${(props) => props.theme.text};
  transition: color 0.3s ease;

  &:hover {
    color: ${(props) => props.theme.primaryHover};
  }
`;

const MenuButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0.8rem 1.2rem;
  font-weight: 500;
  font-size: 1.6rem;
  border-radius: 5px;
  border: none;
  background-color: ${(props) => props.theme.danger};
  color: ${(props) => props.theme.textSecondary};
  transition: all 0.3s ease-in;
  cursor: pointer;

  &:hover {
    background-color: hsl(4.105263157894738, 89.62264150943399%, 40%);
  }
`;
