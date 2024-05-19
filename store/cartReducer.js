// // Action Types
export const CART_ADD_ITEM = "cart/addItem";
const CART_REMOVE_ITEM = "cart/removeItem";
const CART_ITEM_INCREASE_QUANTITY = "cart/increaseItemQuantity";
const CART_ITEM_DECREASE_QUANTITY = "cart/decreaseItemQuantity";

// // Action Creators
export function addCartItem(product) {
  return { type: CART_ADD_ITEM, payload: product };
}

export function removeCartItem(productId) {
  return { type: CART_ADD_ITEM, payload: { productId } };
}

export function decreaseCartItemQuantity(product) {
  return {
    type: CART_ITEM_DECREASE_QUANTITY,
    payload: product,
  };
}

export function increaseCartItemQuantity(product) {
  return {
    type: CART_ITEM_INCREASE_QUANTITY,
    payload: product,
  };
}

export default function cartReducer(state = [], action) {
  switch (action.type) {
    case CART_ADD_ITEM: {
      const existingItem = state.find(
        (item) => item.productId === action.payload.productId
      );

      if (existingItem) {
        return [
          ...state.map((item) => {
            if (item.productId === existingItem.productId) {
              item.quantity += 1;
            }
            return item;
          }),
        ];
      }
      return [...state, { ...action.payload, quantity: 1 }];
    }
    case CART_ITEM_INCREASE_QUANTITY: {
      return [
        ...state.map((item) => {
          if (item.productId === action.payload.productId) {
            item.quantity += 1;
          }
          return item;
        }),
      ];
    }
    case CART_ITEM_DECREASE_QUANTITY: {
      const itemQuantity = action.payload.quantity;
      if (itemQuantity <= 1) {
        return [
          ...state.filter(
            (item) => item.productId !== action.payload.productId
          ),
        ];
      } else
        return [
          ...state.map((item) => {
            if (item.productId === action.payload.productId) {
              item.quantity -= 1;
            }
            return item;
          }),
        ];
    }
    default: {
      return state;
    }
  }
}
