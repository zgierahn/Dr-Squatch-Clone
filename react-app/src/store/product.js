const GET_PRODUCTS = "products/GET_PRODUCTS"
const GET_SINGLE_PRODUCT = "products/GET_SINGLE_PRODUCT"


const getProducts = (products) => ({
    type : GET_PRODUCTS,
    data : products
})

const getSingleProduct = (product) => ({
    type : GET_SINGLE_PRODUCT,
    data : product
})



export const thunkGetSingleProduct = (productId) => async(dispatch) => {
    const res = await fetch(`/api/products/${productId}`)
    if (res.ok) {
        const data = await res.json()
        dispatch(getSingleProduct(data))
        return data
    }
    else {
        const err = await res.json()
        return {errors:err}
    }
}

export const thunkGetProducts = () => async (dispatch) => {
    const res = await fetch(`/api/products`)
    console.log("this is the get products thunk", res);
    if (res.ok) {
        const data = await res.json()
        dispatch(getProducts(data))
        return data
    }
    else {
        const err = await res.json()
        return {errors:err}
    }
}


const initialState = {allProducts:{}, singleProduct:{}}


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS: {
            let newState = {...state, allProducts:{...state.allProducts}}
            newState.allProducts = {}
            action.data.forEach(product => {
                newState.allProducts[product.id] = product
            });
            return newState
        }
        case GET_SINGLE_PRODUCT:{
            let newState = {...state, singleProduct:{...state.singleProduct}}
            newState.singleProduct = {}
            newState.singleProduct = action.data
            return newState
        }
        default:
            return state
    }
}
