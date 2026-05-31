import React from "react";

const CartContext = React.createContext({
  cartList: [],
  wishlist: [],
  addToCart: () => {},
  removeFromCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  clearCart: () => {},
  toggleWishlist: () => {},
  isInWishlist: () => false,
});

export default CartContext;
