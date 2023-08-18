import React from 'react';  // , { useEffect }
// import { useDispatch, useSelector } from 'react-redux'
// import { updateCart } from "../../store/cart";
import avengersAd from "../../images/avengers-tile-1.png"
import avengers from "../../images/avengers.webp"
import avengersBG from "../../images/avengers-bg.jpg"
import './LandingPage.css';



function LandingPage() {



	return (
		<main>

        <header className='landingFirst'>
				<img className="avBG" src={avengersBG} alt="blue background"/>
			<div className='firstAdContainer'>
				<img className="avLogo" src={avengers} alt="avengers logo"/>
				<div className='firstAdTitle'>
					LATHER YOUR WAY TO A HEROIC DAY
				</div>
				<span className='firstAdSpan'>
					<div className='ad1Description'>
						SAVE YOUR SKIN WITH FOUR HEROIC BAR SOAPS INPSIRED BY THE AVENGERS
					</div>
					<button className='addToCartButton' onClick={()=>alert('Feature Coming Soon')}>
						Get Started
					</button>
					<button className='addToCartButton' onClick={()=>alert('Feature Coming Soon')}>
						Shop Bar Soaps
					</button>
				</span>
			</div>
				<img className="avTile1" src={avengersAd} alt="avengers tile 1 ad"/>
		</header>
		<section>

		</section>
		<section>

		</section>
		<footer>

		</footer>

		</main>
	);
}

export default LandingPage;
