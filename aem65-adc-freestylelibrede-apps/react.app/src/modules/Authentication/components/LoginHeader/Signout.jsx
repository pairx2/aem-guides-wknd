import React from 'react';
import Icon from '../../../Generic/components/Icon/Icon';
import PropTypes from 'prop-types';
import Link from '../../../Generic/components/Link/Link';

const Signout = ({logoutLabel, logoutIcon}) => {
	return (
		<Link
			className="d-flex align-items-center c-pointer font-14 m-1"
			label={logoutLabel}
			hasNoLinkClass
			iconPosition={Icon.POSITION.LEFT}
			icon={logoutIcon} />
	);
};

Signout.propTypes = {
	logoutLabel: PropTypes.string,
	logoutIcon: PropTypes.string
};

export default Signout;