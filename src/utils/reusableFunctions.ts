export function normalizeString(str: string) {
  const conversionTable: any = {
    " ": "-",
    á: "a",
    é: "e",
    í: "i",
    ó: "o",
    ú: "u",
  };
  Object.keys(conversionTable).forEach((key) => {
    str = str.toLowerCase().replaceAll(key, conversionTable[key]);
  });
  return str;
}

export function capFirstLetter(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}
