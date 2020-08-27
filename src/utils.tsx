export const calcConsumtionColor = (consumption) =>
    consumption === "free"
        ? "#CDFFCD"
        : consumption === "limited"
        ? "#FFFFCD"
        : consumption === "no"
        ? "#FFCDCD"
        : "#fff";

export const getCards = async (key) => {
    let id = "1AKWaP-FNisOL025QW4A_v2ZOiPO1YzzBGpkzdTitUN0";
    let response = await fetch(
        `https://spreadsheets.google.com/feeds/cells/${id}/1/public/full?alt=json`
    );

    let result = await response.json();

    if (response.status !== 200) {
        return null;
    }

    if (!result.feed && !result.feed.entry) {
        return null;
    }

    let data = result.feed.entry;
    let size = 4;

    data.splice(0, size);

    let arrays = [];

    let i, j, temparray;
    for (i = 0, j = data.length; i < j; i += size) {
        temparray = data.slice(i, i + size);
        // do whatever
        arrays.push({
            name: temparray[0].content.$t,
            category: temparray[1].content.$t,
            limited: temparray[2].content.$t,
            notes:
                temparray[3].content.$t === "_empty_"
                    ? null
                    : temparray[3].content.$t,
        });
    }

    const categories = Array.from(
        new Set(arrays.map(({ category }) => category))
    );

    return { foods: sortFooItemsByConsumption(arrays), categories };
};

export const consumptionArr = ["free", "limited", "no", "?"];

export const sortFooItemsByConsumption = (items) =>
    consumptionArr
        .map((c) =>
            items
                .filter(({ limited }) => limited === c)
                .sort((a, b) => a.name > b.name)
        )
        .reduce((acc, v) => [...acc, ...v]);

export const sanitizeStr = (str) =>
    str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

export const firstLetterUpper = (str) =>
    `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
