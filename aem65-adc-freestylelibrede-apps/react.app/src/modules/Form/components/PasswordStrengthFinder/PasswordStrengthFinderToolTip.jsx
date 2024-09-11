import React from 'react';
import I18n from '../../../Translation/components/I18n';
import PropTypes from 'prop-types';

const PasswordStrengthFinderToolTip = ({colorBar, isAccountPasswordEdit}) => {
	return (
		<div className={`${isAccountPasswordEdit ? 'adc-tooltipbottom' : 'adc-tooltipright'} adc-icon adc-icon--medium adc-icon--info-box align-middle`}>
			<div className={`${isAccountPasswordEdit ? 'adc-tooltipbottom__content' : 'adc-tooltipright__content'} text-left p-2`}>
				<ul>
					<li className="row mt-2">
						<div className="col p-0 ml-2"><I18n text={'password_rules_heading'}/></div>
					</li>
					<li className="row mt-3">
						<div className="col-1 p-0 ml-2"><span
							className={`adc-bullet adc-bullet--${colorBar.number ? 'green' : 'red'} d-inline-block`}/>
						</div>
						<div className="col-2 p-0 text-left font-weight-bold"><I18n
							text={'password_rules_numeral_req_title'}/></div>
						<div className="col p-0"><I18n text={'password_rules_numeral_req_desc'}/></div>
					</li>
					<li className="row mt-2">
						<div className="col-1 p-0 ml-2"><span
							className={`adc-bullet adc-bullet--${colorBar.character ? 'green' : 'red'} d-inline-block`}/>
						</div>
						<div className="col-2 p-0 text-left font-weight-bold"><I18n
							text={'password_rules_case_req_title'}/></div>
						<div className="col p-0"><I18n text={'password_rules_case_req_desc'}/></div>
					</li>
					<li className="row mt-2">
						<div className="col-1 p-0 ml-2"><span
							className={`adc-bullet adc-bullet--${colorBar.length ? 'green' : 'red'} d-inline-block`}/>
						</div>
						<div className="col-2 p-0 text-left font-weight-bold"><I18n
							text={'password_rules_character_count_title'}/></div>
						<div className="col p-0"><I18n text={'password_rules_character_count_desc'}/></div>
					</li>
					<li className="row mt-2">
						<div className="col-1 p-0 ml-2"><span
							className={`adc-bullet adc-bullet--${colorBar.symbol ? 'green' : 'red'} d-inline-block`}/>
						</div>
						<div className="col-2 p-0 text-left font-weight-bold"><I18n
							text={'password_rules_special_characters_title'}/></div>
						<div className="col p-0"><I18n text={'password_rules_special_characters_desc'}/></div>
					</li>
				</ul>
			</div>
		</div>
	);
};

PasswordStrengthFinderToolTip.propTypes = {
	colorBar: PropTypes.object,
	isAccountPasswordEdit: PropTypes.bool
};

export default PasswordStrengthFinderToolTip;
