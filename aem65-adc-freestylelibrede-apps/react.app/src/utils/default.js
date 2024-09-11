export const empty = Object.freeze({
	object: Object.freeze({}),
	array: Object.freeze([]),
	// eslint-disable-next-line no-empty-function
	function: () => {},
	nullFunction: () => null
});