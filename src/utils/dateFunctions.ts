import { capFirstLetter } from "./reusableFunctions";

export function dateToStringFormat(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const stringDate = year + "-" + month + "-" + day;
  return stringDate;
}

export function dayStringFormat(date: string, lang: string) {
  let dia = new Date(date);
  return (
    dia.getDate() +
    " " +
    capFirstLetter(dia.toLocaleString(`${lang}-US`, { month: "short" })) +
    " " +
    dia.getFullYear()
  );
}
