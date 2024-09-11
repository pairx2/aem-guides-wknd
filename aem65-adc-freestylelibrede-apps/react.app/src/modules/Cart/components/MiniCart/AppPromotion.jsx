import React from 'react';
import PropTypes from 'prop-types';
import Link from '../../../Generic/components/Link/Link';

const AppPromotion = ({downloadAppImage, downloadAppText, learnMoreLinkText, learnMoreLinkDestination, openTab}) => {
	return (
		<div className="cart-header-dropdown-section">
			<div className="row">
				<div className="col-4">
					<img data-src={downloadAppImage} className="img-fluid lazyload" alt="downloadAppImage"/>
				</div>
				<div className="col-8">
					<div className="mb-3">
						<p className="m-0">{downloadAppText}</p>
						<Link href={learnMoreLinkDestination}
							  target={openTab}
							  label={learnMoreLinkText}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

AppPromotion.propTypes = {
	downloadAppImage: PropTypes.string,
	downloadAppText: PropTypes.string,
	learnMoreLinkText: PropTypes.string,
	learnMoreLinkDestination: PropTypes.string,
	openTab: PropTypes.string,
};

export default AppPromotion;