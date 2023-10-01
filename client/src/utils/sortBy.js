export function sort(target) {
  switch (target) {
    case "1":
      return { iter: "name", order: "asc" };
    case "2":
      return { iter: "price", order: "asc" };
    case "3":
      return { iter: "price", order: "desc" };
    default:
      break;
  }
}
