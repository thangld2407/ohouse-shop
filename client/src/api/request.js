import request from './config';

export function getAll(url, params) {
	return request.getRequest(url, params);
}