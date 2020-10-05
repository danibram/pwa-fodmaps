import { Grid, makeStyles, Typography } from "@material-ui/core";
import clsx from "clsx";
import Head from "next/head";
import React from "react";
import Layout from "../src/components/Layout";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        backgroundColor: theme.palette.background.paper,
        position: "relative",
        overflow: "auto",
        height: "calc(100% - 64px - 56px - 35px)",
    },
    rootHided: {
        height: "calc(100% - 64px -  35px)",
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

const Category = () => {
    const classes = useStyles();

    return (
        <>
            <Head>
                <title>FODMAPs: Sobre la PWA</title>
                <meta name="description" content="FODMAPs Sobre la PWA" />
            </Head>
            <Layout>
                <Grid
                    item
                    xs={12}
                    className={clsx(classes.marginTop2, classes.centerContent)}
                >
                    <Typography variant="body1">
                        {"Hecho con "}
                        <span role="img" aria-label="github">
                            ❤️
                        </span>
                        {" por "}
                        <a href="" rel="noopener noreferrer" target="_blank">
                            Laura
                        </a>
                        {" & "}
                        <a
                            href="https://dbr.io/"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            Dani
                        </a>
                    </Typography>
                </Grid>
            </Layout>
        </>
    );
};

export default Category;
