import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Card, CardContent} from '../../../Generic/components/Card/Card';
import Dropzone from 'react-dropzone';
import MessageBanner from '../../../Generic/components/MessageBanner/MessageBanner';
import {i18nLabels} from '../../../../utils/translationUtils';
import I18n from '../../../Translation/components/I18n';
import Icon from '../../../Generic/components/Icon/Icon';
import {uploadCecFileRequest} from '../../redux/actions/upload_cec_file.action';
import Button, {BUTTON_OPTIONS} from '../../../Generic/components/Button/Button';
import Link from '../../../Generic/components/Link/Link';
import {openModalAction} from '../../../Modal/redux/actions';
import {getCustomerRequest} from '../../redux/actions/customer.action';
import Row from '../../../Generic/components/Container/Row';
import Col from '../../../Generic/components/Container/Col';
import LoadingIndicator from '../../../Generic/components/Loading/LoadingIndicator';
import {COPAY_EXEMPTION_STATUS} from '../../../../utils/enums';
import { getValidationErrorClassName } from '../../myAccountUtils';

const UPLOAD_STATUS = {
	INITIAL: 'initial',
	UPLOAD: 'upload',
	UPLOADING: 'uploading',
	UPLOADED: 'uploaded'

};

const mapStateToProps = state => {
	const {uploadPercentage, data, error} = state.myAccountModuleReducer.UploadCecFileReducer;
	const {customer} = state.myAccountModuleReducer.GetCustomerReducer;
	return {customer, uploadPercentage, data, error};
};

const mapDispatchToProps = {
	uploadCecFileRequest,
	getCustomer: getCustomerRequest,
	openModalAction
};

