import React from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../../store/session";


import "./ProfilePage.css"


function ProfilePage() {

  const dispatch = useDispatch();
	const history = useHistory();
	const sessionUser = useSelector(state => state.session.user);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push("/");
  };

  return (
    <main className='mainUser'>
      <section className='userSideBarContainer'>
        <span>
          <div>
            Welcome,
          </div>
          <div>
            {sessionUser.firstName}
          </div>

        </span>
        <div className='userSideBarList'>
          <button className='userSideBarButtons'>Overview</button>
          <hr className='userSideBarBreaks'></hr>
          <button className='userSideBarButtons'>My Orders</button>
          <hr className='userSideBarBreaks'></hr>
          <button className='userSideBarButtons'>Billing & Shipping</button>
          <hr className='userSideBarBreaks'></hr>
          <button className='userSideBarButtons'>Account Settings</button>
          <hr className='userSideBarBreaks'></hr>
          <button className='userSideBarButtons'
          onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </section>
      <section>

      </section>

    </main>

  )
}

export default ProfilePage
