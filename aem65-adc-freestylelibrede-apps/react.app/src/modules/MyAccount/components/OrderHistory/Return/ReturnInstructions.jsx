import React from 'react';
import Row from '../../../../Generic/components/Container/Row';
import Col from '../../../../Generic/components/Container/Col';
import PropTypes from 'prop-types';
import Icon from '../../../../Generic/components/Icon/Icon';
import I18n from '../../../../Translation/components/I18n';
import {i18nLabels} from '../../../../../utils/translationUtils';
import Button, {BUTTON_OPTIONS} from '../../../../Generic/components/Button/Button';
import HelpdeskBanner from './HelpdeskBanner';
import LoadingIndicator, {LOADING_INDICATOR_OPTIONS} from '../../../../Generic/components/Loading/LoadingIndicator';
import MessageBanner from '../../../../Generic/components/MessageBanner/MessageBanner';

const ReturnInstructions = ({close, isLoading, returnId, error, getReturnReceipt}) => {
	return (
		<Row className={'pb-3'}>
			<Col lg={10} xl={9} className={'mb-5'}>
				<h4 className={'font-weight-700'}><I18n text={i18nLabels.RETURN_STEP_1_LABEL} prefix={'1. '}/></h4>
				<p><I18n text={i18nLabels.RETURN_STEP_1_DESCRIPTION}/></p>
				<h4 className={'font-weight-700'}><I18n text={i18nLabels.RETURN_STEP_2_LABEL} prefix={'2. '}/></h4>
				<p><I18n text={i18nLabels.RETURN_STEP_2_DESCRIPTION}/></p>
				<h4 className={'font-weight-700'}><I18n text={i18nLabels.RETURN_STEP_3_LABEL} prefix={'3. '}/></h4>
				<p><I18n text={i18nLabels.RETURN_STEP_3_DESCRIPTION}/></p>
			</Col>
			<Col width={12}>
				<Row>
					<div className={'col-12 col-lg'}>
						<if condition={isLoading || (!returnId && !error)}>
							<LoadingIndicator size={LOADING_INDICATOR_OPTIONS.SIZE.SMALL}
											  label={i18nLabels.GENERATING_RMA_LABEL}/>
						</if>
						<elseif condition={error}>
							<MessageBanner color={MessageBanner.COLOR.BLUE}
										   icon={MessageBanner.ICON.WARNING}
										   description={i18nLabels.GENERATING_RMA_LABEL_ERROR}/>
						</elseif>
						<else>
							<Button
								label="download_return_form"
								ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY}
								size={BUTTON_OPTIONS.SIZE.LARGE}
								color="blue"
								hasNoMargin
								isFullWidth
								icon='download-white'
								iconPosition={Icon.POSITION.LEFT}
								action={getReturnReceipt}
							/>
						</else>
						<Button
							action={close}
							label={i18nLabels.BACK_TO_ORDER_OVERVIEW_CTA}
							ctaStyle={BUTTON_OPTIONS.STYLE.SECONDARY}
							size={BUTTON_OPTIONS.SIZE.LARGE}
							className={'mt-5'}
							color="blue"
							hasNoMargin
							isFullWidth
						/>
					</div>
					<div className={'col-12 col-lg offset-lg-1'}>
						<p className={'text-small pb-3'}><I18n text={i18nLabels.REQUEST_WILL_GET_HANDLED}/></p>
						<HelpdeskBanner className={'border-top-grey mt-5 pt-3'}/>
					</div>
				</Row>
			</Col>
		</Row>
	);
};

ReturnInstructions.propTypes = {
	close: PropTypes.func,
	getReturnReceipt:PropTypes.func,
	isLoading: PropTypes.bool,
	returnId: PropTypes.string,
	error: PropTypes.string
};

export default ReturnInstructions;