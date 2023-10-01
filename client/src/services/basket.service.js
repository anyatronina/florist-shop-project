import httpService from "./http.service";

const basketEndPoint = "basket/";

const basketService = {
  set: (payload) => {
    return localStorage.setItem("basket", JSON.stringify(payload));
  },
  get: () => {
    return JSON.parse(localStorage.getItem("basket"));
  },
  delete: () => {
    localStorage.removeItem("basket");
  },
  createOrder: async (payload) => {
    const { data } = await httpService.post(basketEndPoint, payload);
    return data;
  }
};

export default basketService;
