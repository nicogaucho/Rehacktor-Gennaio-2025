import { useParams } from "react-router";
import useFetchSolution from "../../hooks/useFetchSolution";
import styles from "../Home/Home.module.css";
import GameCard from "../../components/GameCard";
import { useEffect } from "react";

export default function Genre() {
  const { genre } = useParams();
  const initialUrl = `https://api.rawg.io/api/games?key=9269195f491e44539d7a2d10ce87ab15&genres=${genre}&page=1`;

  const { loading, data, error, updateUrl } = useFetchSolution(initialUrl);

  useEffect(() => {
    updateUrl(initialUrl);
  }, [genre]);

  return (
    <div className={styles.main}>
      <div className={styles.games}>
        <div className={styles.heading}>
          <div>
            <h1>{genre} Games</h1>
            <p>Based on player counts and release date</p>
          </div>
        </div>
        {loading && (
          <img
            style={{ width: "100%", height: "100vh" }}
            alt="loading"
            id="loadingImages"
            src="https://i.imgur.com/LVHmLnb.gif"
          />
        )}
        {error && <h1>{error}</h1>}
        <div className={styles.games_wrapper}>
          {data &&
            data.results.map((game) => <GameCard key={game.id} game={game} />)}
        </div>
      </div>
    </div>
  );
}
