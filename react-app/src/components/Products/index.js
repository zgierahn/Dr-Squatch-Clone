import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { thunkGetProducts } from '../../store/product';
import { updateCart } from '../../store/cart';
import america from "../../images/avengers-america.webp"
import hulk from "../../images/avengers-hulk.webp"
import avengers from "../../images/avengers.webp"
import avengersBG from "../../images/avengers-bg.jpg"

import './products.css';



function Products() {

const dispatch = useDispatch();
const history = useHistory();
let allProducts = useSelector(state => Object.values(state.product.allProducts))

useEffect(() => {
    dispatch(thunkGetProducts())
}, [dispatch])


const addToCart = (product) => {
    if(!localStorage.getItem("shop") ) {
        let shop = {}
        product.quantity = 1;
        shop[product.id] = product;
        localStorage.setItem("shop", JSON.stringify(shop))
        dispatch(updateCart(shop))
    } else {
        let shop = JSON.parse(localStorage.getItem("shop"))
        product.quantity = 1;
        shop[product.id] = product
        localStorage.setItem("shop", JSON.stringify(shop))
        dispatch(updateCart(shop))
    }

}

	return (
		<main className='productsMain'>
        <header>
			<img className="avBGBanner" src={avengersBG} alt="blue background"/>
            <div className='ProductsImageBanner'>
                <img className="avengerSoap" src={america} alt="AvengersSoap" />
                <span className='centerAvengersSpan'>
                    <img className="avengerProductsLogo" src={avengers} alt="AvengersSoap" />
                    <div className='productsAdTitle'>
                        LATHER YOUR WAY TO A HEROIC DAY
                    </div>
                    <div className='productsAdDescription'>
                        JOIN FORCES WITH THE NEWEST HERO OF YOUR SHOWER ROUTINE.
                    </div>
                </span>
                <img className="avengerSoap" src={hulk} alt="AvengersSoap" />
            </div>
            <section className='outerProductsContainer'>
                <ul className='productListBar'>
                    <h3 className='sidebarTitle'>ESSENTIALS</h3>
                    <button className='sidebarLinks'
                    onClick={()=>alert('Feature Coming Soon')}
                    >
                        Bar Soaps
                    </button>
                    <button className='sidebarLinks'
                    onClick={()=>alert('Feature Coming Soon')}
                    >
                        Face Wash
                    </button>
                    <button className='sidebarLinks'
                    onClick={()=>alert('Feature Coming Soon')}
                    >
                        Hair Care
                    </button>
                    <button className='sidebarLinks'
                    onClick={()=>alert('Feature Coming Soon')}
                    >
                        Deodorant
                        </button>
                    <button className='sidebarLinks'
                    onClick={()=>alert('Feature Coming Soon')}
                    >
                        Lotion
                    </button>
                    <button className='sidebarLinks'
                    onClick={()=>alert('Feature Coming Soon')}
                    >
                        Cologne
                    </button>
                    <h3 className='sidebarTitle'
                    onClick={()=>alert('Feature Coming Soon')}
                    >
                        MORE PRODUCTS
                    </h3>
                    <button className='sidebarLinks'
                    onClick={()=>alert('Feature Coming Soon')}
                    >
                        Shower Boosters
                    </button>
                    <button className='sidebarLinks'
                    onClick={()=>alert('Feature Coming Soon')}
                    >
                        Candles
                    </button>
                    <button className='sidebarLinks'
                    onClick={()=>alert('Feature Coming Soon')}
                    >
                        Beard Oil
                    </button>
                    <button className='sidebarLinks'
                    onClick={()=>alert('Feature Coming Soon')}
                    >
                        Gift Cards
                    </button>
                    <button className='sidebarLinks'
                    onClick={()=>alert('Feature Coming Soon')}
                    >
                        Swag
                    </button>
                    <button className='sidebarLinks'
                    onClick={()=>alert('Feature Coming Soon')}
                    >
                        Toothpaste
                    </button>
                </ul>
                <div className='mainProductsContainer'>
                    {allProducts.map((product)=>{
                    return <div className='productContainer' key={product.id} value={product.id}
                            onClick={()=>{history.push(`/collections/products/${product.id}`)
                            }}>
                                <div className='productsImageContainer'>
                                    <img className="productsImage" src={product.photos} alt={product.name} />
                                </div>
                                <p className='productsName'>{product.name}</p>
                                <p className='productsPrice'>${product.price}</p>
                                <div className='productsReviewsDiv'>
                                    {!product.reviews.length ?
                                    <div>New!</div> :
                                    ( product.reviews.length === 1 ?
                                    <div>1 review</div> :
                                    <div>{product.reviews.length} reviews</div>
                                    )}
                                </div>
                                <button className='addToCartButton'
                                onClick={(e)=>{
                                    e.stopPropagation();
                                    addToCart(product)
                                }}>
                                    + Add to Cart
                                </button>
                            </div>
                            })}
                </div>
            </section>
        </header>


		</main>
	);
};

export default Products;
