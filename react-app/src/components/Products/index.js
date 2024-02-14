import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { thunkGetProducts } from '../../store/product';
import { updateCart } from '../../store/cart';
import AddToCartModal from '../MyModals/AddToCartModal';
import america from "../../images/avengers-america.webp"
import hulk from "../../images/avengers-hulk.webp"
import avengers from "../../images/avengers.webp"
import avengersBG from "../../images/avengers-bg.jpg"
import CheckoutCartModal from '../MyModals/CheckoutCartModal';
import './products.css';



function Products() {

const dispatch = useDispatch();
const history = useHistory();
const { categories } = useParams();
const [checkoutDiv, setCheckoutDiv] = useState(false);
const [addToCartDiv, setAddToCartDiv] = useState(false);
let allProducts = useSelector(state => Object.values(state.product.allProducts))

let filteredProducts;
if(categories === "all") {
    filteredProducts = allProducts;
} else {
    let filtered;
    switch (categories) {
        case 'bar-soap':
            filtered = "Bar Soap";
            break;
        case 'face-care':
            filtered = "Face Care";
            break;
        case 'hair-care':
            filtered = "Hair Care";
            break;
        case 'deodorant':
            filtered = "Deodorant";
            break;
        case 'lotion':
            filtered = "Lotion";
            break;
        case 'cologne':
            filtered = "Cologne";
            break;
        case 'shower-boosters':
            filtered = "Shower Booster";
            break;
        case 'candles':
            filtered = "Candle";
            break;
        case 'beard-oil':
            filtered = "Beard";
            break;
        case 'gift-cards':
            filtered = "Gift Cards";
            break;
        case 'swag':
            filtered = "Swag";
            break;
        case 'toothpaste':
            filtered = "Toothpaste";
            break;
        default:
            filtered = "Bar Soap";
        }
    filteredProducts = allProducts.filter((product) => product.category === filtered);
}


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
            <div className='productsImageBanner'>
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
                    <h3 className='sidebarTitle'>
                        ESSENTIALS
                    </h3>
                    <button className='sidebarLinks'
                    onClick={()=>history.push("/collections/bar-soap")}
                    >
                        Bar Soaps
                    </button>
                    <button className='sidebarLinks'
                    onClick={()=>history.push("/collections/face-care")}
                    >
                        Face Wash
                    </button>
                    <button className='sidebarLinks'
                    onClick={()=>history.push("/collections/hair-care")}
                    >
                        Hair Care
                    </button>
                    <button className='sidebarLinks'
                    onClick={()=>history.push("/collections/deodorant")}
                    >
                        Deodorant
                        </button>
                    <button className='sidebarLinks'
                    onClick={()=>history.push("/collections/lotion")}
                    >
                        Lotion
                    </button>
                    <button className='sidebarLinks'
                    onClick={()=>history.push("/collections/cologne")}
                    >
                        Cologne
                    </button>
                    <button className='sidebarLinks sidebarLinkSelection'
                    onClick={()=>history.push("/collections/all")}
                    >
                        Shop All
                    </button>
                    <h3 className='sidebarTitle'>
                        MORE PRODUCTS
                    </h3>
                    <button className='sidebarLinks'
                    onClick={()=>history.push("/collections/shower-boosters")}
                    >
                        Shower Boosters
                    </button>
                    <button className='sidebarLinks'
                    onClick={()=>history.push("/collections/candles")}
                    >
                        Candles
                    </button>
                    <button className='sidebarLinks'
                    onClick={()=>history.push("/collections/beard-oil")}
                    >
                        Beard Oil
                    </button>
                    <button className='sidebarLinks'
                    onClick={()=>history.push("/collections/gift-cards")}
                    >
                        Gift Cards
                    </button>
                    <button className='sidebarLinks'
                    onClick={()=>history.push("/collections/swag")}
                    >
                        Swag
                    </button>
                    <button className='sidebarLinks'
                    onClick={()=>history.push("/collections/toothpaste")}
                    >
                        Toothpaste
                    </button>
                </ul>
                <div className='mainProductsContainer'>
                    {checkoutDiv && <CheckoutCartModal setCheckoutDiv={setCheckoutDiv}/>}
                    {filteredProducts.map((product)=>{
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
                                addToCart(product);
                                setAddToCartDiv(true);
                                }}>
                                    + Add to Cart
                                </button>

                               {addToCartDiv && <AddToCartModal setAddToCartDiv={setAddToCartDiv} setCheckoutDiv={setCheckoutDiv}/>}

                            </div>
                            })}
                </div>
            </section>
        </header>


		</main>
	);
};

export default Products;
