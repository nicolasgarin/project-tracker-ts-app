const conversion = {
  " ": "-",
  á: "a",
  é: "e",
  í: "i",
  ó: "o",
  ú: "u",
};

function normalizeString(str) {
  Object.keys(conversion).forEach((key) => {
    str = str.toLowerCase().replaceAll(key, conversion[key]);
  });
  return str;
}

function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}

const exportData = (data) => {
  const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
    JSON.stringify(data)
  )}`;
  const link = document.createElement("a");
  link.href = jsonString;
  link.download = "projectTrackerData.json";
  link.click();
};
