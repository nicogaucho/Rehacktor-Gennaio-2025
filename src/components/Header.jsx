import { useEffect } from "react";
import logoURL from "../assets/logo.png";
import { Link } from "react-router";
import supabase from "../supabase/client";

export default function Header() {

  const signOut = async () => {
    await supabase.auth.signOut();
  }

  useEffect(() => {
    const getInfo = async () => {
      const { data } = await supabase.auth.getSession();
      console.log(data);
      const { data: { user } } = await supabase.auth.getUser()
      console.log(user);
    }
    getInfo();
  }, []);


  return (
    <nav>
      <ul>
        <Link to="/">
          <img src={logoURL} width={300} alt="logo Reacktor" />
        </Link>
      </ul>
      <ul>
        <li>
          <Link to="/login">
            Login
          </Link>
        </li>
        <li>
          <Link to="/register">
            Register
          </Link>
        </li>
        <li>
          <button onClick={signOut}>Logout</button>
        </li>
      </ul>
    </nav>
  );
}
