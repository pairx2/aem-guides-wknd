import axios from 'axios/index';
import {call} from 'redux-saga/effects';


//extendible
export class Request {

	constructor(endpoint, method) {
		this.options = {};
		this.options.baseURL = 'https://jsonplaceholder.typicode.com';
		this.options.url = endpoint;
		this.options.method = method;
		this.options.headers = {
			'Content-Type': 'application/json'
		};
	}

	withParameters(params) {
		this.options.params = {
			...this.options.params,
			...params
		};
		return this;
	}

	withData(data) {
		this.options.data = {
			...this.options.data,
			...data
		};
		return this;
	}

	setUploadProgressHandler(callback) {
		this.options.onUploadProgress = callback;
		return this;
	}

	setDownloadProgressHandler(callback) {
		this.options.onDownloadProgress = callback;
		return this;
	}

	execute() {
		return call(axios, this.options);
	}
}