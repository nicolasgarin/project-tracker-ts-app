function stringDateFormat(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const stringDate = year + "-" + month + "-" + day;
  return stringDate;
}