import { act, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import ProductCard from "../ProductCard";
import Loader from "../Loader";
import {
  CATEGORIES_API,
  PAGINATION_API,
  PRODUCTS_BY_CATEGORY_API,
  SEARCH_PRODUCTS_API,
} from "../../utils/apiUrls";
import "./index.css";

const limit = 12;

const sortOptions = [
  { optionId: "DEFAULT", displayText: "Default" },
  { optionId: "PRICE_LOW", displayText: "Price Low to High" },
  { optionId: "PRICE_HIGH", displayText: "Price High to Low" },
  { optionId: "RATING", displayText: "Highest Rated" },
  { optionId: "NEWEST", displayText: "Newest" },
];

const getSortedProducts = (products, activeSortOption) => {
  switch (activeSortOption) {
    case "PRICE_LOW":
      return [...products].sort((a, b) => a.price - b.price);
    case "PRICE_HIGH":
      return [...products].sort((a, b) => b.price - a.price);
    case "RATING":
      return [...products].sort((a, b) => b.rating - a.rating);
    case "NEWEST":
      return [...products].sort((a, b) => b.id - a.id);
    default:
      return products;
  }
};

const Products = () => {
  const [productsList, setProductsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSortOption, setActiveSortOption] = useState("DEFAULT");
  const [skip, setSkip] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const getCategories = async () => {
      const response = await fetch(CATEGORIES_API);
      const data = await response.json();
      // console.log(response);
      // console.log(data);
      const formattedCategories = data.map((item) =>
        typeof item === "string" ? { slug: item, name: item } : item,
      );
      setCategoriesList(formattedCategories);
    };

    getCategories();
  }, []);

  const getProducts = async (currentSkip = 0, shouldAppend = false) => {
    setIsLoading(true);
    setErrorMsg("");

    try {
      let apiUrl = PAGINATION_API(limit, currentSkip);

      if (activeCategory !== "all") {
        apiUrl = PRODUCTS_BY_CATEGORY_API(activeCategory);
      }

      if (searchInput.trim() !== "") {
        apiUrl = SEARCH_PRODUCTS_API(searchInput.trim());
      }

      const response = await fetch(apiUrl);
      const data = await response.json();
      // console.log(data);
      // const products =
      //   searchInput.trim() !== "" && activeCategory !== "all"
      //     ? data.products.filter(
      //         (product) => product.category === activeCategory,
      //       )
      //     : data.products || [];

      const products = data.products || [];

      setProductsList((prevProductsList) =>
        shouldAppend ? [...prevProductsList, ...products] : products,
      );
      setTotalProducts(data.total || products.length);
    } catch (error) {
      setErrorMsg("Unable to fetch products. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setSkip(0);
    getProducts(0, false);
  }, [activeCategory]);

  const onSubmitSearch = (event) => {
    event.preventDefault();
    setSkip(0);
    getProducts(0, false);
  };

  const onClickLoadMore = () => {
    const nextSkip = skip + limit;
    setSkip(nextSkip);
    getProducts(nextSkip, true);
  };

  const showLoadMore =
    activeCategory === "all" &&
    searchInput.trim() === "" &&
    productsList.length < totalProducts;
  const sortedProductsList = getSortedProducts(productsList, activeSortOption);

  return (
    <main className="products-page page-fade">
      <section className="products-top-section">
        <div>
          <p className="section-label">Product listing route</p>
          <h1>Explore Products</h1>
        </div>
        <form className="search-form" onSubmit={onSubmitSearch}>
          <FiSearch />
          <input
            type="search"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Search products"
          />
          <button type="submit">Search</button>
        </form>
      </section>
      <section className="sort-section">
        <label htmlFor="sortProducts">Sort By:</label>
        <select
          id="sortProducts"
          value={activeSortOption}
          onChange={(event) => setActiveSortOption(event.target.value)}
        >
          {sortOptions.map((eachOption) => (
            <option key={eachOption.optionId} value={eachOption.optionId}>
              {eachOption.displayText}
            </option>
          ))}
        </select>
      </section>
      <div className="products-layout">
        <aside className="filters-card">
          <h2>Categories</h2>
          <button
            type="button"
            className={
              activeCategory === "all" ? "category-btn active" : "category-btn"
            }
            onClick={() => setActiveCategory("all")}
          >
            All Products
          </button>
          {categoriesList.map((eachCategory) => (
            <button
              type="button"
              key={eachCategory.slug}
              className={
                activeCategory === eachCategory.slug
                  ? "category-btn active"
                  : "category-btn"
              }
              onClick={() => setActiveCategory(eachCategory.slug)}
            >
              {eachCategory.name}
            </button>
          ))}
        </aside>
        <section className="products-results-section">
          {isLoading && productsList.length === 0 ? (
            <Loader />
          ) : (
            <>
              {errorMsg !== "" && <p className="error-message">{errorMsg}</p>}
              {productsList.length === 0 && errorMsg === "" ? (
                <div className="empty-view">
                  <h2>No products found</h2>
                  <p>Try a different search or category.</p>
                </div>
              ) : (
                <ul className="products-grid">
                  {sortedProductsList.map((eachProduct) => (
                    <ProductCard
                      key={eachProduct.id}
                      productDetails={eachProduct}
                    />
                  ))}
                </ul>
              )}
              {showLoadMore && (
                <button
                  type="button"
                  className="secondary-button load-more-button"
                  onClick={onClickLoadMore}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Load More"}
                </button>
              )}
            </>
          )}
        </section>
      </div>
    </main>
  );
};

export default Products;
