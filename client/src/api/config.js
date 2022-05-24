import { service } from "./service";

export default {
  async getRequest(URL, PARAMS) {
    return await service({
      url: URL,
      params: PARAMS,
      method: "GET",
    });
  },
  async postRequest(URL, DATA, PARAMS) {
    return await service({
      url: URL,
      data: DATA,
      params: PARAMS,
      method: "POST",
    });
  },
  async putRequest(URL, DATA, PARAMS) {
    return await service({
      url: URL,
      data: DATA,
      params: PARAMS,
      method: "PUT",
    });
  },
  async deleteRequest(URL, PARAMS) {
    return await service({
      url: URL,
      params: PARAMS,
      method: "DELETE",
    });
  },
};
