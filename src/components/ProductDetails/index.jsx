import { use, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { FiHeart, FiShoppingCart, FiStar } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import CartContext from "../../context/CartContext";
import Loader from "../Loader";
import ProductCard from "../ProductCard";
import { SIMILAR_PRODUCTS_API, SINGLE_PRODUCT_API } from "../../utils/apiUrls";
import "./index.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const { addToCart, toggleWishlist, isInWishlist } = use(CartContext);

  useEffect(() => {
    const getProductDetails = async () => {
      setIsLoading(true);
      setErrorMsg("");

      try {
        const response = await fetch(SINGLE_PRODUCT_API(id));
        const data = await response.json();
        setProductDetails(data);

        const similarResponse = await fetch(
          SIMILAR_PRODUCTS_API(data.category),
        );
        const similarData = await similarResponse.json();
        const filteredSimilarProducts = (similarData.products || []).filter(
          (eachProduct) => eachProduct.id !== data.id,
        );
        setSimilarProducts(filteredSimilarProducts);
      } catch (error) {
        setErrorMsg("Unable to fetch product details.");
      } finally {
        setIsLoading(false);
      }
    };

    getProductDetails();
  }, [id]);

  const liked = isInWishlist(productDetails.id);

  return (
    <main className="product-details-page page-fade">
      {isLoading ? (
        <Loader />
      ) : errorMsg !== "" ? (
        <div className="empty-view">
          <h1>{errorMsg}</h1>
          <Link to="/products" className="primary-button">
            Back to Products
          </Link>
        </div>
      ) : (
        <>
          <section className="product-details-card">
            <div className="details-image-wrapper">
              <img
                src={productDetails.thumbnail}
                alt={productDetails.title}
                className="details-image"
              />
            </div>
            <div className="details-content">
              <p className="product-category">{productDetails.category}</p>
              <h1>{productDetails.title}</h1>
              <p className="details-brand">
                Brand: {productDetails.brand || "ShopEase"}
              </p>
              <p className="details-description">
                {productDetails.description}
              </p>
              <div className="details-meta-row">
                <p className="details-price">${productDetails.price}</p>
                <p className="product-rating">
                  <FiStar /> {productDetails.rating}
                </p>
                <p className="stock-text">Stock: {productDetails.stock}</p>
              </div>
              <div className="details-buttons-row">
                <button
                  type="button"
                  className="primary-button"
                  onClick={() => addToCart(productDetails)}
                >
                  <FiShoppingCart /> Add to Cart
                </button>
                <button
                  type="button"
                  className={
                    liked ? "secondary-button liked-action" : "secondary-button"
                  }
                  onClick={() => toggleWishlist(productDetails)}
                >
                  {liked ? <FaHeart /> : <FiHeart />}{" "}
                  {liked ? "Wishlisted" : "Wishlist"}
                </button>
              </div>
              <Link to="/products" className="back-link">
                Back to products
              </Link>
            </div>
          </section>
          {similarProducts.length > 0 && (
            <section className="similar-products-section">
              <div className="similar-products-header">
                <div>
                  <p className="section-label">Same category</p>
                  <h2>Similar Products</h2>
                </div>
              </div>
              <ul className="similar-products-slider">
                {similarProducts.map((eachProduct) => (
                  <ProductCard
                    key={eachProduct.id}
                    productDetails={eachProduct}
                  />
                ))}
              </ul>
            </section>
          )}
        </>
      )}
    </main>
  );
};

export default ProductDetails;
