export const adobeAnalyticLayer = () => {
	if(window._satellite) {
		return window._satellite;
	}
	return null;
};