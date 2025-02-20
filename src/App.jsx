import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router";
import Markup from "./layout/index";
import Home from "./pages/Home/index";
import Genre from "./pages/Genre/index";
import Game from "./pages/Game/index";
import SignUp from "./pages/SignUp/index";
import SignIn from "./pages/SignIn/index";
import Account from "./pages/Account";
import Search from "./pages/Search/index";
import Review from "./pages/Review";
import SessionContextProvider from "./context/SessionContextProvider";
import SessionContext from "./context/SessionContext";
import FavContextProvider from "./context/FavContextProvider";

export function ProtectedRoute() {
  const { session } = useContext(SessionContext);
  if (!session) {
    return <Navigate to={"/"} />;
  }
  return <Outlet />;
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Markup />}>
          <Route path="/" element={<Home />} />
          <Route path="/games/:genre" element={<Genre />} />
          <Route path="/games/:id/:game" element={<Game />} />
          <Route path="/games/review/:id" element={<Review />} />
          <Route path="/search" element={<Search />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/account" element={<Account />} />
          </Route>
        </Route>
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

function Root() {
  return (
    <SessionContextProvider>
      <FavContextProvider>
        <App />
      </FavContextProvider>
    </SessionContextProvider>
  );
}

export default Root;
