// import { useEffect, useState } from "react";
import logoURL from "../assets/logo.png";
import { Link, useNavigate } from "react-router";
import supabase from "../supabase/client";
import { useContext } from "react";
import SessionContext from "../context/SessionContext";
import { Toaster, toast } from "sonner";

export default function Header() {
  const navigate = useNavigate();
  const { session, user } = useContext(SessionContext);

  const signOut = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out!");
    await new Promise((resolve) => setTimeout(resolve, 500));
    navigate("/");
  };

  return (
    <>
      <nav>
        <ul>
          <Link to="/">
            <img src={logoURL} width={300} alt="logo Reacktor" />
          </Link>
        </ul>
        <ul>
          {session ? (
            <li>
              <details className="dropdown">
                <summary>{user && user.user_metadata.username }</summary>
                <ul dir="rtl" style={{ padding: "5px 10px" }}>
                  <li>
                    <Link to={"/account"}>Account</Link>
                  </li>
                  <button onClick={signOut}>Logout</button>
                </ul>
              </details>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <Toaster position="bottom-center" />
    </>
  );
}
