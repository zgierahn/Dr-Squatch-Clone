import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';

import './Navigation.css';


function Navigation({ isLoaded }){

	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory();

	return (
		<nav className='navBarContainer'>
			<div className='navLeft'>
				<button onClick={()=>alert('Feature Coming Soon')}>
					Subscribe
				</button>
				<button onClick={()=>alert('Feature Coming Soon')}>
					Bundles
				</button>
				<button onClick={()=>history.push("/collections")}>
					Products
				</button>
				<button onClick={()=>alert('Feature Coming Soon')}>
					Rewards
				</button>
			</div>
			<div className='navCenter'>
				<NavLink exact to="/">Dr. Stein</NavLink>
			</div>
			{isLoaded && (
				<div className='navRight'>
					<a>Take Quiz</a>
					<ProfileButton user={sessionUser} />
					<a>Cart</a>
				</div>
			)}
		</nav>
	);
}

export default Navigation;
