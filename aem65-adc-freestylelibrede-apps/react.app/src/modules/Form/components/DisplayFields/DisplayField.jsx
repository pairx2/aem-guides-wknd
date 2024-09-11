import React from 'react';
import PropTypes from 'prop-types';
import I18n from '../../../Translation/components/I18n';
import Row from '../../../Generic/components/Container/Row';

const DisplayField = ({label, value}) => {
	return (
		<Row>
			<p className="col-3 m-0 mb-3 font-weight-600">
				<I18n text={label} suffix={':'}/>
			</p>
			<p className="col-9 m-0 mb-3 text-break text-right">{value}</p>
		</Row>

	);
};
DisplayField.propTypes = {
	label: PropTypes.string,
	value: PropTypes.string,
};

DisplayField.defaultProps = {};

export default DisplayField;