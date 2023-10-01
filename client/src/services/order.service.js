import httpService from "./http.service";

const orderEndPoint = "order/";

const orderService = {
  get: async () => {
    const { data } = await httpService.get(orderEndPoint);
    return data;
  }
};

export default orderService;
