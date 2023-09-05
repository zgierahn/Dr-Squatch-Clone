import React from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../../store/session";
import SteinPipe from "../../images/Dr-Stein-pipe-logo.png"


import "./ProfilePage.css"


function ProfilePage() {

  const dispatch = useDispatch();
	const history = useHistory();
  const { type } = useParams();
	const sessionUser = useSelector(state => state.session.user);
console.log("THIS IS TYPE", type);
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push("/");
  };

  return (
    <main className='mainUser'>
      <section className='userSideBarContainer'>
        <span className='welcomeContainer'>
          <img className="userSteinPipeImg" src={SteinPipe} alt='Frankenstein smoking a pipe'/>
          <span className='welcomeSpan'>
            <div>
              Welcome,
            </div>
            <div>
              {sessionUser.firstName}
            </div>
          </span>

        </span>
        <div className='userSideBarList'>
          <button className='userSideBarButtons'
            onClick={()=>{history.push("/account/1/overview")}}>
            Overview
          </button>
          <hr className='userSideBarBreaks'></hr>
          <button className='userSideBarButtons'
             onClick={()=>{history.push("/account/1/orders")}}>
            My Orders
          </button>
          <hr className='userSideBarBreaks'></hr>
          <button className='userSideBarButtons'
             onClick={()=>{history.push("/account/1/address")}}>
            Billing & Shipping
          </button>
          <hr className='userSideBarBreaks'></hr>
          <button className='userSideBarButtons'
             onClick={()=>{history.push("/account/1/settings")}}>
            Account Settings
          </button>
          <hr className='userSideBarBreaks'></hr>
          <button className='userSideBarButtons'
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </section>
      {type === "overview" &&
        <section className='profileContainer'>
          <h1>
            OVERVIEW
          </h1>
          <span>
            <h3>
              Loyalty Status
            </h3>
            <div>

            </div>
          </span>
          <span>
            <h3>
              Recent Orders
            </h3>
            <div>

            </div>
          </span>
          <span>
            <h3>
              Join the Pack
            </h3>
            <div>

            </div>
          </span>

        </section>
      }
      <section>

      </section>

    </main>

  )
}

export default ProfilePage
