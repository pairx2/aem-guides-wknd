import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {closeModalAction} from '../../Modal/redux/actions/index';
import {i18nLabels} from '../../../utils/translationUtils';
import SelectField from '../../Form/components/GenericFields/SelectField';
import Button, {BUTTON_OPTIONS} from '../../Generic/components/Button/Button';
import Row from '../../Generic/components/Container/Row';
import PropTypes from 'prop-types';
import Col from '../../Generic/components/Container/Col';
import {DEFAULT_COUNTRY_OPTIONS} from '../../../utils/enums';

const initialDocPath = props => props.isSpecial ? props.sickFundDocuments?.[0]?.path : props.sickFundDocuments.find(document => document.language === DEFAULT_COUNTRY_OPTIONS[0].country_code)?.path || props.sickFundDocuments?.[0]?.path;
const mapStateToProps = (state, props) => {
	const {pdfLink} = state.form.sickFundSearchModal?.values || {};
	const initialValues = {
		pdfLink: initialDocPath(props) || ''
	};
	return {initialValues, pdfLink};
};

const mapDispatchToProps = {
	closeModal: closeModalAction
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
	form:'sickFundSearchModal'
})(class SickFundSearchModal extends Component {

	static propTypes = {
		sickFundDocuments: PropTypes.array,
		sickFundInformation: PropTypes.string,
		pdfLink: PropTypes.string,
		moreInfoPath: PropTypes.string,
		closeModal: PropTypes.func,
		isSpecial: PropTypes.bool
	};

	getLanguageOptions = () => this.props.sickFundDocuments?.map(document => ({label: i18nLabels.LANGUAGES[document.language.toUpperCase()] || '', value: document.path}));

	render() {
		const {pdfLink, moreInfoPath, isSpecial, closeModal, sickFundDocuments, sickFundInformation} = this.props;
		return (
			<div className="adc-sick-fund-modal">
				<div className="adc-sick-fund-modal__content">
					<div dangerouslySetInnerHTML={{__html: sickFundInformation}}/>
					<Row>
						<Col md={6} lg={4}>
							<div className="adc-form-group">
								{!isSpecial && sickFundDocuments.length > 0 && <SelectField name="pdfLink" options={this.getLanguageOptions()} label={i18nLabels.PDF_LANGUAGE_LABEL} />}
							</div>
							<div className="mt-3">
								<if condition={pdfLink}>
									<Button
										label={i18nLabels.DOWNLOAD_PDF}
										type={ BUTTON_OPTIONS.STYLE.SECONDARY }
										buttonType={BUTTON_OPTIONS.TYPE.BUTTON}
										icon={'download-white'}
										iconPosition={'left'}
										isDownload
										href={pdfLink}
										hasNoMargin
										isFullWidth
									/>
								</if>
							</div>
						</Col>
					</Row>
					<Row className="mt-5">
						<Col md={6} lg={4} >
							<Button
								label={i18nLabels.REIMBURSMENT_MORE_INFO}
								type={ BUTTON_OPTIONS.STYLE.PRIMARY }
								buttonType={BUTTON_OPTIONS.TYPE.BUTTON}
								hasNoMargin
								isFullWidth
								href={moreInfoPath}
							/>
						</Col>
						<Col md={6} lg={4}>
							<Button
								className= {'mt-3 mt-md-0'}
								label={i18nLabels.CLOSE_MODAL_LABEL}
								type={ BUTTON_OPTIONS.STYLE.SECONDARY }
								buttonType={BUTTON_OPTIONS.TYPE.BUTTON}
								hasNoMargin
								isFullWidth
								action={closeModal}
							/>
						</Col>
					</Row>
				</div>
			</div>
		);
	}
}));