import React from 'react';
import PropTypes from 'prop-types';
import I18n from '../../../Translation/components/I18n.jsx';

const ProgressBar = ({currentStep, steps}) => {
	const STATE = {
		ACTIVE: 'active',
		COMPLETE: 'complete'
	};
	const getStepState = i => {
		const step = i + 1;
		if (currentStep === step) return STATE.ACTIVE;
		if (step < currentStep) return STATE.COMPLETE;
	};
	const progressStepClassname = (index) => `adc-progress-bar__step--${getStepState(index)}`
	return (
		<ul className="adc-progress-bar mt-3">
			{steps.map((step, index) =>
				<li key={`progress-step-${step}`}
					className={`adc-progress-bar__step ${getStepState(index) ? progressStepClassname(index) : ''}`}>
					<I18n text={step.title} />
					<span className="step-line"/>
				</li>
			)
			}
		</ul>
	);
};

ProgressBar.propTypes = {
	currentStep: PropTypes.number,
	steps: PropTypes.array
};

export default ProgressBar;