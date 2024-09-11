import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUrlParameter } from '../../../../utils/getParams';
import MessageBanner from '../../../Generic/components/MessageBanner/MessageBanner';
import Row from '../../../Generic/components/Container/Row';
import Col from '../../../Generic/components/Container/Col';
import { i18nLabels } from '../../../../utils/translationUtils';
import { confirmAccountRequest } from '../../redux/actions/registration.action';
import {  getWcmMode } from '../../../../utils/orderUtils';
import {getServiceEndPoint} from '../../../../utils/endpointUrl';
import { SUCCESS_CODE } from '../../../../utils/enums';
const mapDispatchToProps = {
	confirmAccount: confirmAccountRequest,
};
const mapStateToProps = state => {
	const { error, errorCode, confirmationStatus, customer,tech_training_required, magentoSuccessCode } = state.authenticationModuleReducer;
	return { error, errorCode, confirmationStatus, customer,tech_training_required, magentoSuccessCode };
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(
	class AccountVerificationBanner extends Component {
		state = {
			showing: "",
			isHmmURL: false,
			isTechnicalTrainingRequired: this.props.tech_training_required,
			customerIdBase64:""
		}
		handleLink = (buttonId) => {
			this.setState({ showing: buttonId })
		}
		componentDidUpdate = (prevProps) => {
			const { tech_training_required,confirmationStatus, magentoSuccessCode} = this.props;
			const {isTechnicalTrainingRequired} = this.state;
			if(magentoSuccessCode !== null){
				sessionStorage.setItem(SUCCESS_CODE, magentoSuccessCode)
			}
			if (isTechnicalTrainingRequired !== tech_training_required ) {
				this.setState({isTechnicalTrainingRequired: tech_training_required});
				if(confirmationStatus!==null && !tech_training_required && !getWcmMode()){
					const loginPageUrl = getServiceEndPoint('login.page.path');
					window.location.href = loginPageUrl + "?confirmationStatus=" + confirmationStatus;	
				}
			}

		}
		componentDidMount = () => {
			const { confirmAccount } = this.props;
			const confirmationDetails = this.getConfirmationDetails();
			
			if (confirmationDetails) {
				confirmAccount(confirmationDetails);
			}
		}
		getConfirmationDetails = () => {
			const key = getUrlParameter('key');
			const id = getUrlParameter('id');
			return { key, id };
		};
		render() {
			const { bannerButtons,
				bannerDescription,
				bannerSubHeadingInfoText,
				heading,
				subDescription,
				subHeading, confirmationStatus, hmmUrl, customer, disableTraining} = this.props;
			const { showing, isHmmURL,isTechnicalTrainingRequired, customerIdBase64} = this.state
			const addOpacity = showing !== "" ? "adc-tech-training-add-opacity" : "";
			let customerIdbase64 = "";
			const loginPageUrl = getServiceEndPoint('login.page.path');
			if (customer != null && customer != "" && customer != undefined && hmmUrl && !isHmmURL ) {
				customerIdbase64 = Buffer.from(customer.user_id.toString()).toString('base64');
				this.setState({ isHmmURL: true ,customerIdBase64:customerIdbase64});
			}
			return (
				<>
				<if condition={isTechnicalTrainingRequired ||getWcmMode() }>
						<div className="container adc-tech-training-container-margin">
							<Row>
								<Col width={10} offset={1}>
									<if condition={confirmationStatus === true}>
										<MessageBanner className={'mb-5'} icon={MessageBanner.ICON.SUCCESS} color={MessageBanner.COLOR.GREEN} description={i18nLabels.CONFIRMATION_SUCCESS} canClose />
									</if>
									<elseif condition={confirmationStatus === false}>
										<MessageBanner className={'mb-5'} icon={MessageBanner.ICON.FAILURE} color={MessageBanner.COLOR.RED} description={i18nLabels.CONFIRMATION_FAILURE} canClose />
									</elseif>
								</Col>
							</Row>
							<p className="adc-tech-training-heading-p">{heading}</p>
							<p className="adc-tech-training-sub-heading-p" dangerouslySetInnerHTML={{ __html: bannerDescription }}></p>
								<if condition={!disableTraining}>
									<hr />
									<div id="main-container" className={"adc-tech-training-heading-b " + addOpacity}>{subHeading}
										<div class="adc-tooltipright adc-icon adc-icon--medium adc-icon--info-box align-middle">
											<div class="adc-tooltipright__content text-left p-2">
												{bannerSubHeadingInfoText}
											</div>
										</div>
										<div className="adc-tech-training-sub-heading-b">{subDescription}</div>
										<div>
											{bannerButtons && bannerButtons.map((item, index) =>
												<a id={'adc-tc-btn-'+ item.ctaTargetSectiontId} key={item.ctaTargetSectiontId} onClick={() => this.handleLink(item.ctaTargetSectiontId)} className={showing?.includes(item.ctaTargetSectiontId) ? "adc-button  text-center adc-button-primary adc-tech-training-button-align col-lg-3 " : "adc-button  text-center adc-button-secondary adc-tech-training-button-align col-lg-3 "} >{item.cta.text}</a>
											)}
										</div>
									</div>
									{bannerButtons && bannerButtons.map((item, index) =>
										<div id={item.ctaTargetSectiontId} key={item.ctaTargetSectiontId} className={showing?.includes(item.ctaTargetSectiontId) ? "adc-tech-training-marging-box adc-tech-training-show" : "adc-tech-training-marging-box adc-tech-training-hide"} dangerouslySetInnerHTML={{ __html: item?.ctaSection?.replace("@custumerId@", isHmmURL ? hmmUrl + customerIdBase64 : loginPageUrl) }} >
										</div>
									)}
								</if>
						</div>
					</if>
				</>
			)
		};
	});