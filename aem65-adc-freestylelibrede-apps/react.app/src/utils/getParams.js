export const getUrlParameter = (name) => {
	name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
	let regex;
	if(name === 'redirectTo') {
		regex = new RegExp('[\\?&]' + name + '=([^#]*)');
	} else {
		regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
	}
	const results = regex.exec(location.search);
	if(name === 'accountActivationKey'){
		return results === null ? '' : decodeURIComponent(results[1]);
	}
	else {
		return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
	}
};

export const getHashUrlParameter = (name) => {
	const fragment = window.location.hash.substring(1);
	const params = new URLSearchParams(fragment);
	return params.get(name);
};