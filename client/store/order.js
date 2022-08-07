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
export const fetchCart = () => {
  const token = window.localStorage.getItem(TOKEN);
  return async (dispatch) => {
    const { data: cart } = await axios.get("/api/users/cart", {
      headers: {
        authorization: token,
      },
    });
    dispatch(_getCart(cart));
  };
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
