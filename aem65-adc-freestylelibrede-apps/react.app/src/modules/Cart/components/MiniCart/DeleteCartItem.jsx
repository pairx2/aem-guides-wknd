import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {deleteProductRequest} from '../../redux/actions/cart.action';


const mapDispatchToProps = {
	removeCartItem: deleteProductRequest
};

const DeleteCartItem = ({removeCartItem, productID}) => {
	return (
		<img className = {'mb-2 ml-3'}
			src="/etc.clientlibs/adc/freestylelibrede/clientlibs/clientlib-site/resources/icon/Trash_blue.svg"
			alt="delete product"
			onClick={() => removeCartItem({itemId: productID})}
		/>
	);
};

DeleteCartItem.propTypes = {
	productID: PropTypes.number.isRequired,
	removeCartItem: PropTypes.func
};
export default connect(null, mapDispatchToProps)(DeleteCartItem);