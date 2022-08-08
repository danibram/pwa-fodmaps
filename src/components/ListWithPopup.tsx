import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Slide,
} from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { calcConsumtionColor } from "../lib/utils";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    height: "calc(100% - 64px - 56px)",
  },
  rootHided: {
    height: "calc(100% - 64px)",
  },
  centerContent: {
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    display: "flex",
  },
  marginTop5: {
    marginTop: theme.spacing(5),
  },
  marginTop2: {
    marginTop: theme.spacing(2),
  },
  marginTop1: {
    marginTop: theme.spacing(1),
  },
  listSection: {
    backgroundColor: "inherit",
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#dcdcdc",
    width: "100%",
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
    width: "100%",
    cursor: "pointer",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
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
}));

const ListWithPopup = ({ cards }) => {
  const classes = useStyles();

  const [hideBottom, setHideBottom] = React.useState(false);
  const [cardsFiltered, setCardFiltered] = React.useState(cards.foods);
  const [open, setOpen] = React.useState(false);
  const [openInfo, setOpenInfo] = React.useState(null);
  const [categoriesFiltered, setCategories] = React.useState(cards.categories);
  const handleClose = () => setOpen(false);

  return (
    <>
      <List className={clsx(classes.root)}>
        {cards.length === 0 ? (
          <ListItem key={`no-items`}>{`No hay alimentos...`}</ListItem>
        ) : null}

        {cards.map((item) => (
          <ListItem
            button
            key={`item-${item.limited}-${item.name}`}
            style={{
              backgroundColor: calcConsumtionColor(item.limited),
            }}
            onClick={() => {
              setOpen(true);
              setOpenInfo(item);
            }}
          >
            <ListItemText primary={`${item.name}`} />
          </ListItem>
        ))}
      </List>
      <Dialog
        TransitionComponent={Transition}
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {openInfo && openInfo.name}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {openInfo
              ? openInfo.notes
                ? openInfo.notes
                : openInfo.limited && openInfo.limited === "free"
                ? "Este alimento no tiene restricciones"
                : openInfo.limited && openInfo.limited === "no"
                ? "Este alimento esta totalmente prohibido"
                : "No sabemos aun si puedes o no"
              : null}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ListWithPopup;
