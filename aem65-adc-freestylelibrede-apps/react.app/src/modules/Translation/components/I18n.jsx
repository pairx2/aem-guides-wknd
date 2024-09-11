import React from '../../../../node_modules/react/index';
import PropTypes from 'prop-types';
import {containsHTML, useTranslation} from '../../../utils/translationUtils';

const I18n = ({text, params, customStylesParams, prefix, suffix}) => {
	const message = (prefix || '') + (useTranslation(text, params, customStylesParams) || '') + (suffix || '');
	return containsHTML(message) ?
		<span dangerouslySetInnerHTML={{__html: message}}/> :
		message;
};

I18n.propTypes = {
	text: PropTypes.string,
	params: PropTypes.array,
	customStylesParams: PropTypes.string,
	prefix: PropTypes.string,
	suffix: PropTypes.string
};

export default I18n;