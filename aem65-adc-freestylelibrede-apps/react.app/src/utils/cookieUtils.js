export const setCookie = (cookieName, cookieValue, daysValid, isSecure=false, isHTTP=false) => {
	const date = new Date();
	date.setTime(date.getTime() + (daysValid*24*60*60*1000));
	document.cookie = `${cookieName}=${cookieValue};expires=${date.toUTCString()};${isSecure ? 'Secure;': ''}${isHTTP ? 'HttpOnly;': ''}path=/`;
};

export const getCookie = (cookieName) => {
	const name = cookieName + '=';
	const ca = document.cookie.split(';');
	for(let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) === ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) === 0) {
			return c.substring(name.length, c.length);
		}
	}
	return undefined;
};

export const deleteCookie = (cookieName) => {
	document.cookie = `${cookieName}=;expires=${new Date(0).toUTCString()};path=/`;
};
