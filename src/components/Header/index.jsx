import { use, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import {
  FiHeart,
  FiHome,
  FiLogOut,
  FiMenu,
  FiShoppingBag,
  FiShoppingCart,
  FiX,
} from "react-icons/fi";
import AuthContext from "../../context/AuthContext";
import CartContext from "../../context/CartContext";
import "./index.css";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { currentUser, logoutUser } = use(AuthContext);
  const { cartList, wishlist } = use(CartContext);
  const navigate = useNavigate();

  const onClickLogout = () => {
    logoutUser();
    navigate("/login", { replace: true });
  };

  const closeMenu = () => setShowMenu(false);

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <Link to="/" className="website-logo" onClick={closeMenu}>
          <FiShoppingBag />
          <span>ShopEase</span>
        </Link>
        <button
          type="button"
          className="mobile-menu-button"
          onClick={() => setShowMenu((prevValue) => !prevValue)}
          aria-label="Toggle navigation"
        >
          {showMenu ? <FiX /> : <FiMenu />}
        </button>
        <div className={`nav-links-container ${showMenu ? "show-menu" : ""}`}>
          <NavLink to="/" className="nav-link" onClick={closeMenu}>
            <FiHome /> Home
          </NavLink>
          <NavLink to="/products" className="nav-link" onClick={closeMenu}>
            <FiShoppingBag /> Products
          </NavLink>
          <NavLink
            to="/wishlist"
            className="nav-link badge-link"
            onClick={closeMenu}
          >
            <FiHeart /> Wishlist <span>{wishlist.length}</span>
          </NavLink>
          <NavLink
            to="/cart"
            className="nav-link badge-link"
            onClick={closeMenu}
          >
            <FiShoppingCart /> Cart <span>{cartList.length}</span>
          </NavLink>
          <p className="user-name">Hi, {currentUser?.name}</p>
          <button
            type="button"
            className="logout-button"
            onClick={onClickLogout}
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
