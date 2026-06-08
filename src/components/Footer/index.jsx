import { Link, NavLink } from "react-router";
import { FiMail, FiPhone, FiShoppingBag } from "react-icons/fi";
import "./index.css";

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const Footer = () => (
  <footer className="footer-section">
    <div className="footer-content">
      <div className="footer-brand-section">
        <Link to="/" className="footer-logo" onClick={scrollToTop}>
          <FiShoppingBag />
          <span>ShopEase</span>
        </Link>
        <p>
          A clean ecommerce project with products, cart, wishlist, and simple
          user authentication.
        </p>
      </div>
      <div className="footer-links-section">
        <h2>Quick Links</h2>
        <nav className="footer-links">
          <NavLink to="/" onClick={scrollToTop}>
            Home
          </NavLink>
          <NavLink to="/products" onClick={scrollToTop}>
            Products
          </NavLink>
          <NavLink to="/wishlist" onClick={scrollToTop}>
            Wishlist
          </NavLink>
          <NavLink to="/cart" onClick={scrollToTop}>
            Cart
          </NavLink>
        </nav>
      </div>
      <div className="footer-contact-section">
        <h2>Contact</h2>
        <p>
          <FiMail /> shopease@gmail.com
        </p>
        <p>
          <FiPhone /> +91 99999 99999
        </p>
      </div>
    </div>
    <div className="footer-bottom">
      <p>Copyright 2026 ShopEase. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
