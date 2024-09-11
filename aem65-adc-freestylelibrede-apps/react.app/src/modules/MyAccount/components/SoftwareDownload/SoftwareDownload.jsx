import React from 'react';
import {connect} from 'react-redux';
import MessageBanner from '../../../Generic/components/MessageBanner/MessageBanner';
import {i18nLabels} from '../../../../utils/translationUtils';
import {isMobile} from '../../../../utils/regexUtils';
import Icon from '../../../Generic/components/Icon/Icon';
import Row from '../../../Generic/components/Container/Row';
import PropTypes from 'prop-types';
import Button, {BUTTON_OPTIONS} from '../../../Generic/components/Button/Button';

const mapStateToProps = state => {
	const {cs_first_shipment_shipped: isFirstShipmentShipped} = state.myAccountModuleReducer.GetCustomerReducer.customer;
	return {isFirstShipmentShipped};
};

const SoftwareDownload = ({softwareInfo, windowsUrl, windowsStyle, macUrl, macStyle, noDownloadError, isFirstShipmentShipped}) => {
	return <>
		<if condition={isMobile}>
			<MessageBanner
				description={noDownloadError}
				color={MessageBanner.COLOR.RED}
				icon={MessageBanner.ICON.FAILURE}
			/>
		</if>
		<p>{softwareInfo}</p>
		<if condition={isFirstShipmentShipped}>
			<Row>
				<div className="col-12 col-lg-6 col-xl-5 mb-3">
					<Button
						href={!isMobile && windowsUrl}
						type={BUTTON_OPTIONS.TYPE.BUTTON}
						className={'full-width ' + (isMobile && 'disabled')}
						ctaStyle={windowsStyle || BUTTON_OPTIONS.STYLE.PRIMARY}
						isDownload
						isFullWidth
						label={i18nLabels.DOWNLOAD_WINDOWS}
						icon={'download-white'}
						iconPosition={Icon.POSITION.LEFT}
					/>
				</div>
				<div className="col-12 col-lg-6 col-xl-5 mb-3">
					<Button
						href={!isMobile && macUrl}
						type={BUTTON_OPTIONS.TYPE.BUTTON}
						className={'full-width ' + (isMobile && 'disabled')}
						ctaStyle={macStyle || BUTTON_OPTIONS.STYLE.SECONDARY}
						isDownload
						isFullWidth
						label={i18nLabels.DOWNLOAD_MAC}
						icon={'download-white'}
						iconPosition={Icon.POSITION.LEFT}
					/>
				</div>
			</Row>
		</if>
	</>;
};

SoftwareDownload.propTypes = {
	isFirstShipmentShipped: PropTypes.bool,
	softwareInfo: PropTypes.string,
	windowsUrl: PropTypes.string,
	windowsStyle: PropTypes.string,
	macUrl: PropTypes.string,
	macStyle: PropTypes.string,
	noDownloadError: PropTypes.string,
};
export default connect(mapStateToProps, null)(SoftwareDownload);