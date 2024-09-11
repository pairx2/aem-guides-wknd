import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import I18n from '../../../Translation/components/I18n';
import Icon from '../../../Generic/components/Icon/Icon';
import {closeModalAction} from '../../../Modal/redux/actions';
import Button, {BUTTON_OPTIONS} from '../../../Generic/components/Button/Button';
import {i18nLabels} from '../../../../utils/translationUtils';


const mapDispatchToProps = {
	closeModalAction
};

const UploadConfirmationMoadal = (props) => {
	return <div className="adc-modal-delete">
		<h4 className="adc-modal-delete__heading text-left">
			<I18n
				text={i18nLabels.UPLOAD_CONFIRMATION_HEADING}
			/>
		</h4>
		<div className="row mt-3">
			<div className="col-1">
				<Icon
					image={'round-green-check'}
					size={'large'}
				/>
			</div>
			<div className="col-11 text-left">
				<I18n
					text={i18nLabels.UPLOAD_CONFIRMATION_MESSAGE}
				/>
			</div>
		</div>
		<div className="row mt-5">
			<div className="col-12 col-lg-8">
				<div className="row">
					<div className="col-12 col-md-6">
						<Button
							action={props.closeModalAction}
							ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY}
							className={'px-0 close-modal'}
							isFullWidth
							hasNoMargin
							label={'Ok'}
						/>
					</div>
				</div>
			</div>
		</div>
	</div>;
};

UploadConfirmationMoadal.propTypes = {
	closeModalAction: PropTypes.func
};
export default connect(null, mapDispatchToProps)(UploadConfirmationMoadal);