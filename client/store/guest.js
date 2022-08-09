import axios from "axios";

const TOKEN = "token";

// Actions
const ADD_TO_GUEST_CART = "ADD_TO_GUEST_CART";

// Action Creators
const _addToGuestCart = (product) => ({
  type: ADD_TO_GUEST_CART,
  product,
});

// Thunks
export const addToGuestCart = (product) => {
  return async function (dispatch) {
    dispatch(_addToGuestCart(product));
  };
};

// export const removeItem = (productId) => {
//   return async();
// };

export default function guestReducer(state = [], action) {
  switch (action.type) {
    case ADD_TO_GUEST_CART:
      return [...state, action.product]
    default:
      return state;
  }
}
