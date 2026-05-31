import { use } from "react";
import { Link } from "react-router";
import { FiHeart } from "react-icons/fi";
import CartContext from "../../context/CartContext";
import ProductCard from "../ProductCard";
import "./index.css";

const Wishlist = () => {
  const { wishlist } = use(CartContext);

  return (
    <main className="wishlist-page page-fade">
      <section className="cart-header">
        <div>
          <p className="section-label">Wishlist route</p>
          <h1>Your Wishlist</h1>
        </div>
        <Link to="/products" className="secondary-button">
          Explore Products
        </Link>
      </section>
      {wishlist.length === 0 ? (
        <div className="empty-view">
          <FiHeart />
          <h2>No wishlist products</h2>
          <p>Save products you like and view them here.</p>
        </div>
      ) : (
        <ul className="products-grid">
          {wishlist.map((eachProduct) => (
            <ProductCard key={eachProduct.id} productDetails={eachProduct} />
          ))}
        </ul>
      )}
    </main>
  );
};

export default Wishlist;
