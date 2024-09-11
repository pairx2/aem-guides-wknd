import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TrackAndTraceWidgetForm from './TrackAndTraceWidgetForm';
import { getUrlParameter } from "../../../utils/getParams";
import { i18nLabels } from '../../../utils/translationUtils';
import { ARVATO_TRACE_TRACK_QUERY_PARAM_KEY, DEFAULT_COUNTRY_OPTIONS } from '../../../utils/enums';
import I18n from '../../Translation/components/I18n';

export default class ArvatoTrackAndTraceWidget extends Component {

    static propTypes = {
        heading: PropTypes.string,
        orderIDText: PropTypes.string,
        orderIdPlaceHolderText: PropTypes.string,
        orderIDValidationRegex: PropTypes.string,
        zipCodeText: PropTypes.string,
        zipCodePlaceHolderText: PropTypes.string,
        zipCodeValidationRegex: PropTypes.string,
        submitButtonText: PropTypes.string,
        orderIDLength: PropTypes.number,
        zipCodeLength: PropTypes.number,
        successLink: PropTypes.string,
        submitCtaStyle: PropTypes.string,
				subHeading: PropTypes.node
    };

    state = {
        urlOrderId: '',
        urlZipCode: ''
    }

    componentDidMount = () => {
        const {ORDER_ID, ZIP_CODE} = ARVATO_TRACE_TRACK_QUERY_PARAM_KEY;
        const decodedOrderId =getUrlParameter(ORDER_ID) ? atob(getUrlParameter(ORDER_ID)): "";
        const decodedZip =getUrlParameter(ZIP_CODE) ? atob(getUrlParameter(ZIP_CODE)) : "";
        this.setState({
            urlOrderId: decodedOrderId,
            urlZipCode: decodedZip
        })
    }

    onSubmitTrack = (formData) => {
        const { successLink}=  this.props;
        const {orderId,zipCode} = formData;
        const {ORDER_ID, ZIP_CODE} = ARVATO_TRACE_TRACK_QUERY_PARAM_KEY;
        const base64ZipCode =zipCode ? Buffer.from(zipCode).toString('base64') : "";
		const base64Orderid = orderId ? Buffer.from(orderId).toString('base64') : "";
        const params = new URLSearchParams()
        params.append(ORDER_ID, base64Orderid);
        params.append(ZIP_CODE, base64ZipCode);

		window.history.pushState(null, '', successLink+'?'+ params.toString())
        this.setState({
            urlOrderId: orderId,
            urlZipCode: zipCode
        })
    }

    render() {
        const { heading, subHeading, orderIDText, orderIdPlaceHolderText, orderIDValidationRegex, zipCodeText, zipCodePlaceHolderText, zipCodeValidationRegex, submitButtonText, orderIDLength , zipCodeLength, successLink, submitCtaStyle} = this.props
        const { urlOrderId, urlZipCode } = this.state
        return (
            <div>
                {!urlOrderId && !urlZipCode && <TrackAndTraceWidgetForm
                onSubmitTrack={this.onSubmitTrack}
                    heading={heading}
                    orderIdText={orderIDText}
                    orderIdPlaceHolderText={orderIdPlaceHolderText}
                    orderIdValidationRegex={orderIDValidationRegex}
                    zipCodeText={zipCodeText}
                    zipCodePlaceHolderText={zipCodePlaceHolderText}
                    zipCodeValidationRegex={zipCodeValidationRegex}
                    submitButtonText={submitButtonText}
                    orderIdErrorText={<I18n text={i18nLabels.ORDER_ID_INVALID }/>}
                    zipCodeErrorText={<I18n text={i18nLabels.ZIP_CODE_INVALID}/>}
                    orderIdLength={orderIDLength}
                    zipCodeLength={zipCodeLength}
                    successLink={successLink}
                    submitCtaStyle= {submitCtaStyle}
                />}
                {urlOrderId && urlZipCode && (
									<>
										<div className="row justify-content-center">
											<div className="adc-arvato-widget-sub-heading">
												<div className="adc-arvato-widget-mb-n5">
												<div class="adc-arvato-widget-heading">
													<h1 class="adc-arvato-widget-heading--title text-left adc-title adc-title--blue d-flex justify-content-start">
													{heading}
													</h1>
												</div>
												{ subHeading && <div dangerouslySetInnerHTML={{ __html: subHeading }}></div> }
												{ subHeading && <hr className="mt-5"></hr> }
												</div>
											</div>
										</div>
										<arvato-track-and-trace-widget
											id="arvato-widget"
											orderid={urlOrderId}
											zipcode={urlZipCode}
										  lang={DEFAULT_COUNTRY_OPTIONS[0].value}
										  country={DEFAULT_COUNTRY_OPTIONS[0].country_code}
								    ></arvato-track-and-trace-widget>
								  </>
								)}
            </div>
        );
    }
}