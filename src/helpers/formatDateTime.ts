import format from "date-fns/format";

export const formatDateOrder = (date: Date | number | string) => {
  if (!date) return;
  let newDate = date;

  if (typeof date === "string") {
    newDate = Date.parse(date);
  } else newDate = typeof newDate === "number" ? newDate : Number(newDate);

  return format(newDate, "dd.MM.YYY");
};
