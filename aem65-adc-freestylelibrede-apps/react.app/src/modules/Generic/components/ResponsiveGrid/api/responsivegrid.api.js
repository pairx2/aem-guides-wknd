import axios from 'axios';
import {httpRequestMethod} from '../../../../../utils/endpointUrl';

async function getEditContext(path) {
	const options = {
		url: path + '.editcontext.json',
		method: httpRequestMethod.GET,
		headers: {
			'Content-Type': 'application/json'
		},
		params: {
			resourceType: 'wcm/foundation/components/responsivegrid'
		}
	};

	return axios.request(options);
}

async function getComponentHTML(editor, path) {
	const options = {
		url: path + '.html',
		method: httpRequestMethod.GET,
		headers: {
			'Content-Type': 'text/html;charset=utf-8'
		},
		params: {
			wcmmode: editor ? 'edit' : 'disabled',
			forceeditcontext: editor ? 'true' : 'false',
		}
	};

	return axios.request(options);
}

export {getEditContext,getComponentHTML};