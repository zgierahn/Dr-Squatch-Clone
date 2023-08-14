
//types
const GET_ALL_REVIEWS = 'reviews/GetAllReviews';
const GET_REVIEWS_BY_PRODUCT = 'reviews/GetReviewsByProductId';
const GET_SINGLE_REVIEW = 'reviews/GET_SINGLE_REVIEW'
const EDIT_EXISTING_REVIEW = 'reviews/EditReviewById';
const CREATE_REVIEW = 'reviews/CreateNewReview';
const DELETE_REVIEW = 'reviews/DeleteReview';

//action functions
export const actionGetAllReviews = (data) => ({
    type: GET_ALL_REVIEWS,
    data
});

export const actionGetReviewsByProduct = (data) => ({
    type: GET_REVIEWS_BY_PRODUCT,
    data
});

export const actionGetSingleReview = (data) => ({
    type: GET_SINGLE_REVIEW,
    data
});

export const actionEditReview = (reviewId) => ({
    type: EDIT_EXISTING_REVIEW,
    reviewId
});

export const actionCreateReview = (review) => ({
    type: CREATE_REVIEW,
    review
});

export const actionDeleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
});


//thunk funcs
export const thunkGetReview = (reviewId) => async (dispatch) => {
    const res = await fetch('/api/reviews/');
    console.log("what's coming back in", res);
    if(res.ok) {
        const reviews = await res.json();
        dispatch(actionGetAllReviews(reviews));
        return reviews;
    }
}
//potentially useless
export const thunkGetReviewsByProduct = (productId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/products/${productId}`);
    if(res.ok) {
        const reviewsByProduct = await res.json();
        dispatch(actionGetReviewsByProduct(reviewsByProduct));
        return reviewsByProduct;
    } else {
    const err = await res.json();
        return err;
    }

}


export const thunkDeleteReview = (reviewId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/delete/${reviewId}`,{
        method: 'DELETE'
    });
    if(res.ok) {
        const review = await res.json();
        dispatch(actionDeleteReview(reviewId));
        return review;
    } else {
        const err = await res.json();
        // console.log(err);
        return err;
    }
};


export const thunkCreateReview = (data, productId) => async (dispatch) => {
        const res = await fetch(`/api/reviews/products/${productId}/new`,
         {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        if(res.ok) {
        const review = await res.json();
            dispatch(actionCreateReview(review));
            return review;
        } else {
        const err = await res.json();
        return err;
    }
};




const intitialState = {
    reviews: {},
    singleReview : {}
};


//reducer
export default function ReviewsReducer (state = intitialState, action) {
    switch(action.type) {
        case GET_REVIEWS_BY_PRODUCT :{
            const newState = {...state, reviews : {...state.reviews}};
            newState.reviews = {};
            console.log("action data--------------------------", action.data);
            action.data.Reviews.forEach(review => {
                newState.reviews[review.id] = review
            });
            return newState;
        }
        case GET_SINGLE_REVIEW:{
            let newState = {...state, singleReview : {...state.singleProduct}}
            newState.singleReview = {}
            newState.singleReview = action.data
            return newState
        }
        case CREATE_REVIEW : {
            const newState = {...state, reviews : {...state.reviews} };
            newState.reviews[action.review.id] = action.review;
            return newState;
        }
        case DELETE_REVIEW : {
            const  newState = {...state, reviews : {...state.reviews}}
            delete newState.reviews[action.reviewId]
            return newState
        }
        default:
             return state
    }
};


//notes


// let createReviewButton = false
//             !user.user || review.userId === user.user.id || user.user.id === spot.ownerId  ? createReviewButton = false : createReviewButton= true
//
