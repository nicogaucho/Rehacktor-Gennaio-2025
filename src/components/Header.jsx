import logoURL from "../assets/logo.png";
import { Link } from "react-router";

export default function Header() {
  return (
    <nav>
      <ul>
        <Link to="/">
          <img src={logoURL} width={300} alt="logo Reacktor" />
        </Link>
      </ul>
      <ul>
        <li>
          <a href="#" className="contrast">
            Login
          </a>
        </li>
        <li>
          <a href="#" className="contrast">
            Register
          </a>
        </li>
      </ul>
    </nav>
  );
}
