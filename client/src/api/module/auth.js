import * as requestApi from "../request";

const url = "auth";

export function register(data) {
  requestApi.postOne(`${url}/register`, data);
}
