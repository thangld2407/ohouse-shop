import request from './config';

export function getAll(url, params) {
	return request.getRequest(url, params);
}
export function postOne(url, data) {
	return request.postRequest(url, data);
}