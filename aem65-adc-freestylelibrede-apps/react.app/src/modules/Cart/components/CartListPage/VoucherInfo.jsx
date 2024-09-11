import React from 'react';
import I18n from '../../../Translation/components/I18n';
import PropTypes from 'prop-types';

const VoucherInfo = (props) => {
	const {voucherMsg} = props;
	return (
		<p className="adc-cartlist__voucher mt-3 text-center mx-auto">
			<I18n text={voucherMsg}/>
		</p>
	);
};
VoucherInfo.propTypes = {
	voucherMsg: PropTypes.string
};
export default VoucherInfo;