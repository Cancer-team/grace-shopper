import axios from "axios";

const FETCH_SINGLE_PRODUCT = "FETCH_SINGLE_PRODUCT";

const setProduct = (product) => {
  return {
    type: FETCH_SINGLE_PRODUCT,
    product,
  };
};

export const fetchProduct = (productId) => {
  return async (dispatch) => {
    const { data: product } = await axios.get(`/api/products/${productId}`);
    dispatch(setProduct(product));
  };
};

export const addProductToCart = (productId, userId) => {
  return async function (dispatch) {
    const response = await axios.put(
      `/api/products/addToCart/${productId}`,
      userId
    );
    const product = response.data;
    dispatch(setProduct(product));
  };
};

const initialState = {};

export default function singleProductReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SINGLE_PRODUCT:
      return action.product;
    default:
      return state;
  }
}
