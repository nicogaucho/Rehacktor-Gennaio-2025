/* eslint-disable react/prop-types */
import { useState } from "react";
import { useEffect } from "react";
import supabase from "../../../supabase/client";

export default function GameReviews({ game }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const readReviews = async () => {
      if (game) {
        let { data: reviews, error } = await supabase
          .from("reviews")
          .select("*")
          .eq("game_id", game.id);
        if (error) {
          console.log(error);
        } else {
          console.log(reviews);
          setReviews(reviews);
        }
      }
    };
    readReviews();
  }, [game]);

  return (
    <>
      <h2>Lista reviews</h2>
      {reviews.map((review) => (
        <article key={review.id}>
          <h2>{review.review_title}</h2>
          <p>{review.review_content}</p>
        </article>
      ))}
    </>
  );
}
