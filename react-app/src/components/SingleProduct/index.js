import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { thunkGetSingleProduct } from '../../store/product'
import { thunkGetReviewsByProduct } from '../../store/review'
import "./singleProduct.css"

function SingleProduct() {

const history = useHistory();
const dispatch = useDispatch();
const {productId} = useParams();
let product = useSelector(state => state.product.singleProduct)
let allReviews = useSelector(state => Object.values(state.review.reviews))

useEffect(() => {
    dispatch(thunkGetReviewsByProduct(productId))
    dispatch(thunkGetSingleProduct(productId))
}, [dispatch])


  return (
    <main>
        <div className='mainProductContainer'>
            <section className='leftSideContainer'>
                <nav className='trackWebLocation'>
                    <div>Home</div>
                    <div>-</div>
                    <div>{product.category}</div>
                    <div>-</div>
                    <div>{product.name}</div>
                </nav>
                <div className='outerImagesContainer'>
                    <div className='innerImagesContainer'>
                        <img className="singleProductImage" src={product.photos}/>
                    </div>
                </div>
            </section>
            <section className='rightSideContainer'>
                <div className='SPCategory'>{product.category}</div>
                <header className='SingleProductName'>
                    {product.name}
                </header>
                {product.reviews && product.reviews.length > 0 ? <div>{product.reviews.length} reviews</div> : <div>New!</div>}
                <div className='SPdescription'>{product.description}</div>
                <span className='singleProductSpan'>
                    <div>image 1</div>
                    <div>image 2</div>
                </span>
                <ul className='selectPricesContainer'>
                    <span className='SPBuyOptions'>
                        <div>Buy 1</div>
                        <div>${product.price} / each</div>
                    </span>
                    <span>
                        <div>Buy 2</div>
                        <div>${product.price} / each</div>
                    </span>
                    <span>
                        <div>Buy 3</div>
                        <div>${product.price} / each</div>
                    </span>

                </ul>
                <button className='addToCartButton'>${product.price} | Add to Cart</button>
            </section>
        </div>
        <section className='lowerProductSection'>
            <div className='productReviewsHeader'>
                <h1>Reviews</h1>
                <div> Avg Review #</div>
                <span>
                    <div>Review Stars</div>
                    <div># of Reviews</div>
                </span>
            </div>
            <div className='searchAndCreateReviewsContainer'>
                <button
                onClick={()=>{history.push(`/products/${productId}/reviews/new`)}}>
                    Add a Review
                </button>
            </div>
            <div className='productReviewsContainter'>
                {allReviews.map((review)=>{
                return <div key={review.id} className='singleReviewContainer'>
                        <span className='reviewDataContainer'>
                            <span className='reviewNameSpan'>
                                <div>{review.firstName}{review.lastName}</div>
                                <div>Verified Buyer</div>
                            </span>
                            <div>
                                rating: {review.rating}
                            </div>
                            <div>{review.title}</div>
                            <div>{review.description}</div>
                        </span>
                        <div className='reviewDateContainer'>
                            {review.createdAt}
                        </div>
                        </div>
                })}
            </div>
        </section>
    </main>
  )
};

export default SingleProduct
