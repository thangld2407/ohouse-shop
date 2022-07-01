import * as requestApi from '../request';

const url = "user";

export function getUser(params){
    return requestApi.getAll(url, params);
}

export function createUser(data) {
  return requestApi.postOne(`${url}/create`, data)
}

export function getUserById(id) {
  return requestApi.getOne(url, id)
}

export function editUserById(id, data) {
  return requestApi.putOne(`${url}/${id}`, data)
}

export function deleteUserById(id) {
  return requestApi.deleteOne(`${url}/${id}`)

}