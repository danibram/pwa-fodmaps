export const calcConsumtionColor = (consumption) =>
  consumption === "free"
    ? "#CDFFCD"
    : consumption === "limited"
    ? "#FFFFCD"
    : consumption === "no"
    ? "#FFCDCD"
    : "#fff";

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
