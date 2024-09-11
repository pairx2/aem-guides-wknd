import React from 'react';
import PropTypes from 'prop-types';
import {i18nLabels} from '../../../../utils/translationUtils';
import I18n from '../../../Translation/components/I18n';

{/* TODO: Remove this once fully implemented */}
{/* eslint-disable react/jsx-no-literals */}
const InsuranceDisplay = ({sickFundPdfPath, downloadStyle, acknowledgePdfCheckbox}) => {
	return <section>
		<div
			className="w-100 d-inline-block adc-generic-widget--font-medium-bold">DAK-Gesundheit {/*captured by OCR*/}
			<i className="adc-icon adc-icon--md adc-icon--info-box align-middle ml-1" />
		</div>
		<div className="w-100 d-inline-block mt-3">
			<div className="w-50 float-left"><I18n
				text={i18nLabels.INSURANCE_NUMBER_LABEL}/>{/*OCR decides if membership or insurance nº*/}</div>
			<div className="w-50 float-right text-right">23 45 6M 09 98 7 {/*captured by OCR*/}</div>
		</div>
		<div className="w-100 d-inline-block mt-3 position-relative">
			<div className="w-75 float-left">
				<p className="adc-generic-widget--text mt-2 mb-0"><I18n text={i18nLabels.INSURANCE_DISCLAIMER}/></p>
				<p className="adc-generic-widget--text mt-2 mb-0">Als Mitglied der DAK
					Gesundheitskasse,
					erhalten Sie im Rahmen der Erstversorgung Lesegerät
					sowie Sensoren für die kommenden 12 Monate. {/* based on the insurance coming from OCR*/}</p>
			</div>
			<div
				className="adc-icon adc-icon--md adc-icon--info-box adc-wizard--information align-middle ml-1 position-absolute adc-wizard__tooltiptop">
				<div className="adc-wizard__tooltiptop--content text-left p-2">
					<I18n text={i18nLabels.DISCLAIMER_HOVER}/>
				</div>
			</div>
		</div>
		{/*<a href="#" className="adc-text-link text-decoration-none">mehr Anzeigen
				<i className="adc-icon adc-icon--sm adc-icon--arrow-down-blue align-middle"></i>
			</a>*/}
		<div className="adc-form-group">
			<label className="adc-form-group__label" htmlFor="Straße"><I18n text={i18nLabels.CHOOSE_LANGUAGE}/></label>
			<select name="slct" id="slct" className="form-control adc-form-group__selectbox">
				<option selected value="1">Deutsch</option>
				<option value="2">Deutsch 1</option>
				<option value="3">Deutsch 2</option>
			</select>

		</div>
		<a href={sickFundPdfPath}
		   className={'adc-button-' + downloadStyle + ' large blue button-bg-none position-relative button-block text-center  m-0 mt-4 px-0'}
		   download>
			<i className="adc-icon adc-icon--md adc-wizard--download-down-icon adc-icon--download-white position-absolute"/>
			<I18n text={i18nLabels.DOWNLOAD_PDF}/>
		</a>
		<label className="checkbox-container mt-3">{acknowledgePdfCheckbox}
			<input type="checkbox" className="checkbox-container__input"/>
			<span className="checkbox-container__checkmark mt-1"/>
		</label>
	</section>;
};

InsuranceDisplay.propTypes = {
	sickFundPdfPath: PropTypes.string,
	downloadStyle: PropTypes.string,
	acknowledgePdfCheckbox: PropTypes.string
};

export default InsuranceDisplay;