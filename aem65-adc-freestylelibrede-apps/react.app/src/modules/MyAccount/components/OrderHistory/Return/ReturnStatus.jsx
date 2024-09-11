import React from 'react';
import I18n from '../../../../Translation/components/I18n';
import {i18nLabels} from '../../../../../utils/translationUtils';
import {getFormattedDate} from '../../../../../utils/dateUtils';
import {replaceSpaceWithDash} from '../../../../../utils/regexUtils';
import {RETURN_STATUS_WITH_DASH} from '../../../../../utils/enums';

const ReturnStatus = ({returnDetails}) => {
	return (
		<div className='returnstatus my-3'>
		{returnDetails && returnDetails.map((item) =>
			<if condition={item.csStatus} key={returnDetails.returnId}>	
					<p className={replaceSpaceWithDash(RETURN_STATUS_WITH_DASH + item?.returnType)}><I18n text={replaceSpaceWithDash(i18nLabels.RETURN_STATUS_LABEL + item?.returnType)} params={[getFormattedDate(item?.returnRequestDate)]} suffix={':'} /> <span className={'font-weight-600'}> <I18n text={replaceSpaceWithDash(RETURN_STATUS_WITH_DASH + item?.csStatus)} /></span></p>
			</if>
		)}
		</div>
	);
};

ReturnStatus.propTypes = {};
ReturnStatus.defaultProps = {
	returnDetails: []
};

export default ReturnStatus;