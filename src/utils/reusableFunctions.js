function normalizeString(str: string) {
  const conversionTable = {
    " ": "-",
    á: "a",
    é: "e",
    í: "i",
    ó: "o",
    ú: "u",
  };
  const normStr = Object.keys(conversionTable).forEach((key) => {
    str = str.toLowerCase().replaceAll(key, conversionTable[key]);
  });
  return normStr;
}

function capFirstLetter(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}
