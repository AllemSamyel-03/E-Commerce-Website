import { use } from "react";
import { Link } from "react-router";
import { FiMinus, FiPlus, FiShoppingBag, FiTrash2 } from "react-icons/fi";
import CartContext from "../../context/CartContext";
import "./index.css";

const Cart = () => {
  const { cartList, removeFromCart, increaseQuantity, decreaseQuantity } =
    use(CartContext);
  const totalAmount = cartList.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <main className="cart-page page-fade">
      <section className="cart-header">
        <div>
          <p className="section-label">Shopping cart</p>
          <h1>Your Cart</h1>
        </div>
        <Link to="/products" className="secondary-button">
          Continue Shopping
        </Link>
      </section>
      {cartList.length === 0 ? (
        <div className="empty-view">
          <FiShoppingBag />
          <h2>Your cart is empty</h2>
          <p>Add products to cart and they will stay saved in LocalStorage.</p>
          <Link to="/products" className="primary-button">
            Shop Now
          </Link>
        </div>
      ) : (
        <section className="cart-layout">
          <ul className="cart-items-list">
            {cartList.map((eachItem) => (
              <li className="cart-item" key={eachItem.id}>
                <img src={eachItem.thumbnail} alt={eachItem.title} />
                <div className="cart-item-details">
                  <h2>{eachItem.title}</h2>
                  <p>${eachItem.price}</p>
                  <div className="quantity-row">
                    <button
                      type="button"
                      onClick={() => decreaseQuantity(eachItem.id)}
                    >
                      <FiMinus />
                    </button>
                    <span>{eachItem.quantity}</span>
                    <button
                      type="button"
                      onClick={() => increaseQuantity(eachItem.id)}
                    >
                      <FiPlus />
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  className="remove-button"
                  onClick={() => removeFromCart(eachItem.id)}
                  aria-label="Remove product"
                >
                  <FiTrash2 />
                </button>
              </li>
            ))}
          </ul>
          <aside className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Items</span>
              <span>{cartList.length}</span>
            </div>
            <div className="summary-row">
              <span>Total</span>
              <strong>${totalAmount.toFixed(2)}</strong>
            </div>
            <Link to="/checkout" className="primary-button full-width-button">
              Checkout
            </Link>
          </aside>
        </section>
      )}
    </main>
  );
};

export default Cart;
