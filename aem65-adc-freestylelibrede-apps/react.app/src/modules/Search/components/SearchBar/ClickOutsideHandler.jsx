import onClickOutside from 'react-onclickoutside';
import PropTypes from 'prop-types';

export const ClickOutsideHandler = ({children, handleClickOutside}) => {
	ClickOutsideHandler.handleClickOutside = handleClickOutside;
	return children;
};

export const clickOutsideConfig = {
	handleClickOutside: () => ClickOutsideHandler.handleClickOutside
};

ClickOutsideHandler.propTypes = {
	handleClickOutside: PropTypes.func
};
export default onClickOutside(ClickOutsideHandler, clickOutsideConfig);