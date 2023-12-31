import React from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../../store/session";
import ConfirmDeleteAccountModal from '../MyModals/ConfirmDeleteAccountModal';
import ConfirmDeleteAddressModal from '../MyModals/ConfirmDeleteAddressModal';
import EditUserModal from '../MyModals/EditUserModal';
import AddressModal from '../MyModals/AddressModal';
import SteinPipe from "../../images/Dr-Stein-pipe-logo.png"


import "./ProfilePage.css"
import ConfirmProfileImg from '../MyModals/ConfirmProfileImg';


function ProfilePage() {

  const dispatch = useDispatch();
	const history = useHistory();
  const { type } = useParams();
	const sessionUser = useSelector(state => state.session.user);
  const billingAddresses = sessionUser.addresses?.filter((address)=>{ return (address.category === "billing" || address.category === "both" )})
  const shippingAddresses = sessionUser.addresses?.filter((address)=>{ return (address.category === "shipping" || address.category === "both" )})

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push("/");
  };


  return (
    <main className='mainUser'>
      <section className='userSideBarContainer'>
        <span className='welcomeContainer'>
          { sessionUser.profileImage ? (
          <img className="userProfileImg" src={sessionUser.profileImage} alt='bad link'/>
          ) : (
          <img className="userSteinPipeImg" src={SteinPipe} alt='Frankenstein smoking a pipe'/>)
          }

          <ConfirmProfileImg profile={sessionUser} />

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
            onClick={()=>{history.push(`/account/${sessionUser.id}/overview`)}}>
            Overview
          </button>
          <hr className='userSideBarBreaks'></hr>
          <button className='userSideBarButtons'
             onClick={()=>{history.push(`/account/${sessionUser.id}/orders`)}}>
            My Orders
          </button>
          <hr className='userSideBarBreaks'></hr>
          <button className='userSideBarButtons'
             onClick={()=>{history.push(`/account/${sessionUser.id}/address`)}}>
            Billing & Shipping
          </button>
          <hr className='userSideBarBreaks'></hr>
          <button className='userSideBarButtons'
             onClick={()=>{history.push(`/account/${sessionUser.id}/settings`)}}>
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
          <h3>
            Loyalty Status
          </h3>
          <div className='loyaltyContainer'>
            <span className='loyaltyStatusSpan'>
              <div className='pointTotalDiv'>
                <span className='pointTotalSpan'>
                  <div>
                    {sessionUser.rewardsPoints}
                  </div>
                  <div>
                    Points
                  </div>
                </span>
              </div>
              <div>
                Stein Man
              </div>
            </span>
            <span className='loyaltyPointsSpan'>
              <p>
              Spend $20 more to reach Stein Man status and unlock rewards!
              </p>
              <button className='userProfileButton1'
              onClick={()=>alert('Feature Coming Soon')}
              >
                Redeem Points
              </button>
            </span>
          </div>
          <span>
            <h3>
              Recent Orders
            </h3>
            <div className='recentOrdersContainer'>
              <p>
                No Orders Found
              </p>
              <button className='userProfileButton'
              onClick={()=>history.push("/collections/all")}
              >
                SHOP NOW
              </button>
            </div>
          </span>
          <span>
            <h3>
              Join the Pack
            </h3>
            <div className='joinPackContainer'>
              <div>
                You currently do not have any subscriptions.
              </div>
              <span className='subsribeSpan'>
                <div>
                  Subscribe, save, and get everything you need delivered right to your door.
                </div>
                <div>
                  Cancel anytime.
                </div>
              </span>
              <button className='userProfileButton1'
              onClick={()=>alert('Feature Coming Soon')}
              >
                Subscribe & Save
              </button>
            </div>
          </span>
        </section>
      }


      { type === "orders" &&
        <section className='profileContainer'>
          <h1>
            MY ORDERS
          </h1>
          <div className='myOrdersContainer'>
            <span className='userProfileSpan'>
              <div>
                No Orders Found
              </div>
            </span>
            <button className='userProfileButton'
            onClick={()=>history.push("/collections/all")}
            >
              SHOP NOW
            </button>
          </div>
        </section>
      }


      { type === "address" &&
        <section className='profileContainer'>
          <h1>
            BILLING AND SHIPPING
          </h1>

          <h3>
            Billing Info
          </h3>
          <div className='billingContainer'>
            <div className='bold'>
            No payment method on file
            </div>
            <span className='billingSpan'>
              <div>
                We're only able to store a payment method for subscriptions at this time - if
              </div>
              <div>
                you start a subscription, your payment method will be located here.
              </div>
            </span>
            <button className='userProfileButton1'
            onClick={()=>alert('Feature Coming Soon')}
            >
              Subscribe & Save
            </button>
          </div>

          <h3>
            Shipping Addresses
          </h3>
          <div className='shippingAddressContainer'>
            <span className='spanListApart'>
              <span className='nameSpan'>
                <div className='bold'>
                  Name:
                </div>
                <div>
                  {sessionUser.firstName} {sessionUser.lastName}
                </div>
              </span>

            <AddressModal address={""}/>

            </span>
            {shippingAddresses && shippingAddresses.length === 0 ?
            (
            <span className='addressContainerSpan'>
            <div className='bold'>
              Address:
            </div>
            <span className='innerAddressSpan'>
              <div>
                null
              </div>
              <div>
                null, null, null
              </div>
              <div>
                United States
              </div>
            </span>
            </span>
            ) :
              shippingAddresses?.map((address)=>{
                return <span key={address.id} className='addressContainerSpan'>
                  <span className='centeringSpan'>
                    <div className='bold'>
                      Address:
                    </div>
                    <div>
                      type: {address.category}
                    </div>
                  </span>
                  <span className='innerAddressSpan'>
                    <div>
                      {address.address1}
                    </div>
                    <div>
                      {address.address2}
                    </div>
                    <div>
                      {address.address3}
                    </div>
                    <div>
                      {address.city}, {address.state}, {address.postalCode}
                    </div>
                    <div>
                      {address.country}
                    </div>

                    <AddressModal address={address}/>
                    <ConfirmDeleteAddressModal addressId={address.id}/>

                  </span>
                </span>
              })
            }
          </div>

          <h3>
            Billing Addresses
          </h3>
          <div className='shippingAddressContainer'>
            { billingAddresses && billingAddresses.length === 0 ?
            (
            <span className='addressContainerSpan'>
            <div className='bold'>
              Address:
            </div>
            <span className='innerAddressSpan'>
              <div>
                null
              </div>
              <div>
                null, null, null
              </div>
              <div>
                United States
              </div>
            </span>
            </span>
            ) :
              billingAddresses?.map((address)=>{
                return <span key={address.id} className='addressContainerSpan'>
                  <span className='centeringSpan'>
                    <div className='bold'>
                      Address:
                    </div>
                    <div>
                      type: {address.category}
                    </div>
                  </span>
                  <span className='innerAddressSpan'>
                    <div>
                      {address.address1}
                    </div>
                    <div>
                      {address.address2}
                    </div>
                    <div>
                      {address.address3}
                    </div>
                    <div>
                      {address.city}, {address.state}, {address.postalCode}
                    </div>
                    <div>
                      {address.country}
                    </div>

                    <AddressModal address={address}/>

                    <ConfirmDeleteAddressModal addressId={address.id}/>
                  </span>
                </span>
              })
            }
          </div>
        </section>
      }


      { type === "settings" &&
        <section className='profileContainer'>
          <h1>
            ACCOUNT SETTINGS
          </h1>

          <h3>
            Profile
          </h3>
          <div className='accountSettingsProfileContainer'>
            <span className='profileNameSpan'>
              <div>
                Name
              </div>
              <div>
                {sessionUser.firstName} {sessionUser.lastName}
              </div>

              <EditUserModal attribute={"Name"} />

            </span>
            <span className='profileEmailSpan'>
              <div>
                Email
              </div>
              <div>
              {sessionUser.email}
              </div>

              <EditUserModal attribute={"Email"} />

            </span>
            <span className='profilePasswordSpan'>
              <div>
                Password
              </div>
              <div>
                ******
              </div>

              <EditUserModal attribute={"Password"} />

            </span>
          </div>

          <h3>
            Details
          </h3>
          <div className='detailsContainer'>
            <span className='lastOrderSpan'>
              <div>
                LastOrder
              </div>
              <div>
                N/A
              </div>
            </span>
            <span className='totalOrdersSpan'>
              <div>
                Total Orders
              </div>
              <div>
                number of orders
              </div>
            </span>
            <span className='subscriptionStatusSpan'>
              <div>
                Subscription Status
              </div>
              <div>
                Inactive
              </div>
            </span>
          </div>

          <ConfirmDeleteAccountModal userId={sessionUser.id}/>

        </section>
      }



    </main>

  )
}

export default ProfilePage
