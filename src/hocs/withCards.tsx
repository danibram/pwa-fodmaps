import dayjs from "dayjs";
import useSWR from "swr";
import Loader from "../components/Loader";
import { sortFooItemsByConsumption } from "../lib/utils";

let SYMBOL = ",";
const processLine = (line: string): string[] => {
  if (line.indexOf('"') < 0) return line.split(SYMBOL);

  let result = [],
    char = "",
    cell = "",
    quote = false;

  for (let i = 0; i < line.length; i++) {
    char = line[i];
    if (char == '"' && line[i + 1] == '"') {
      cell += char;
      i++;
    } else if (char == '"') {
      quote = !quote;
    } else if (!quote && char == SYMBOL) {
      result.push(cell);
      cell = "";
    } else {
      cell += char;
    }
    if (i == line.length - 1 && cell) {
      result.push(cell);
    }
  }
  return result;
};

const getCards = async (key) => {
  let id =
    "2PACX-1vQa5xYjFycaodSEzzKrH7Qf5DTjwmFAW-N4lRx624G6uW-GKQHtY0hy6eDJ4vW7s1__9JFoJTAUN9VO";
  let response = await fetch(
    `https://docs.google.com/spreadsheets/d/e/${id}/pub?output=csv`
  );

  let text = await response.text();

  if (response.status !== 200) {
    return null;
  }

  let [_, data] = text
    .split("\n")
    .map(processLine)
    .filter(Boolean)
    .reduce(
      ([head, data], a, index) => {
        if (index === 0) {
          return [a, []];
        } else {
          let newLinedata = head.reduce((acc, value, index) => {
            acc[value] = a[index];
            return acc;
          }, {});

          return [head, [...data, newLinedata]];
        }
      },
      [[], []]
    );

  data = data.map((d) => ({
    name: d.Name,
    category: d.Category,
    limited: d.Consumption,
    notes: d.Description === "_empty_" ? null : d.Description,
  }));

  const categories = Array.from(new Set(data.map(({ category }) => category)));

  return { foods: sortFooItemsByConsumption(data), categories };
};

export const withCards = (Component: any) => (props) => {
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
