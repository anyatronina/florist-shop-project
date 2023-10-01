let basket = [
  //   {
  //     _id: "1",
  //     name: "Фрезия",
  //     price: "110",
  //     img: "freesia"
  //   }
];

const fetchAll = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(basket);
    }, 1000);
  });

const getLength = () => {
  return basket.length;
};

const addItem = (data) => {
  basket.push({ ...data });
};

const removeItem = (idBasket) => {
  basket = basket.filter((item) => item.idBasket !== idBasket);
  return basket;
};

export default {
  fetchAll,
  getLength,
  addItem,
  removeItem
};
