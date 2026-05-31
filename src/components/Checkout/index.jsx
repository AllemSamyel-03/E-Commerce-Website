import { use, useState } from "react";
import { Link } from "react-router";
import { FiCheckCircle, FiCreditCard } from "react-icons/fi";
import CartContext from "../../context/CartContext";
import "./index.css";

const Checkout = () => {
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const { cartList, clearCart } = use(CartContext);
  const totalAmount = cartList.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const onSubmitPayment = (event) => {
    event.preventDefault();
    clearCart();
    setIsOrderPlaced(true);
  };

  if (isOrderPlaced) {
    return (
      <main className="checkout-page page-fade">
        <div className="empty-view success-view">
          <FiCheckCircle />
          <h1>Order placed successfully</h1>
          <p>This is a frontend payment flow for learning React concepts.</p>
          <Link to="/products" className="primary-button">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page page-fade">
      <section className="checkout-card">
        <div className="checkout-info">
          <p className="section-label">Payment route</p>
          <h1>Checkout</h1>
          <p>Complete this simple frontend payment form to place the order.</p>
          <div className="payment-total">
            <span>Total Amount</span>
            <strong>${totalAmount.toFixed(2)}</strong>
          </div>
        </div>
        <form className="payment-form" onSubmit={onSubmitPayment}>
          <label htmlFor="cardName">Name on Card</label>
          <input id="cardName" type="text" placeholder="Rahul" required />
          <label htmlFor="cardNumber">Card Number</label>
          <div className="input-field">
            <FiCreditCard />
            <input
              id="cardNumber"
              type="text"
              placeholder="1234 5678 9012"
              required
            />
          </div>
          <div className="payment-row">
            <div>
              <label htmlFor="expiry">Expiry</label>
              <input id="expiry" type="text" placeholder="08/28" required />
            </div>
            <div>
              <label htmlFor="cvv">CVV</label>
              <input id="cvv" type="password" placeholder="123" required />
            </div>
          </div>
          <button
            type="submit"
            className="primary-button full-width-button"
            disabled={cartList.length === 0}
          >
            Pay Now
          </button>
        </form>
      </section>
    </main>
  );
};

export default Checkout;
