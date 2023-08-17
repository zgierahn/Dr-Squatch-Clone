import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { thunkGetProducts } from '../../store/product';
import { updateCart } from '../../store/cart';
import america from "../../images/avengers-america.webp"
import hulk from "../../images/avengers-hulk.webp"
import avengers from "../../images/avengers.webp"
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
		<main>
        <header>
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
                    <h3>Essentials</h3>
                    <button>Bar Soaps</button>
                    <button>Face Wash</button>
                    <button>Hair Care</button>
                    <button>Deodorant</button>
                    <button>Lotion</button>
                    <button>Cologne</button>
                    <h3>More Products</h3>
                    <button>Shower Boosters</button>
                    <button>Candles</button>
                    <button>Beard Oil</button>
                    <button>Gift Cards</button>
                    <button>Swag</button>
                    <button>Toothpaste</button>
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
                                    Add to Cart
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
