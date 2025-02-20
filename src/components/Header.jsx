import { useEffect } from "react";
import logoURL from "../assets/logo.png";
import { Link, useNavigate } from "react-router";
import supabase from "../supabase/client";
import { useContext, useState } from "react";
import SessionContext from "../context/SessionContext";
import { Toaster, toast } from "sonner";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

export default function Header() {
  const navigate = useNavigate();
  const { session } = useContext(SessionContext);
  const [username, setUsername] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  useEffect(() => {
    let ignore = false;
    async function getProfile() {
      if (session) {
        const { user } = session;

        const { data, error } = await supabase
          .from("profiles")
          .select(`username, avatar_url`)
          .eq("id", user.id)
          .single();

        if (!ignore) {
          if (error) {
            console.warn(error);
          } else if (data) {
            setUsername(data.username);
            setAvatarUrl(data.avatar_url);
          }
        }
      }
    }

    getProfile();

    return () => {
      ignore = true;
    };
  }, [session]);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out!");
    await new Promise((resolve) => setTimeout(resolve, 500));
    navigate("/");
  };

  return (
    <>
      <nav>
        <ul>
          <Link to="/">
            <img src={logoURL} width={300} alt="logo Reacktor" />
          </Link>
        </ul>
        <ul>
          {session ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="" src={`https://idtaypunngilnmigargo.supabase.co/storage/v1/object/public/avatars/${avatar_url}`} />
                </IconButton>
                <Typography
                  sx={{ textAlign: "center", p: 0, cursor: "pointer" }}
                  onClick={handleOpenUserMenu}
                >
                  {session && username}
                </Typography>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: "center" }}>
                    <Link to={"/account"} style={{ textDecoration: "none" }}>
                      Account
                    </Link>
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography
                    sx={{ textAlign: "center", color: "black" }}
                    onClick={signOut}
                  >
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <Toaster position="bottom-center" />
    </>
  );
}
