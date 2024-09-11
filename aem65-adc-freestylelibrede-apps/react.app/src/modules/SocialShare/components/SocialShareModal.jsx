import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {closeModalAction} from '../../Modal/redux/actions';
import Button, {BUTTON_OPTIONS} from '../../Generic/components/Button/Button';

const mapDispatchToProps = {
	closeModalAction,
};

const SocialShareModal = ({closeModalAction, ctaNoType, modalMessage, ctaNoText, ctaYesType, ctaYesText, produtUrl}) => {

	const getProductUrl = (produtUrl) => {
		const productLink = produtUrl + window.location.href;
		closeModalAction();
		window.open(productLink);
	};

	return (
		<div>
			<div>
				<p dangerouslySetInnerHTML={{__html: modalMessage}}/>
			</div>
			<div className="text-center">
				<Button
					type={BUTTON_OPTIONS.TYPE.BUTTON}
					className={'mr-3'}
					action={() => getProductUrl(produtUrl)}
					label={ctaYesText}
					ctaStyle={ctaYesType}
				/>
				<Button
					type={BUTTON_OPTIONS.TYPE.BUTTON}
					className={'mr-3'}
					action={closeModalAction}
					label={ctaNoText}
					ctaStyle={ctaNoType}
				/>
			</div>
		</div>
	);
};

SocialShareModal.propTypes = {
	ctaNoText: PropTypes.string,
	ctaNoType: PropTypes.string,
	ctaYesText: PropTypes.string,
	ctaYesType: PropTypes.string,
	modalMessage: PropTypes.string,
	produtUrl: PropTypes.any,
	closeModalAction: PropTypes.func
};

export default connect(null, mapDispatchToProps)(SocialShareModal);
