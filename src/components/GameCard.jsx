/* eslint-disable react/prop-types */
import { useNavigate } from "react-router";
// import { motion } from "framer-motion";
import { useState } from "react";
import GameImage from "./GameImage";

export default function GameCard({ game }) {
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(true);
  const genres = game.genres.map((genre) => genre.name).join(", ");

  return (
    <article
      className="navigationEffect"
      onMouseEnter={() => setHidden(false)}
      onMouseLeave={() => setHidden(true)}
      onClick={() => navigate(`/games/${game.id}/${game.name}`)}
    >
      <GameImage image={game.background_image} />
      <small>{genres}</small>
      <h4>{game.name}</h4>
      {hidden && <small>read more...</small>}
      {!hidden && <div>serie di infor..</div>}
    </article>
  );
}
