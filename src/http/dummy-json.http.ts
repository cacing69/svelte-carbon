// https://dummyjson.com/

import axios from 'axios';
import qs from 'qs';

const dummyJsonHttp = axios.create({
	baseURL: `https://dummyjson.com/`,
	timeout: 10000, // Aktifkan pengiriman dan penerimaan cookies
	paramsSerializer: (params) => {
		return qs.stringify(params, { arrayFormat: `brackets` });
	}
});

dummyJsonHttp.interceptors.request.use((config) => {
	return config;
});

export default dummyJsonHttp;