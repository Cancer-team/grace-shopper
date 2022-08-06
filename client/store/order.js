import axios from "axios";

const TOKEN = "token";

// Actions
const GET_CART = "GET_CART";
const REMOVE_ITEM = "REMOVE_ITEM";

// Action Creators
const _getCart = (cart) => ({
  type: GET_CART,
  cart,
});

// const _removeItem = (item) => ({
//   type: REMOVE_ITEM,
//   item,
// });
// Thunks
export const getCart = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  const res = await axios.get("api/cart", {
    headers: {
      authorization: token,
    },
  });
  return dispatch(_getCart(res.data));
};

// export const removeItem = (productId) => {
//   return async();
// };

export default function orderReducer(state = {}, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    default:
      return state;
  }
}
