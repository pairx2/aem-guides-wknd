import React, {Component} from 'react';
import PropTypes from 'prop-types';
import EnlargedImage from './EnlargedImage';
import {openModalAction} from '../../../Modal/redux/actions/index';
import {connect} from 'react-redux';
import {isMobile} from '../../../../utils/regexUtils';


const mapDispatchToProps = {
	openModalAction
};

export default connect(null, mapDispatchToProps)(class ProductImage extends Component {
	static defaultProps = {};


	static propTypes = {
		image: PropTypes.object,
		openModalAction: PropTypes.func,
		productItems: PropTypes.array,
		isModalOpen:PropTypes.bool,
		productName: PropTypes.string
	};

	state = {
		displayEnlarged: false
	};
	onHover = (e) => {
		const target = e.currentTarget.getBoundingClientRect();
		const offsetX = target.x;
		const offsetY = target.y;
		const width = target.width;
		const height = target.height;
		this.setState({
			enlargedImageFocus: `${-60 + (e.clientX - offsetX) / width * 200}% ${-60 + (e.clientY - offsetY) / height * 200}%`,
			displayEnlarged: true
		});
	};

	onMouseLeave = () => {
		this.setState({
			displayEnlarged: false
		});
	};

	openImageModal = () =>{
		const {openModalAction, productItems} = this.props;
		openModalAction({
			contentID: 'imageModal',
			className: 'adc-modal-image-pdp-mobile',
			props: {
				productItems:  productItems
			}
		});

	}
	render() {
		const {image, isModalOpen, productName} = this.props;
		return <>
			<div className="adc-product-carousel__item p-2 d-flex align-items-center justify-content-center"
				 onMouseMove={!isMobile ? this.onHover : undefined}
				 onMouseLeave={!isMobile ? this.onMouseLeave : undefined}
				 onClick={isMobile && !isModalOpen ? this.openImageModal : undefined}>
				<img className={isModalOpen? 'img-fluid img-fluid_image_full lazyload' : 'img-fluid img-fluid_cursor lazyload'}
				src={image.url} alt={productName}/>
			</div>
			{this.state.displayEnlarged && <EnlargedImage image={image}
														  focus={this.state.enlargedImageFocus}/>}
		</>;

	}
});