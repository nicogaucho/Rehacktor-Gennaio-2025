import { useEffect, useState } from "react";
import { Link } from "react-router";
import styles from "../pages/Home/Home.module.css";

const url =
  "https://api.rawg.io/api/genres?key=9269195f491e44539d7a2d10ce87ab15";

const style = {
  height: "300px",
  overflowY: "scroll"
}

export default function Sidebar() {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const response = await fetch(url);
      const json = await response.json();
      setGenres(json.results);
    }
    fetchGenres();
  }, []);

  return (
    <div className={styles.sidebar}>
      <details className="dropdown">
        <summary>Genres</summary>
        <ul style={style}>
          {genres.map((genre) => (
            <li key={genre.id}>
              <Link to={`/games/${genre.slug}`}>{genre.name}</Link>
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}
