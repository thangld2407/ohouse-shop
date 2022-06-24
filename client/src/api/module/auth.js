import * as requestApi from "../request";

const url = "auth";

export function register(data) {
 return requestApi.postOne(`${url}/register`, data);
}
