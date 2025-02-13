import { BrowserRouter, Routes, Route } from "react-router";
import Markup from './layout/index';
import Home from './pages/Home/index';
import Genre from './pages/Genre/index';
import Game from './pages/Game/index';
import SignUp from './pages/SignUp/index';
import SignIn from './pages/SignIn/index';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Markup />}>
          <Route path="/" element={<Home />} />
          <Route path="/games/:genre" element={<Genre />} />
          <Route path="/games/:id/:game" element={<Game />} />
        </Route>
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

function Root() {
  return <App />;
}

export default Root;
