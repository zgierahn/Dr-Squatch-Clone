import React from 'react';   // useEffect
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux'
import ProfileButton from './ProfileButton';
import CheckoutCartModal from '../MyModals/CheckoutCartModal';
import FrankyLogo from "../../images/Franky-logo.jpg"
import './Navigation.css';


function Navigation({ isLoaded }) {

	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory();



	return (
		<nav className='navBarContainer'>
			<div className='navLeft'>
				<button onClick={()=>alert('Feature Coming Soon')}>
					Subscribe
				</button>
				{/* <button onClick={()=>alert('Feature Coming Soon')}>
					Bundles
				</button> */}
				<button onClick={()=>history.push("/collections")}>
					Products
				</button>
				<button onClick={()=>alert('Feature Coming Soon')}>
					Rewards
				</button>
			</div>
			<div className='navCenter'>
				<NavLink exact to="/">
					<span className='navHomeSpan'>
						<img className='navFrankyLogo' src={FrankyLogo} alt="Franky-logo"/>
						<div>Dr. Stein</div>
					</span>
				</NavLink>
			</div>
			{isLoaded && (
				<div className='navRight'>
					<button>Take Quiz</button>
					<ProfileButton user={sessionUser} />
					<CheckoutCartModal />
				</div>
			)}
		</nav>
	);
}

export default Navigation;
