import * as requestApi from '../request';

const url = 'product';

export function getProduct() {
  return requestApi.getAll(url);
}