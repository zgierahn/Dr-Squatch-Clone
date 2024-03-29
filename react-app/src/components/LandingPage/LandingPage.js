import React from 'react';  // , { useEffect }
// import { useDispatch, useSelector } from 'react-redux'
// import { updateCart } from "../../store/cart";
import { useHistory } from 'react-router-dom';
import avengersAd from "../../images/avengers-tile-1.png"
import avengers from "../../images/avengers.webp"
import avengersBG from "../../images/avengers-bg.jpg"
import bundle from "../../images/6-product-image.webp"
import pineTar from "../../images/pine-tar-single.webp"
import faceWash from "../../images/face_wash_mosaic_tile_3.jpg"
import bayRum from "../../images/bay_rum_deo_mosaic_tile.webp"
import leaf from "../../images/leaf.png"
import log from "../../images/log.png"
import plane from "../../images/plane.png"
import trusted1 from "../../images/trusted_by_1.png";
import trusted2 from "../../images/trusted_by_2.png";
import trusted3 from "../../images/trusted_by_3.png";
import trusted4 from "../../images/trusted_by_4.png";
// import soapAd from "../../videos/soap-ad.m3u8";
import './LandingPage.css';



function LandingPage() {

	const history = useHistory();


	return (
		<main className='landingPageMain'>

        <header className='landingFirst'>
				<img className="avBG" src={avengersBG} alt="blue background"/>
			<section className='firstAdContainer'>
				<img className="avLogo" src={avengers} alt="avengers logo"/>
				<div className='firstAdTitle'>
					LATHER YOUR WAY TO A HEROIC DAY
				</div>
				<span className='firstAdSpan'>
					<div className='ad1Description'>
						SAVE YOUR SKIN WITH FOUR HEROIC BAR SOAPS INPSIRED BY THE AVENGERS
					</div>
					<button className='addToCartButton' onClick={()=>history.push("/collections/all")}>
						Get Started
					</button>
					<button className='addToCartButton' onClick={()=>history.push("/collections/bar-soap")}>
						Shop Bar Soaps
					</button>
				</span>
			</section>
				<img className="avTile1" src={avengersAd} alt="avengers tile 1 ad"/>
		</header>
			<section className='secondAdContainer'>
				<div className='bundleContainer'>
					<img className='landingBundle1' src={bundle} alt="bundle of products"/>
					<span className='bundleSloganSpan'>
						<h3 className='adTitle1'>
							FEEL LIKE A MAN,
						</h3>
						<h3 className='adTitle1'>
							SMELL LIKE A CHAMPION.
						</h3>
						<p className='adDescription'>
							Natural products, designed for men, in fresh, manly scents.
						</p>
					</span>
				</div>
				<span className='secondAdRightSideContainer'>
					<div className='barSoapsContainer'>
						<h3 className='adTitle1' id='barSoaps'>
							Bar Soaps
						</h3>
						<img className='singlePineTar' src={pineTar} alt="single Pine Tar soap"/>
					</div>
					<span className='faceAndDeoSpan'>
						<div className='facewashContainer'>
							<img className='faceWash' src={faceWash} alt="single Pine Tar soap"/>
							<h3 className='adTitle1' id='faceWash'>
								Face Wash
							</h3>
						</div>
						<div className='deoContainer'>
							<h3 className='adTitle1' id='deo'>
								Deodorant
							</h3>
							<img className='bayRum' src={bayRum} alt="single Pine Tar soap"/>
						</div>
					</span>
				</span>
			</section>
			<section className='thirdAdContainer'>
				<span className='greenSpan'>
					<img className='greenImages' src={leaf} alt="leaf"/>
					<p className='greenImagesTitle'>
						Get Dirty, Stay Clean
					</p>
					<p className='greenDescription'>
						Experience a wilderness-inspired shower
					</p>
					<p className='greenDescription'>
						adventure that will have you coming up
					</p>
					<p className='greenDescription'>
						with excuses to get dirty.
					</p>
				</span>
				<span className='greenSpan'>
					<img className='greenImages' src={log} alt="log"/>
					<p className='greenImagesTitle'>
						No Harmful Ingredients
					</p>
					<p className='greenDescription'>
						Only the finest products Mother Nature
					</p>
					<p className='greenDescription'>
						has to offer and naturally-derived
					</p>
					<p className='greenDescription'>
						fragrances that smell awesome.
					</p>
				</span>
				<span className='greenSpan'>
					<img className='greenImages' src={plane} alt="plane"/>
					<p className='greenImagesTitle'>
						Formulated For Men
					</p>
					<p className='greenDescription'>
						Manly scents, designed to avoid
					</p>
					<p className='greenDescription'>
						estrogenics, and made to meet the
					</p>
					<p className='greenDescription'>
						specific demands of men everywhere.
					</p>
				</span>
			</section>



{/*
			<section className='fourthAdContainer'>
				<div className="soapAdClass" autoPlay={true} type="application/x-mpegURL">

				<video className="soapAdClass" src={soapAd} autoPlay={true} type="application/x-mpegURL" />

				</div>
			</section> */}





		<footer className='trustedFooter'>
            <div className='trustedByText'>
                Trusted By
            </div>
            <span className='trustedBySpan'>
                <img  className="trustedBy" src={trusted1} alt="mens journal"/>
                <img  className="trustedBy" src={trusted2} alt="mens health"/>
                <img  className="trustedBy" src={trusted3} alt="GQ"/>
                <img  className="trustedBy" src={trusted4} alt="birchbox"/>
            </span>
        </footer>
		</main>
	);
}

export default LandingPage;
