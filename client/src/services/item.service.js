import httpService from "./http.service";

const itemEndPoint = "item/";

const itemService = {
  get: async () => {
    const { data } = await httpService.get(itemEndPoint);
    return data;
  }
};

export default itemService;
