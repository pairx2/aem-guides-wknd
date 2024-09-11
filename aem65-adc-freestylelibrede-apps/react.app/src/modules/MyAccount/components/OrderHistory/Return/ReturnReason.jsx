import React from 'react';
import PropTypes from 'prop-types';
import I18n from '../../../../Translation/components/I18n';
import Icon from '../../../../Generic/components/Icon/Icon';

const ReturnReason = ({returnReason, setReturnReason, text, isActive}) => {
	return (
		<div className={'adc-tabs position-relative mb-3'} onClick={() => setReturnReason(returnReason)}>
			<label className={`adc-tabs__label d-block m-0 px-3 py-3 ${isActive && 'active'}`}>
				<I18n text={text} />
			</label>
			<Icon
				image={'formcheck-success-white adc-tabs__blue-circle position-absolute'}
				size={Icon.SIZE.MEDIUM}
				style={Icon.STYLE.BLUE}
			/>
		</div>
	);
};

ReturnReason.propTypes = {
	returnReason: PropTypes.string,
	text: PropTypes.string,
	isActive: PropTypes.bool,
	setReturnReason: PropTypes.func
};
export default ReturnReason;