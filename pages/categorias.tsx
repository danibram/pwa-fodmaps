import { Grid, makeStyles, Typography } from "@material-ui/core";
import clsx from "clsx";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import Layout from "../src/components/Layout";
import Loader from "../src/components/Loader";
import { getCards, sanitizeStr } from "../src/utils";

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

export const withCards = (Component: any) => (props) => {
    const router = useRouter();

    const { data, revalidate } = useSWR("cards", getCards);

    if (!data) {
        return <Loader />;
    }

    return <Component {...props} cards={data} />;
};

const Index = ({ cards }) => {
    const classes = useStyles();
    const router = useRouter();
    const [hideBottom, setHideBottom] = React.useState(false);
    const [cardsFiltered, setCardFiltered] = React.useState(cards.foods);
    const [categoriesFiltered, setCategories] = React.useState(
        cards.categories
    );
    const [filter, setFilter] = React.useState("");

    const handleChange = (event) => {
        setFilter(event.target.value);
        if (event.target.value === "") {
            setCardFiltered(cards.foods);
            setCategories(cards.categories);
        } else {
            let filteredFoods = cards.foods.filter(
                (o) =>
                    sanitizeStr(o.name).indexOf(
                        event.target.value.toLowerCase()
                    ) > -1
            );
            setCardFiltered(filteredFoods);
            setCategories(
                Array.from(
                    new Set(filteredFoods.map(({ category }) => category))
                )
            );
        }
    };

    const handleBlur = () => {
        console.log("handleBlur");
        setHideBottom(false);
    };

    const handleFocus = (event) => {
        console.log("handleFocus");
        setHideBottom(true);
    };

    return (
        <>
            <Head>
                <title>FODMAPs: Guia rapida de alimentos</title>
                <meta
                    name="description"
                    content="FODMAPs guia rapida de alimentos"
                />
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

export default withCards(Index);
