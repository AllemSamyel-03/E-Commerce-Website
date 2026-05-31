import { use } from "react";
import { Link } from "react-router";
import { FiHeart, FiShoppingCart, FiStar } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import CartContext from "../../context/CartContext";
import "./index.css";

const ProductCard = (props) => {
  const { productDetails } = props;
  const { id, title, brand, price, rating, thumbnail, category } =
    productDetails;
  const { addToCart, toggleWishlist, isInWishlist } = use(CartContext);
  const liked = isInWishlist(id);

  return (
    <li className="product-card">
      <button
        type="button"
        className={liked ? "wishlist-button liked" : "wishlist-button"}
        onClick={() => toggleWishlist(productDetails)}
        aria-label="Toggle wishlist"
      >
        {liked ? <FaHeart /> : <FiHeart />}
      </button>
      <Link to={`/products/${id}`} className="product-image-link">
        <img
          src={thumbnail}
          alt={title}
          className="product-image"
          loading="lazy"
        />
      </Link>
      <p className="product-category">{category}</p>
      <Link to={`/products/${id}`} className="product-title-link">
        <h2>{title}</h2>
      </Link>
      <p className="product-brand">by {brand || "ShopEase"}</p>
      <div className="product-info-row">
        <p className="product-price">${price}</p>
        <p className="product-rating">
          <FiStar /> {rating}
        </p>
      </div>
      <button
        type="button"
        className="primary-button add-cart-button"
        onClick={() => addToCart(productDetails)}
      >
        <FiShoppingCart /> Add to Cart
      </button>
    </li>
  );
};

export default ProductCard;
