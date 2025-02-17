import { useEffect } from "react";
import { useSearchParams } from "react-router";
import useFetchSolution from "../../hooks/useFetchSolution";
import GameCard from '../../components/GameCard';
import styles from "../Home/Home.module.css";

export default function Search() {
  let [searchParams] = useSearchParams();
  const game = searchParams.get("query");

  const initialUrl = `https://api.rawg.io/api/games?key=9269195f491e44539d7a2d10ce87ab15&search=${game}`;

  const { loading, data, error, updateUrl } = useFetchSolution(initialUrl);

  useEffect(() => {
    updateUrl(initialUrl);
  }, []);

  return (
    <div className="container">
      <h1>{searchParams.get("query")} game</h1>
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
  );
}
