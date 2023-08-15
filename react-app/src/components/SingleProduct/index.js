import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thunkGetReviewsByProduct } from '../../store/review'
import { useParams, useHistory } from 'react-router-dom'
import "./singleProduct.css"

function SingleProduct() {

const history = useHistory();
const dispatch = useDispatch();
const {productId} = useParams();
let allReviews = useSelector(state => Object.values(state.review.reviews))

useEffect(() => {
    dispatch(thunkGetReviewsByProduct(productId))
}, [dispatch])

  return (
    <main>
        <div className='mainProductContainer'>
            <section className='leftSideContainer'>
                <nav className='trackWebLocation'>
                    Nav Bar PlaceHolder
                </nav>
                <div className='imagesContainer'>
                    <div>This is an image</div>
                </div>
            </section>
            <section className='rightSideContainer'>
                <header>
                    The Name of the product
                </header>
                <div>reviews</div>
                <div>description</div>
                <span className='singleProductSpan'>
                    <div>image 1</div>
                    <div> image 2</div>
                </span>
                <ul className='selectPricesContainer'>
                    <div>Select Price 1</div>
                    <div>Select Price 2</div>
                    <div>Select Price 3</div>

                </ul>
                <button>Add to Cart button</button>
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
