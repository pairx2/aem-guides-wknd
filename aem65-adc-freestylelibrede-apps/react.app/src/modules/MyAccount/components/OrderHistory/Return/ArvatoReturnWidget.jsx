import React from 'react';
import PropTypes from 'prop-types';
import {getServiceEndPoint} from '../../../../../utils/endpointUrl';


const ArvatoReturnWidget = ({ lang, country, city, orderid, zipCode, email}) => {
	if (!document.querySelector("#orc_arvato_script_url")) {
		const tag = document.createElement('script');
		tag.src = getServiceEndPoint('orc.arvato.script.url');
		tag.id = "orc_arvato_script_url";
		document.getElementsByTagName('body')[0].appendChild(tag);
	}
	return (
			<arvato-returns-widget
				lang={lang}
				country={country}
				city={city}
				orderid={orderid}
				zipcode={zipCode}
				email={email}
				autoscroll="false">
			</arvato-returns-widget>
	);
};

ArvatoReturnWidget.propTypes = {
	lang: PropTypes.string,
	country: PropTypes.string,
	city: PropTypes.string,
	orderid: PropTypes.string,
	zipCode: PropTypes.string,
	email: PropTypes.string
};

export default ArvatoReturnWidget;