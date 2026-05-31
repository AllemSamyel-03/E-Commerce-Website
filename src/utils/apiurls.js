const BASE_URL = "https://dummyjson.com";

export const PRODUCTS_API = `${BASE_URL}/products`;

export const SINGLE_PRODUCT_API = (id) => `${BASE_URL}/products/${id}`;

export const SEARCH_PRODUCTS_API = (query) =>
  `${BASE_URL}/products/search?q=${query}`;

export const CATEGORIES_API = `${BASE_URL}/products/categories`;

export const PRODUCTS_BY_CATEGORY_API = (category) =>
  `${BASE_URL}/products/category/${category}`;

export const SIMILAR_PRODUCTS_API = (category) =>
  `${BASE_URL}/products/category/${category}`;

export const PAGINATION_API = (limit, skip) =>
  `${BASE_URL}/products?limit=${limit}&skip=${skip}`;
