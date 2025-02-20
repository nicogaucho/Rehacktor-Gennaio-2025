import { useContext } from "react";
import { Link } from 'react-router';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import FavContext from "../../../context/FavContext";
import { formatDate } from "../../../utils/formatDate";

export default function Favourites() {
  const { fav } = useContext(FavContext);

  return (
    <List sx={{ width: "100%", maxWidth: 360 }}>
      {fav.length === 0 && <p>Non ci sono giochi preferiti al momento.</p>}
      {fav &&
        fav.map((game) => (
          <>
            <Link to={`/games/${game.game_id}/${game.game_name}`} style={{ 
              textDecoration: "none",
              color: "white"
            }}>
              <ListItem alignItems="flex-start" key={game.id}>
                <ListItemAvatar>
                  <Avatar alt={game.game_name} src={game.game_image} />
                </ListItemAvatar>
                <ListItemText
                  primary={game.game_name}
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: "gray" }}
                      >
                        Aggiunto il:{" "}
                        {formatDate(game.created_at)}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            </Link>
            <Divider />
          </>
        ))}
    </List>
  );
}