export default connect(mapStateToProps, mapDispatchToProps)(class DocumentUpload extends Component {

	static propTypes = {
		heading: PropTypes.string,
		uploadStyle: PropTypes.string,
		uploadPercentage: PropTypes.number,
		error: PropTypes.object,
		transactionId: PropTypes.string,
		uploadLabel: PropTypes.string,
		uploadCecFileRequest: PropTypes.func,
		data: PropTypes.array,
		readerInformation: PropTypes.string,
		healthHelpText: PropTypes.string,
		cancelUpload: PropTypes.func,
		submitStyle: PropTypes.string,
		openModalAction: PropTypes.func,
		getCustomer: PropTypes.func,
		customer: PropTypes.object
	}

	state = {
		uploadStatus: UPLOAD_STATUS.UPLOADED,
		maxUploadFileSize: 5242880,
		validationError: null,
		fileName: null,
		isDragging: false,
		isShowUpload: true,
		isCheckTimeStamp: true,
		isfileSizeError: false
	};

	acceptFile = (data) => {
		const submittedFile = data[0];
		const fileName = submittedFile.name;
		const {customer: {email}} = this.props;
		this.setState({
			fileName: fileName,
			uploadStatus: UPLOAD_STATUS.UPLOADING,
			validationError: null,
			isfileSizeError: false
		});
		const reader = new FileReader();
		reader.onload = () => {
			const b64 = reader.result.replace(/^data:.+;base64,/, '');
			this.props.uploadCecFileRequest({
				email: email,
				mimeType: data[0].type.split('/')[1],
				cecExemptionString: b64
			});
		};
		reader.readAsDataURL(submittedFile);
	};
	componentDidUpdate() {
		const {uploadPercentage, customer: {is_cec_upload_allowed : isUploadAllowed}, error, openModalAction} = this.props;
		const {isCheckTimeStamp, uploadStatus} = this.state;
		if (isUploadAllowed && isCheckTimeStamp) {
			this.setState({isShowUpload: true, isCheckTimeStamp: false, uploadStatus: UPLOAD_STATUS.INITIAL});
		}
		else if (!isUploadAllowed && isCheckTimeStamp) {
			this.setState({isShowUpload: false, isCheckTimeStamp: false, uploadStatus: UPLOAD_STATUS.UPLOADED});
		}
		if (uploadStatus == UPLOAD_STATUS.UPLOADING && uploadPercentage === 100 && !error) {
			openModalAction({
				contentID: 'uploadConfirmationMoadal'
			});
			this.setState({
				validationError: null,
				isShowUpload: false,
				isfileSizeError: false,
				isCheckTimeStamp: false,
				uploadStatus: UPLOAD_STATUS.UPLOADED,
			});
			this.props.getCustomer();
		}
	}

	rejectFile = (data) => {
		if (data.length > 0) {
			const submittedFile = data[0];
			if (submittedFile.size > this.state.maxUploadFileSize) {
				this.setState({
					validationError: submittedFile.name,
					isfileSizeError: true
				});
			}
			this.setState({
				validationError: submittedFile.name
			});
		}
	};

	cancelUpload = () => {
		this.setState({
			uploadStatus: UPLOAD_STATUS.INITIAL,
			isShowUpload: true
		});
	};

	clearValidationError() {
		this.setState({
			validationError: null,
			isfileSizeError: false
		});
	}

	uploadDocument = () => {
		this.setState({
			uploadStatus: UPLOAD_STATUS.UPLOAD,
			validationError: null,
			isfileSizeError: false
		});
	};

	render() {
		const {uploadStatus, isfileSizeError, maxUploadFileSize, fileName, validationError, isDragging} = this.state;
		const {customer, customer: {is_copay_permanent: isCopayPermanent, measurement, health_insurance_number: healthInsuranceNumber, copay_exempted_this_year, copay_exempted_next_year},
			uploadStyle, uploadLabel, readerInformation, healthHelpText, uploadPercentage, error, data, heading} = this.props;
		const isExemptedThisYear = copay_exempted_this_year === COPAY_EXEMPTION_STATUS.NULL ? COPAY_EXEMPTION_STATUS.NULL : copay_exempted_this_year?.toLowerCase();
		const isExemptedNextYear = copay_exempted_next_year === COPAY_EXEMPTION_STATUS.NULL ? COPAY_EXEMPTION_STATUS.NULL : copay_exempted_next_year?.toLowerCase();
		return (
			<div className="adc-document-upload">
				<Card title={heading}>
					<CardContent>
						<if condition={!customer?.id}>
							<Row className={'justify-content-center'}>
								<LoadingIndicator/>
							</Row>
						</if>
						<else>
							<if condition={!healthInsuranceNumber && !measurement}>
								<MessageBanner className={'mb-5'} color={MessageBanner.COLOR.BLUE}
									icon={MessageBanner.ICON.FAILURE}
									description={i18nLabels.MEASUREMENT_COPAY_ERROR}
								/>
							</if>
							<elseif condition={!healthInsuranceNumber && measurement}>
								<MessageBanner className={'mb-5'} color={MessageBanner.COLOR.BLUE}
									icon={MessageBanner.ICON.FAILURE}
									description={i18nLabels.CANNOT_UPLOAD_MESSAGE}
								/>
							</elseif>
							<elseif condition={!measurement && healthInsuranceNumber}>
								<MessageBanner className={'mb-5'} color={MessageBanner.COLOR.BLUE}
									icon={MessageBanner.ICON.FAILURE}
									description={i18nLabels.MEASUREMENT_MISSING_ERROR}
								/>
							</elseif>
							<else>
								<if condition={uploadStatus === UPLOAD_STATUS.INITIAL && measurement && healthInsuranceNumber}>
									<div>
										<div className="row d-flex border-bottom-grey pb-4 pt-2 m-0">
											<div className="col-12 col-md-6 mt-2 position-relative">
												<h6 className="w-100 d-inline-block adc-generic-widget--font-medium-bold position-relative">
													<I18n text={readerInformation} />
													<div className="align-top adc-wizard__tooltiptop adc-tooltiptop__insurance-details">
														<i className="adc-icon adc-icon--small adc-icon--info-box  false align-middle ml-1 position-relative" aria-hidden="true" />
														<div className="adc-wizard__tooltiptop--content adc-tooltiptop__insurance-details--content tooltiptop-align-right text-left p-2">
															<I18n text={i18nLabels.HEALTH_CERTIFICATE_INFO} />
														</div>
													</div>
												</h6>
											</div>
											<div className="col-12 col-md-6 d-flex ml-auto text-right px-md-0 px-lg-3">
												<Button
													action={this.uploadDocument}
													label={uploadLabel}
													ctaStyle={uploadStyle}
													isFullWidth
													hasNoMargin
													icon={'upload-blue'}
													iconPosition={Icon.POSITION.LEFT}
													className={'uploadDocumentCTA'}
												/>
											</div>
										</div>
									</div>
								</if>
								<if condition={uploadStatus === UPLOAD_STATUS.UPLOADED}>
									<MessageBanner color={MessageBanner.COLOR.BLUE}
										icon={MessageBanner.ICON.FAILURE}
										description={i18nLabels.UPLOAD_TIMESTAMP_ERROR}
									/>
								</if>
							</else>
						</else>
						<if condition={uploadStatus === UPLOAD_STATUS.UPLOAD}>
							<div className="col-12 col-lg-7 col-xl-6 mt-2 position-relative">
								<h6 className="w-100 d-inline-block adc-generic-widget--font-medium-bold position-relative">
									<I18n text={readerInformation} />
									<div className="align-top adc-wizard__tooltiptop adc-tooltiptop__insurance-details">
										<i className="adc-icon adc-icon--small adc-icon--info-box  false align-middle ml-1 position-relative" aria-hidden="true" />
										<div className="adc-wizard__tooltiptop--content adc-tooltiptop__insurance-details--content tooltiptop-align-right text-left p-2">
											<I18n text={i18nLabels.HEALTH_CERTIFICATE_INFO} />
										</div>
									</div>
								</h6>
							</div>
							<div className="w-60 float-right mt-2">
								<Link
									action={this.cancelUpload}
									hasNoMargin
									icon={'close-icon'}
									label={'Abbrechen'}
								/>
							</div>
							<Dropzone onDropAccepted={data => this.acceptFile(data)}
								onDropRejected={data => this.rejectFile(data)}
								accept={'application/pdf, image/jpeg, image/png'}
								minSize={0}
								maxSize={maxUploadFileSize}
								multiple={false}>
								{({getRootProps, getInputProps}) => (
									<section
										onDragOver={() => this.updateDraggingState(true)}
										onDragLeave={() => this.updateDraggingState(false)}
										onDrop={() => this.updateDraggingState(false)}
										className={'border-dashed-' + getValidationErrorClassName(validationError, error, isDragging) + ' text-center p-4'}>
										{validationError &&
											<MessageBanner onClose={() => this.clearValidationError()}
												color={MessageBanner.COLOR.RED}
												icon={MessageBanner.ICON.FAILURE}
												description={!isfileSizeError ? i18nLabels.INCORRECT_FILETYPE : i18nLabels.UPLOAD_SIZE_ERROR}
												params={!isfileSizeError && [validationError]} />
										}
										<div {...getRootProps()} className={'adc-wizard__dropzone'}>
											<input {...getInputProps()} />
											<span className="d-block mb-3 mt-5 px-3 py-4 ">
												<Icon image={'rezept-gray'} className={'adc-wizard__upload--rezept-icon'}
													size={Icon.SIZE.HUGE} />
											</span>
											{isDragging &&
												<p className="w-100 d-inline-block adc-generic-widget--text mb-2 px-4"><I18n
													text={i18nLabels.DROP_FILE} /></p>
											}
											{!isDragging && <>
												<p className="w-100 d-inline-block adc-genetric-widget--text mb-2 px-4"><I18n
													text={i18nLabels.UPLOAD_HINT} /></p>
												<p className="w-100 d-inline-block adc-generic-widget--text mb-3  px-4"><I18n
													text={i18nLabels.OR} />
												</p>
												<span
													className={'adc-button adc-button-' + uploadStyle + ' uppercase block mb-2 no-margin button-bg-none col-10 offset-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 text-center  m-0 px-0 position-relative uploadDocumentspan'}>
													<Icon image={uploadStyle === BUTTON_OPTIONS.STYLE.PRIMARY ? 'upload-white' : 'upload-blue'}
														className={'adc-wizard__upload--download-icon position-absolute'} />
													{uploadLabel}
												</span>
											</>
											}
										</div>
									</section>
								)}
							</Dropzone>
						</if>
						<if condition={uploadStatus === UPLOAD_STATUS.UPLOADING}>
							<div className="w-60 w-60 float-top pb-3"><I18n text={readerInformation} />
								<div className="adc-tooltipbottom">
									<i className="adc-icon adc-icon--small adc-icon--info-box  false align-middle ml-1 position-relative" aria-hidden="true" />
									<div className="adc-tooltipbottom__content adc-documentUpload__tooltip-content p-2">
										<I18n text={i18nLabels.HEALTH_CERTIFICATE_INFO} />
									</div>
								</div>
							</div>
							<div className="w-60 float-right mt-2">
								<Link
									action={this.cancelUpload}
									hasNoMargin
									icon={'close-icon'}
									label={'Abbrechen'}
								/>
							</div>
							<section
								className={'border-dashed-' + (validationError || error ? 'error' : 'grey') + ' text-center p-4 mt-5'}>
								{error && <MessageBanner color={MessageBanner.COLOR.RED}
									icon={MessageBanner.ICON.FAILURE}
									onClose={() => this.clearValidationError()}
									description={i18nLabels.UPLOAD_ERROR} />}
								{!error && <>
									<span className="d-block my-5 ">
										<Icon image={data ? ' ' : 'waiting-icon'}
											size={Icon.SIZE.LARGE} className={'font-weight-bold align-middle mr-3' + (data ? '' : ' adc-icon--rotating')} />
										{data && <I18n text={i18nLabels.CEC_UPLOAD_SUCCESS} />}
									</span>
									<div className="d-flex border-bottom-grey border-top-grey pt-4">
										<div className="w-100 d-flex border-bottom-grey border-top-grey pt-4 pr-5 ">
											<span className="d-block mb-3 px-3">
												<Icon image={'rezept-gray'} className={'adc-wizard__upload--rezept-icon'}
													size={Icon.SIZE.HUGE} />
											</span>
											<div className="w-100 mr-auto position-relative  adc-wizard__upload ">
												<p className="adc-generic-widget--text text-left mb-1">{fileName}</p>
												<div className="progress adc-progress">
													<div className="progress-bar adc-progress__bar"
														style={{width: uploadPercentage + '%'}} />
												</div>
												<span
													className="adc-progress__value position-absolute text-left mt-1 d-block">{uploadPercentage}{'%'}</span>
											</div>
											{!data &&
											<Icon image={'close-icon'} size={Icon.SIZE.SMALL} onClick={() => this.cancelUpload()}
												className={'font-weight-bold adc-wizard__upload--close-icon align-top'} />
											}
										</div>
									</div>
								</>}
							</section>
						</if>
						<div className="adc-empty-card__message mt-4 mb-3">
							<i className="adc-icon adc-icon--medium adc-icon--email-black pb-2 false d-inline-block mr-2 align-middle" aria-hidden="true" />
							{healthHelpText}
						</div>
						{customer?.id && <>
							<if condition={isCopayPermanent}>
								<Row className={'border-top border-right-0 border-left-0 py-4 m-0'}>
									<Col width={7} md={8} className={'text-secondary d-flex align-items-center'}><I18n text={i18nLabels.IS_COPAY_PERMANENT} /></Col>
									<Col width={5} md={4} className="pl-0">
										<div className={'d-flex align-items-center'}>
											<Icon image={'tick-circle-green'} size={Icon.SIZE.LARGE} />
											<span className={'display-inline-block pl-2 font-weight-bold'}>
												<I18n text={i18nLabels.IS_COPAY_PERMANENT_TRUE} />
											</span>
										</div>
									</Col>
								</Row>
							</if>
							<else>
								<if condition={!(isExemptedNextYear === COPAY_EXEMPTION_STATUS.NULL && isExemptedThisYear === COPAY_EXEMPTION_STATUS.NULL)}>
									<Row className={'border border-right-0 border-left-0 py-4 m-0'}>
										<Col width={7} md={8} className={'text-secondary d-flex align-items-center'}><I18n text={i18nLabels.CEC_VALID_THIS_YEAR} /></Col>
										<Col width={5} md={4} className="pl-0">
											<div className={'d-flex align-items-center'}>
												<Icon image={isExemptedThisYear === COPAY_EXEMPTION_STATUS.YES ? 'tick-circle-green' : 'large-x-circle-orange'} size={Icon.SIZE.LARGE} />
												<span className={'display-inline-block pl-2 font-weight-bold'}>
													<I18n text={`exempted_this_year_${isExemptedThisYear}`} />
												</span>
											</div>
										</Col>
									</Row>
									<Row className={'border border-right-0 border-left-0 border-top-0 py-4 m-0'}>
										<Col width={7} md={8} className={'text-secondary d-flex align-items-center'}><I18n text={i18nLabels.CEC_VALID_NEXT_YEAR} /></Col>
										<Col width={5} md={4} className="pl-0">
											<div className={'d-flex align-items-center'}>
												<Icon image={isExemptedNextYear === COPAY_EXEMPTION_STATUS.YES ? 'tick-circle-green' : 'large-x-circle-orange'} size={Icon.SIZE.LARGE} />
												<span className={'display-inline-block pl-2 font-weight-bold'}>
													<I18n text={`exempted_next_year_${isExemptedNextYear}`} />
												</span>
											</div>
										</Col>
									</Row>
								</if>
							</else>
						</>
						}
					</CardContent>
					<div>
						<Icon image={'close-icon'} size={Icon.SIZE.SMALL}
							className={'font-weight-bold adc-wizard__upload--close-icon align-top'} />
					</div>
				</Card>
			</div>
		);
	}
});