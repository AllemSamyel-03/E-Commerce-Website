import { use, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FiLock, FiMail } from "react-icons/fi";
import AuthContext from "../../context/AuthContext";
import "./index.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { loginUser } = use(AuthContext);
  const navigate = useNavigate();

  const onSubmitLogin = (event) => {
    event.preventDefault();
    const result = loginUser({ email, password });

    if (result.isSuccess) {
      navigate("/", { replace: true });
    } else {
      setErrorMsg(result.message);
    }
  };

  return (
    <div className="auth-page login-page">
      <div className="auth-image-section">
        <div>
          <h1>Shop smarter every day</h1>
          <p>
            Discover daily essentials, gadgets, fashion, and home picks in one
            simple store.
          </p>
        </div>
      </div>
      <form className="auth-card" onSubmit={onSubmitLogin}>
        <h1>Login</h1>
        <p className="auth-subtitle">Welcome back to ShopEase</p>
        <label htmlFor="loginEmail">Email</label>
        <div className="input-field">
          <FiMail />
          <input
            id="loginEmail"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter email"
            required
          />
        </div>
        <label htmlFor="loginPassword">Password</label>
        <div className="input-field">
          <FiLock />
          <input
            id="loginPassword"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter password"
            required
          />
        </div>
        {errorMsg !== "" && <p className="error-message">{errorMsg}</p>}
        <button type="submit" className="primary-button full-width-button">
          Login
        </button>
        <p className="auth-link-text">
          New here? <Link to="/signup">Create account</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
