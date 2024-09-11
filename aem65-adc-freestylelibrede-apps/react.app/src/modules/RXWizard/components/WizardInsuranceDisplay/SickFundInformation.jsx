import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {i18nLabels} from '../../../../utils/translationUtils';
import SelectField from '../../../Form/components/GenericFields/SelectField';
import Button, {BUTTON_OPTIONS} from '../../../Generic/components/Button/Button';
import Row from '../../../Generic/components/Container/Row';
import PropTypes from 'prop-types';
import Col from '../../../Generic/components/Container/Col';
import Link from '../../../Generic/components/Link/Link';

const mapStateToProps = (state, props) => {
	const {pdfLink} = state.form.SickFundInformation?.values || {};
	const initialValues = {
		pdfLink: props.selectedInsurancePDFs?.[0]?.path || ''
	};
	return {initialValues, pdfLink};
};

export default connect(mapStateToProps, null)(reduxForm({
	form:'SickFundInformation'
})(class SickFundInformation extends Component {

	static propTypes = {
		selectedInsurancePDFs: PropTypes.array,
		selectedInsuraceInfo: PropTypes.string,
		pdfLink: PropTypes.string
	};

	state = {
		shouldTruncate: true,
	};

	getLanguageOptions = () => this.props.selectedInsurancePDFs?.map(document => ({label: i18nLabels.LANGUAGES[document.language.toUpperCase()] || '', value: document.path}));

	handleSelectedInsuraceInfo = () => {
		const {shouldTruncate} = this.state;
		this.setState({
			shouldTruncate: !shouldTruncate,
		});
	}

	render() {
		const {pdfLink, selectedInsurancePDFs,selectedInsuraceInfo} = this.props;
		const {shouldTruncate} = this.state;
		const contentLength = document.getElementById('selectedInsuraceInfoContent')?.innerText.length;
		const truncatedContent = document.getElementById('selectedInsuraceInfoContent')?.innerText.substr(0,199).trim();
		return (
			<div className="adc-sick-fund-details">
				<div className="adc-sick-fund-details__content">
					<div className='mt-2 mb-0 adc-sick-fund-details__word-break'>
						<if condition={contentLength > 200 && shouldTruncate}>
							<p>{truncatedContent}{'...'}</p>
						</if>
						<else>
							<div dangerouslySetInnerHTML={{__html: selectedInsuraceInfo}} />
						</else>
					</div>
					<div id='selectedInsuraceInfoContent' className= {'d-none'} dangerouslySetInnerHTML={{__html: selectedInsuraceInfo}} />
					<if condition={contentLength > 200}>
						<div className="w-100 d-inline-block text-left">
							<Link
								action={this.handleSelectedInsuraceInfo}
								icon={shouldTruncate? 'arrow-down-blue':'arrow-up-blue'}
								label={shouldTruncate? i18nLabels.VIEW_MORE:i18nLabels.VIEW_LESS}
							/>
						</div>
					</if>
					<Row>
						<Col md={6} lg={12}>
							<div className="adc-form-group">
								{selectedInsurancePDFs.length > 0 && <SelectField name="pdfLink" options={this.getLanguageOptions()} label={i18nLabels.PDF_LANGUAGE_LABEL} />}
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
										target={'_blank'}
									/>
								</if>
							</div>
						</Col>
					</Row>
				</div>
			</div>
		);
	}
}));