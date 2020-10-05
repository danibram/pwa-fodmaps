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
    ListSubheader,
    makeStyles,
} from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import Slide from "@material-ui/core/Slide";
import SearchIcon from "@material-ui/icons/Search";
import clsx from "clsx";
import dayjs from "dayjs";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import Highlighter from "react-highlight-words";
import useSWR from "swr";
import Layout from "../src/components/Layout";
import Loader from "../src/components/Loader";
import {
    calcConsumtionColor,
    firstLetterUpper,
    getCards,
    sanitizeStr,
} from "../src/utils";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

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

    if (data) {
        localStorage.setItem("cards", JSON.stringify(data));
        localStorage.setItem("lastSync", JSON.stringify(dayjs().valueOf()));

        return <Component {...props} cards={data} />;
    }

    let localCards = localStorage.getItem("cards");

    try {
        localCards = JSON.parse(localCards);
    } catch (e) {
        localCards = null;
    }

    if (!localCards && !data) {
        return <Loader />;
    }

    return <Component {...props} cards={localCards} />;
};

const Index = ({ cards }) => {
    const classes = useStyles();
    const router = useRouter();
    const [hideBottom, setHideBottom] = React.useState(false);
    const [cardsFiltered, setCardFiltered] = React.useState(cards.foods);
    const [open, setOpen] = React.useState(false);
    const [openInfo, setOpenInfo] = React.useState(null);
    const [categoriesFiltered, setCategories] = React.useState(
        cards.categories
    );
    const [filter, setFilter] = React.useState("");
    const handleClose = () => setOpen(false);
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
                    content="FODMAPS: Guia rapida de alimentos"
                />
            </Head>
            <Layout hideBottom={hideBottom}>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        placeholder="Alimento a buscar . . ."
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ "aria-label": "search" }}
                        onChange={handleChange}
                    />
                </div>
                <List
                    className={clsx(classes.root, {
                        [classes.rootHided]: hideBottom,
                    })}
                    subheader={<li />}
                >
                    {categoriesFiltered.map((category) => (
                        <li
                            key={`section-${category}`}
                            className={classes.listSection}
                        >
                            <ul className={classes.ul}>
                                <ListSubheader>{`${firstLetterUpper(
                                    category
                                )}`}</ListSubheader>
                                {cardsFiltered
                                    .filter(
                                        (food) => food.category === category
                                    )
                                    .map((item) => (
                                        <ListItem
                                            button
                                            key={`item-${category}-${item.limited}-${item.name}`}
                                            style={{
                                                backgroundColor: calcConsumtionColor(
                                                    item.limited
                                                ),
                                            }}
                                            onClick={() => {
                                                setOpen(true);
                                                setOpenInfo(item);
                                            }}
                                        >
                                            {filter !== "" &&
                                            filter.length > 2 ? (
                                                <ListItemText
                                                    primary={
                                                        <Highlighter
                                                            searchWords={[
                                                                filter,
                                                            ]}
                                                            autoEscape={true}
                                                            textToHighlight={
                                                                item.name
                                                            }
                                                        />
                                                    }
                                                />
                                            ) : (
                                                <ListItemText
                                                    primary={`${item.name}`}
                                                />
                                            )}
                                        </ListItem>
                                    ))}
                            </ul>
                        </li>
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
                                    : openInfo.limited &&
                                      openInfo.limited === "free"
                                    ? "Este alimento no tiene restricciones"
                                    : openInfo.limited &&
                                      openInfo.limited === "no"
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
                {/* <MdxTagParse>
                    <General />
                </MdxTagParse>

                <Grid
                    item
                    xs={12}
                    className={clsx(classes.marginTop2, classes.centerContent)}
                >
                    <Typography variant="body1">
                        {"Made with "}
                        <span role="img" aria-label="github">
                            ❤️
                        </span>
                        {" by "}
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
                </Grid> */}
            </Layout>
        </>
    );
};

export default withCards(Index);
