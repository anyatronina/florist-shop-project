import httpService from "./http.service";

const favoritesEndPoint = "favorites/";

const favoritesService = {
  set: (payload) => {
    return localStorage.setItem("favorites", JSON.stringify(payload));
  },
  get: () => {
    return JSON.parse(localStorage.getItem("favorites"));
  },
  delete: () => {
    localStorage.removeItem("favorites");
  },
  createOrder: async (payload) => {
    const { data } = await httpService.post(favoritesEndPoint, payload);
    return data;
  }
};

export default favoritesService;
