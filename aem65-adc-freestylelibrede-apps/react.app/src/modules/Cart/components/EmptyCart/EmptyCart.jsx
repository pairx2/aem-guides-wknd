import React from 'react';
import PropTypes from 'prop-types';
import Button, {BUTTON_OPTIONS} from '../../../Generic/components/Button/Button';

const renderEmptyMinicart = ({message}) => {
	return (
		<div className="cart-no-product-msg">
			<h4 className="adc-title adc-title--blue text-center minicart-fontweight">{message}</h4>
		</div>
	);
};

renderEmptyMinicart.propTypes = {
	message: PropTypes.string
};

const renderEmptyCartList = (props) => {
	const {message, imgPath, buttonCTA, emptyCartCtaStyle, emptyCartCtaDestination, emptyCartCtaTarget} = props;
	return (
		<>
			<div className="rounded pt-1 pb-3">
				<div className="row justify-content-center align-items-center">
					<div className="col-md-8">
						<div className="row justify-content-center">
							<div className="text-center col-12 col-md-6">
								{message}
							</div>
						</div>
						<p className="mt-4 mb-0 text-center">
							<img src={imgPath} alt="testmonial" />
						</p>
					</div>
				</div>
			</div>
			<div className="mt-3 marginB-100">
				<div className="row mr-t-25 justify-content-center">
					<div className="col-11 col-md-4 text-center">
						<Button
							label={buttonCTA}
							type={BUTTON_OPTIONS.TYPE.SUBMIT.BUTTON}
							ctaStyle={emptyCartCtaStyle !== BUTTON_OPTIONS.STYLE.PRIMARY ? BUTTON_OPTIONS.STYLE.SECONDARY : BUTTON_OPTIONS.STYLE.PRIMARY}
							size={BUTTON_OPTIONS.SIZE.LARGE}
							href={emptyCartCtaDestination}
							target={emptyCartCtaTarget}
							isFullWidth
							hasNoMargin
						/>
					</div>
				</div>
			</div>
		</>
	);
};

renderEmptyCartList.propTypes = {
	message: PropTypes.string,
	imgPath: PropTypes.string,
	buttonCTA: PropTypes.string,
	emptyCartCtaStyle: PropTypes.string,
	emptyCartCtaDestination: PropTypes.string,
	emptyCartCtaTarget: PropTypes.string,
};

const EmptyCart = (props) => {
	if (props.cartType === EmptyCart.TYPE.MINICART) {
		return renderEmptyMinicart(props);
	} else if (props.cartType === EmptyCart.TYPE.CARTLIST) {
		return renderEmptyCartList(props);
	}
};

EmptyCart.TYPE = {
	MINICART: 'minicart',
	CARTLIST: 'cartlist'
};

EmptyCart.propTypes = {
	cartType: PropTypes.oneOf([...Object.values(EmptyCart.TYPE)]),
	message: PropTypes.string,
	imgPath: PropTypes.string,
	buttonCTA: PropTypes.string,
	emptyCartCtaStyle: PropTypes.string,
	emptyCartCtaDestination: PropTypes.string,
	emptyCartCtaTarget: PropTypes.string,
};


export default EmptyCart;