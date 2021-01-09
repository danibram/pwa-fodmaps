import {
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import clsx from "clsx";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { withCards } from "..";
import Layout from "../../src/components/Layout";
import { firstLetterUpper } from "../../src/utils";

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

const Index = ({ cards }) => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>FODMAPs: Guia rapida de alimentos</title>
        <meta name="description" content="FODMAPs guia rapida de alimentos" />
      </Head>
      <Layout>
        <List className={clsx(classes.root)} subheader={<li />}>
          {cards.categories.map((category) => (
            <ListItem
              button
              key={`item-${category}`}
              onClick={() => router.push(`/categorias/${category}`)}
            >
              <ListItemText primary={`${firstLetterUpper(category)}`} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="comments">
                  <ArrowForwardIosIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Layout>
    </>
  );
};

export default withCards(Index);
