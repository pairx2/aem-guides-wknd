import React from 'react';
import {Title} from '../../../Generic/components/Title/Title';
import Icon from '../../../Generic/components/Icon/Icon';
import Col from '../../../Generic/components/Container/Col';
import Row from '../../../Generic/components/Container/Row';
import {i18nLabels, useTranslation} from '../../../../utils/translationUtils';
import {getUrlParameter} from '../../../../utils/getParams';
import I18n from '../../../Translation/components/I18n';
import PropTypes from 'prop-types';
import Button from '../../../Generic/components/Button/Button';

const SUCCESS_PAGE_TYPES = {
	WEB_TO_CASE: 'webtocase',
	CALL_BACK: 'callback'
};

const Success = ({successPageType, subheading, image, informationMessage, newMessageCtaStyle, newMessageCtaUrl, homeCtaStyle, homeCtaUrl}) => {
	const getName = () => {
		return getUrlParameter('firstName');
	};
	const getCallWeekday = () => {
		const callTime = getUrlParameter('callTime');
		return new Intl.DateTimeFormat('de-DE', {
			weekday: 'long'
		}).format(callTime);
	};

	const getCallDate = () => {
		const callTime = getUrlParameter('callTime');
		return new Intl.DateTimeFormat('de-DE', {
			day: '2-digit',
			month: 'long',
			year: 'numeric'
		}).format(callTime);
	};

	const getCallStartHour = () => {
		const callTime = getUrlParameter('callTime');
		if (callTime) {
			const date = new Date(parseInt(callTime));
			return date.getHours();
		} else {
			return 0;
		}
	};
	const callStartHour = getCallStartHour();
	const thankYouLabel = useTranslation(i18nLabels.PERSONALIZED_THANK_YOU, [getName()]);

	return <div className="container text-center my-5">
		<Title text={thankYouLabel}
			   size={Title.SIZE.H2} color={Title.COLOR.BLUE}/>
		<Title text={subheading} size={Title.SIZE.H5} color={Title.COLOR.BLUE}/>
		<Icon image={image} size={Icon.SIZE.HUGE} className="my-4"/>
		{successPageType === SUCCESS_PAGE_TYPES.WEB_TO_CASE ?
			<p className="mx-auto mb-5 font-weight-600 cmp-success__text"
			   dangerouslySetInnerHTML={{__html: informationMessage}}/>
			:
			<p className="mx-auto mb-5 font-weight-600 cmp-success__text">
				<I18n text={i18nLabels.CALL_BACK_CASE_INFORMATION_TEXT}
					  params={[getCallWeekday(),
						  getCallDate(),
						  `${callStartHour < 10 ? '0' : ''}${callStartHour}:00`,
						  `${(callStartHour + 1) < 10 ? '0' : ''}${callStartHour + 1}:00`]}/>
			</p>
		}
		<Row className="justify-content-center">
			{successPageType === SUCCESS_PAGE_TYPES.WEB_TO_CASE &&
			<Col sm={6} md={3}>
				<Button
					label={i18nLabels.WRITE_A_NEW_MESSAGE_CTA}
					ctaStyle={newMessageCtaStyle}
					href={newMessageCtaUrl}
					isFullWidth
					hasNoMargin
				/>
			</Col>
			}
			<Col sm={6} md={3}>
				<Button
					label={i18nLabels.GO_TO_HOME_CTA}
					ctaStyle={homeCtaStyle}
					href={homeCtaUrl}
					isFullWidth
					hasNoMargin
				/>
			</Col>
		</Row>
	</div>;
};

Success.propTypes = {
	successPageType: PropTypes.string,
	subheading: PropTypes.string,
	image: PropTypes.string,
	informationMessage: PropTypes.string,
	newMessageCtaStyle: PropTypes.string,
	newMessageCtaUrl: PropTypes.string,
	homeCtaStyle: PropTypes.string,
	homeCtaUrl: PropTypes.string
};

export default Success;