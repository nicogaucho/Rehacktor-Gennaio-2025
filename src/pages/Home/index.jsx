import useFetchSolution from "../../hooks/useFetchSolution";
import styles from "./Home.module.css";
import GameCard from "../../components/GameCard";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

// https://api.rawg.io/api/games?key=API_KEY&search=

export default function Home() {

  const initialUrl = `https://api.rawg.io/api/games?key=9269195f491e44539d7a2d10ce87ab15&dates=2024-01-01,2024-12-31&page=1`;

  const { games } = useFetchSolution(initialUrl);
  
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (games.items.length && inView && !games.isLoading) {
      games.loadMore();
    }
  }, [inView, games]);
  
  return (
    <div className={styles.main}>
      <div>
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
        {games.isLoading && (
          <img
            style={{ width: "100%", height: "100vh" }}
            alt="loading"
            id="loadingImages"
            src="https://i.imgur.com/LVHmLnb.gif"
          />
        )}
        <div className={styles.games_wrapper}>
          {games &&
            games.items.map((game) => <GameCard key={game.id} game={game} />)}
        </div>
        <div ref={ref} aria-busy="true" className="loading"></div>
      </div>
    </div>
  );
}
