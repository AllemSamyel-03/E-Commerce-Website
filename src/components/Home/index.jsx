import { Link } from "react-router";
import {
  FiArrowRight,
  FiCreditCard,
  FiRefreshCw,
  FiShield,
  FiTag,
  FiTruck,
  FiZap,
} from "react-icons/fi";
import "./index.css";

const Home = () => (
  <main className="home-page page-fade">
    <section className="hero-section">
      <div className="hero-content">
        <p className="section-label">Modern ecommerce made simple</p>
        <h1>Fresh products, fair prices, and fast checkout.</h1>
        <p className="hero-description">
          Explore products from DummyJSON with search, category filters,
          wishlist, cart persistence, and a clean responsive shopping flow.
        </p>
        <Link to="/products" className="primary-button hero-button">
          Shop Products <FiArrowRight />
        </Link>
      </div>
    </section>
    <section className="benefits-section">
      <div className="benefit-card">
        <FiTruck />
        <h2>Fast Delivery</h2>
        <p>
          Responsive product cards and simple checkout keep the experience
          quick.
        </p>
      </div>
      <div className="benefit-card">
        <FiShield />
        <h2>Saved Session</h2>
        <p>Login state, cart, and wishlist are stored using LocalStorage.</p>
      </div>
      <div className="benefit-card">
        <FiZap />
        <h2>Easy Discovery</h2>
        <p>
          Search, category filtering, and load more help users find products.
        </p>
      </div>
      <div className="benefit-card">
        <FiTag />
        <h2>Smart Deals</h2>
        <p>
          Clean product pricing, ratings, and sorting make comparison simple.
        </p>
      </div>
      <div className="benefit-card">
        <FiRefreshCw />
        <h2>Saved Wishlist</h2>
        <p>Favorite products are kept in the browser for the next visit.</p>
      </div>
      <div className="benefit-card">
        <FiCreditCard />
        <h2>Quick Checkout</h2>
        <p>
          A simple payment route completes the shopping flow on the frontend.
        </p>
      </div>
    </section>
  </main>
);

export default Home;
