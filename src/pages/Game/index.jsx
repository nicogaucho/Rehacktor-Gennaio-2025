import { useParams } from "react-router";
import useFetchSolution from "../../hooks/useFetchSolution";

export default function Game() {
  const { id } = useParams();

  const initialUrl = `https://api.rawg.io/api/games/${id}?key=9269195f491e44539d7a2d10ce87ab15`;

  const { loading, data, error } = useFetchSolution(initialUrl);

  return (
    <div className="container">
      {loading && (
        <img
          style={{ width: "100%", height: "100vh" }}
          alt="loading"
          id="loadingImages"
          src="https://i.imgur.com/LVHmLnb.gif"
        />
      )}
      {error && <h1>{error}</h1>}
      <img src={data && data.background_image} alt="" />
      <h1>{data && data.name}</h1>
      <p>{data && data.description_raw}</p>
      <p>{data && data.rating}</p>
      <p>{data && data.released}</p>
    </div>
  );
}
