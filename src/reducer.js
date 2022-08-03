function negNumberHandle(num) {
  if (num > 0) {
    return 0;
  }
  return num;
}

const reducer = (state, action) => {
  if (action.type === "CLEAR_CART") {
    return {
      ...state,
      cart: [],
    };
  }
  if (action.type === "INCREASE_ITEM_COUNT") {
    return {
      ...state,
      cart: state.cart.map((i) => {
        if (i.id === action.payload) {
          return { ...i, amount: i.amount + 1 };
        } else {
          return i;
        }
      }),
    };
  }
  if (action.type === "DECREASE_ITEM_COUNT") {
    return {
      ...state,
      cart: state.cart
        .map((i) => {
          if (i.id === action.payload) {
            return { ...i, amount: i.amount - 1 };
          } else {
            return i;
          }
        })
        .filter((cartItem) => cartItem.amount !== 0),
    };
  }
  if (action.type === "REMOVE_ITEM") {
    return {
      ...state,
      cart: state.cart.filter((i) => i.id !== action.payload),
    };
  }

  if (action.type === "UPDATE_TOTAL_COUNT") {
    return {
      ...state,
      amount: state.cart.reduce((counter, item) => {
        return counter + item.amount;
      }, 0),
    };
  }

  if (action.type === "UPDATE_TOTAL_DOLLARS") {
    console.log(state);
    return {
      ...state,
      total: state.cart.reduce((dollars, item) => {
        return Math.round((dollars + item.price * item.amount) * 100) / 100;
      }, 0),
    };
  }
  if (action.type === "POPULATE_CART") {
    return {
      ...state,
      cart: action.payload,
    };
  }

  if (action.type === "LOADING") {
    return {
      ...state,
      loading: true,
    };
  }

  if (action.type === "DISPLAY_ITEMS") {
    return {
      ...state,
      loading: false,
      cart: action.payload,
    };
  }

  throw new Error("No matching action type");
};

export default reducer;
