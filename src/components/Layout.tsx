import {
  AppBar,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { fade } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import BookmarksIcon from "@material-ui/icons/Bookmarks";
import GetAppIcon from "@material-ui/icons/GetApp";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import RestoreIcon from "@material-ui/icons/Home";
import clsx from "clsx";
import { useRouter } from "next/router";
import React from "react";
import { withA2HS } from "../hocs/a2hs";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    height: "100%",
    width: "100%",
  },
  nav: {
    position: "fixed",
    bottom: 0,
    width: "100%",
  },
  title: {
    display: "block",
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    width: "100%",
    marginLeft: theme.spacing(2),
    flexGrow: 1,
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  hide: {
    display: "none",
  },
  headerTitle: {
    display: "flex",
  },
  logo: {
    marginRight: theme.spacing(2),
  },
}));

const Layout = ({
  children,
  hideBottom,
  isAppInstallable,
  isAppInstalled,
  deferredPrompt,
  back = null,
}) => {
  const classes = useStyles();
  const router = useRouter();
  const [value, setValue] = React.useState(window.location.pathname);

  const handleChange = (event, newValue) => {
    router.push(newValue);
    setValue(newValue);
  };

  let basePath = value.split("/");
  basePath.shift();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          {back ? (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={back}
            >
              <ArrowBackIcon />
            </IconButton>
          ) : null}
          <div className={classes.headerTitle}>
            <img
              className={classes.logo}
              height={32}
              width={32}
              src={"/icon.png"}
            />
            <Typography className={classes.title} variant="h6">
              FODMAPs
            </Typography>
          </div>
          {isAppInstallable && !isAppInstalled ? (
            <div>
              <IconButton
                edge="end"
                aria-label="account of current user"
                onClick={() => deferredPrompt.prompt()}
              >
                <GetAppIcon style={{ color: "white" }} />
              </IconButton>
            </div>
          ) : null}
        </Toolbar>
      </AppBar>
      {children}
      <BottomNavigation
        value={basePath.length > 0 ? `/${basePath[0]}` : value}
        onChange={handleChange}
        className={clsx(classes.nav, {
          [classes.hide]: hideBottom,
        })}
      >
        <BottomNavigationAction
          label="Listado"
          value="/"
          icon={<RestoreIcon />}
        />
        <BottomNavigationAction
          label="Categorias"
          value="/categorias"
          icon={<BookmarksIcon />}
        />
        <BottomNavigationAction
          label="Autores"
          value="/autores"
          icon={<HelpOutlineIcon />}
        />
      </BottomNavigation>
    </div>
  );
};

export default withA2HS(Layout);
