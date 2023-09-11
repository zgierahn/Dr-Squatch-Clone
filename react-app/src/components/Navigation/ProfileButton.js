import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { login } from "../../store/session";

function ProfileButton({ user }) {

  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push("/");
    setShowMenu(false);
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);




  return (
    <>
      <button className="userProfileButton" onClick={openMenu}>
        Login
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <span className="userDropdown">
            <div>Welcome, {user.firstName}!</div>
            <div>{user.email}</div>
            <div>
              <button className="userProfileButton"
              onClick={handleLogout}>Log Out</button>
            </div>
          </span>
        ) : (
          <>
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
            <button className="userProfileButton" onClick={async () => {
                await dispatch(login('demo@aa.io', "password")).then(closeMenu)
            }} >
                Demo User
            </button>
            <button className="userProfileButton" onClick={async () => {
                await dispatch(login('marnie@aa.io', "password")).then(closeMenu)
            }} >
                Demo User 2
            </button>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
