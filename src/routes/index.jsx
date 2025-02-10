import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";
import Markup from "../layout";
import Home from '../pages/Home';
import Genre from '../pages/Genre';
import Game from "../pages/Game";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Markup />}>
      <Route path="/" element={<Home />}/>
      <Route path="/games/:genre" element={<Genre />}/>
      <Route path="/games/:id/:game" element={<Game />}/>
    </Route>
  )
);

/* const router = createBrowserRouter([
  {
    path: "/",
    element: <Markup />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/games/genre",
        element: <Genre />,
      },
    ],
  },
]); */


export default router;