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
    dia.toLocaleDateString(lang, {
      weekday: "long",
    }).split('')[0].toUpperCase() +
    " " +
    dia.getDate() +
    " " +
    capFirstLetter(dia.toLocaleString(`${lang}-US`, { month: "short" })) +
    " " +
    dia.getFullYear()
  );
}

export function getMonthName(monthNumber: number, lang: string) {
  let varDate = new Date();
  varDate.setMonth(monthNumber - 1);
  return varDate.toLocaleString(`${lang}-US`, { month: "long" });
}

export function getMonthFromString(date: string) {
  const monthNum = parseInt(date.split("-")[1]);
  return monthNum;
}
