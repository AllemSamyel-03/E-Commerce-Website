import { use, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FiLock, FiMail, FiShoppingBag, FiUser } from "react-icons/fi";
import AuthContext from "../../context/AuthContext";
import "./index.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { signupUser } = use(AuthContext);
  const navigate = useNavigate();

  const onSubmitSignup = (event) => {
    event.preventDefault();
    const result = signupUser({ name, email, password });

    if (result.isSuccess) {
      navigate("/", { replace: true });
    } else {
      setErrorMsg(result.message);
    }
  };

  return (
    <div className="auth-page signup-page">
      <div className="auth-image-section">
        <div className="auth-image-content">
          <div className="auth-logo">
            <FiShoppingBag />
            <span>ShopEase</span>
          </div>
          <h1>Create your shopping space</h1>
          <p>
            Save favorites, manage cart items, and continue your store journey
            anytime.
          </p>
        </div>
      </div>
      <form className="auth-card" onSubmit={onSubmitSignup}>
        <h1>Sign Up</h1>
        <p className="auth-subtitle">Start your ShopEase account</p>
        <label htmlFor="signupName">Name</label>
        <div className="input-field">
          <FiUser />
          <input
            id="signupName"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter name"
            required
          />
        </div>
        <label htmlFor="signupEmail">Email</label>
        <div className="input-field">
          <FiMail />
          <input
            id="signupEmail"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter email"
            required
          />
        </div>
        <label htmlFor="signupPassword">Password</label>
        <div className="input-field">
          <FiLock />
          <input
            id="signupPassword"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Create password"
            minLength="6"
            required
          />
        </div>
        {errorMsg !== "" && <p className="error-message">{errorMsg}</p>}
        <button type="submit" className="primary-button full-width-button">
          Create Account
        </button>
        <p className="auth-link-text">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
