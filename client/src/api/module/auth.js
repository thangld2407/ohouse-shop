import * as requestApi from "../request";

const url = "auth";

export function register(data) {
 return requestApi.postOne(`${url}/register`, data);
}
export function login(data) {
  return requestApi.postOne(`${url}/login`, data);
}
export function forgotPassword(data) {
  return requestApi.postOne(`${url}/forgot-password`, data);
}