import React, { useState, useContext, useReducer, useEffect } from "react";
import reducer from "./reducer";
const AppContext = React.createContext();

const initialState = {
  cart: [],
  loading: false,
  total: 0,
  amount: 0,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "UPDATE_TOTAL_COUNT" });
    dispatch({ type: "UPDATE_TOTAL_DOLLARS" });
  }, [state.cart]);

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const increaseItemCount = (id) => {
    dispatch({ type: "INCREASE_ITEM_COUNT", payload: id });
  };

  const decreaseItemCount = (id) => {
    dispatch({ type: "DECREASE_ITEM_COUNT", payload: id });
  };

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const updateCard = () => {
    dispatch({ type: "UPDATE_TOTAL" });
  };

  const fetchData = async () => {
    dispatch({ type: "LOADING" });
    const response = await fetch(
      "https://course-api.com/react-useReducer-cart-project"
    );
    const cart = await response.json();
    dispatch({ type: "DISPLAY_ITEMS", payload: cart });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        increaseItemCount,
        decreaseItemCount,
        removeItem,
        updateCard,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
