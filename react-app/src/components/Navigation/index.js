import React, { useState } from 'react';   // useEffect
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux'
import ProfileButton from './ProfileButton';
import CheckoutCartModal from '../MyModals/CheckoutCartModal';
import shoppingCart from "../../images/Cart-Logo.png"
import SteinLogo from "../../images/dr-stein.png"
import SteinPipe from "../../images/Dr-Stein-pipe-logo.png"
import './Navigation.css';


function Navigation({ isLoaded }) {

	const [checkoutDiv, setCheckoutDiv] = useState(false);
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory();



	return (
		<nav className='navBarContainer'>
			<div className='navLeft'>
				<button className='navSubscribe' onClick={()=>alert('Feature Coming Soon')}>
					Subscribe
				</button>
				<button  className="navButton" onClick={()=>history.push("/collections/all")}>
					Products
				</button>
				<button className="navButton" onClick={()=>alert('Feature Coming Soon')}>
					Rewards
				</button>
			</div>
			<div className='navCenter'>
				<NavLink exact to="/">
					<span className='navHomeSpan'>
						<img className='navFrankyLogo' src={SteinPipe} alt="Franky-logo"/>
						<img className='navSteinLogo' src={SteinLogo} alt="Frankenstein-logo"/>
					</span>
				</NavLink>
			</div>
			{isLoaded && (
				<div className='navRight'>
					{sessionUser &&
					<button className='userProfileButton'
					onClick={()=>history.push(`/account/${sessionUser.id}/overview`)}>
						Profile
					</button>
					}
					<button className="navButton"
						onClick={()=>alert('Feature Coming Soon')}
					>
						Take Quiz
					</button>
					<ProfileButton user={sessionUser} />
					<button className='userProfileButton'
					onClick={(e)=>{
					e.stopPropagation();
					setCheckoutDiv(true);
					}}
					>
						<img className="shoppingCart" src={shoppingCart} alt="shopping cart" />
					</button>
					{checkoutDiv && <CheckoutCartModal setCheckoutDiv={setCheckoutDiv}/>}
				</div>
			)}
		</nav>
	);
}

export default Navigation;
