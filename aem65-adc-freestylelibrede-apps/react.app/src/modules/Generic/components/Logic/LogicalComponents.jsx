import PropTypes from 'prop-types';

export const For = ({array, children, filter, limit, sort}) => {
	if(!array || !Array.isArray(array) || (typeof children !== 'function') || (typeof filter !== 'function')) return null;
	const _limit = limit || array.length;
	return array.filter(filter).sort(sort).map(children).slice(0, _limit);
};

For.propTypes = {
	array: PropTypes.array,
	children: PropTypes.func,
	filter: PropTypes.func,
	sort: PropTypes.func,
	limit: PropTypes.number
};
For.defaultProps = {
	filter: () => true,
	sort: () => 0,
};
