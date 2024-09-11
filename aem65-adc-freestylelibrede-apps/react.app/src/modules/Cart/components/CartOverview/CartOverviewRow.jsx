import React from 'react';
import PropsTypes from 'prop-types';
import CartRowImage from '../CartRowImage/CartRowImage';
import Row from '../../../Generic/components/Container/Row';
import Col from '../../../Generic/components/Container/Col';
import {Title} from '../../../Generic/components/Title/Title';
import {formatPrice} from '../../../../utils/pricingUtils';

const CartOverviewRow = ({image, name, pdpLink, price, itemTotalPrice, quantity}) => {
	return (
		<>
			<Row className={'align-items-center mt-2'}>
				<Col width={3} md={4}>
					<CartRowImage
						image={image}
						name={name}
						url={pdpLink}
					/>
				</Col>
				<Col width={3} className={'adc-cartoverview__cart-price pl-4 pl-md-0'}>
					<span>{`${formatPrice(price)}`}</span>
				</Col>
				<Col width={3} md={2} className={' justify-content-center'}>
					<Title size={Title.SIZE.H6} color={Title.COLOR.BLACK} className={'m-0'} text={quantity.toString()} isCentered />
				</Col>
				<Col width={3} className={'text-right adc-cartoverview__cart-price'}>
					<span>{`${formatPrice(itemTotalPrice)}`}</span>
				</Col>
			</Row>
			<Row className={'mt-2'}>
				<Col width={5} sm={3} md={4}>
					<p className={'font-medium-bold'}>{name}</p>
				</Col>
			</Row>
		</>
	);
};
CartOverviewRow.propTypes = {
	name: PropsTypes.string,
	price: PropsTypes.number,
	quantity: PropsTypes.number,
	itemTotalPrice: PropsTypes.number,
	image: PropsTypes.string,
	pdpLink: PropsTypes.string,
};
export default CartOverviewRow;