import axios from 'axios';

function postImage(payload, onProgress, csrfToken) {
	const data = new FormData();
	data.append('image', payload.binary);

	const config = {
		headers: {
			'Content-Type': 'multipart/form-data',
			'CSRF-Token': csrfToken
		},
		onUploadProgress: onProgress
	};

	return axios.create({
		baseURL: payload.endpoint
	}).post('/bin/adc/freestylelibrede/prescription', data, config);
}

export {postImage};