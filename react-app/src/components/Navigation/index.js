import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';


import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<nav className='navBarContainer'>
			<div className='navLeft'>
				<button>
					Subscribe
				</button>
				<a>Bundles</a>
				<a>Products</a>
				<a>Rewards</a>
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
