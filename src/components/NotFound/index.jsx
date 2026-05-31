import { Link } from "react-router";
import "./index.css";
import Error404 from "../../assets/images/Error404.png";

const NotFound = () => (
  <main className="not-found-page">
    <img src={Error404} alt="not found" className="not-found-img" />
    <h1>Page Not Found</h1>
    <Link to="/" className="primary-button">
      Go Home
    </Link>
  </main>
);

export default NotFound;
