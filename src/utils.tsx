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
  let response = await fetch(`https://opensheet.elk.sh/${id}/1`);

  let result = await response.json();

  if (response.status !== 200) {
    return null;
  }

  let data = result.map((d) => ({
    name: d.Name,
    category: d.Category,
    limited: d.Consumption,
    notes: d.Description === "_empty_" ? null : d.Description,
  }));

  const categories = Array.from(new Set(data.map(({ category }) => category)));

  return { foods: sortFooItemsByConsumption(data), categories };
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
