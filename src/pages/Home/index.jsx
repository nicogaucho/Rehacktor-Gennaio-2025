import useFetchSolution from "../../hooks/useFetchSolution";
import styles from "./Home.module.css";
import GameCard from "../../components/GameCard";

export default function Home() {
  const initialUrl =
    "https://api.rawg.io/api/games?key=9269195f491e44539d7a2d10ce87ab15&dates=2024-01-01,2024-12-31&page=1";

  const { loading, data, error } = useFetchSolution(initialUrl);

  return (
    <div className={styles.main}>
      <div className={styles.games}>
        <div className={styles.heading}>
          <div style={{ width: "50%" }}>
            <h1>New and trending</h1>
            <p>Based on player counts and release date</p>
          </div>
          <div style={{ width: "50%" }}>
            <form>
              <fieldset role="group">
                <input type="text" name="search" placeholder="Search a game" />
                <input type="submit" value="Go" />
              </fieldset>
            </form>
          </div>
        </div>
        <div className={styles.games_wrapper}>
          {loading && <progress />}
          {error && <h1>{error}</h1>}
          {data &&
            data.results.map((game) => <GameCard key={game.id} game={game} />)}
        </div>
      </div>
    </div>
  );
}
