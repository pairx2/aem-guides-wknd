import React from 'react';
import LoadingIndicator from '../../../Generic/components/Loading/LoadingIndicator';
import I18n from '../../../Translation/components/I18n';
import {i18nLabels} from '../../../../utils/translationUtils';

const RegistrationInProgressModal = () => {
	return <div className="row adc-error-modal">
		<div className="col-12">
			<div className="rounded bg-white px-lg-5 py-lg-2 px-5 py-3 mb-4">
				<div className="row mt-5 align-items-center">
					<div className="col-2 text-center">
						<LoadingIndicator/>
					</div>
					<div className="col-10">
						<h3><I18n text={i18nLabels.PROCESSING_REGISTRATION}/></h3>
					</div>
				</div>
			</div>
		</div>
	</div>;
};

export default RegistrationInProgressModal;