import React from 'react';
import Image from '../Image/Image';
import PropTypes from 'prop-types';

const Panel = ({image, items, altText}) => <div className="adc-panel">
	<div className="position-relative">
		<Image src={image} className="img-fluid d-block" fit={Image.FIT.COVER} alt={ altText || 'Panel Image'} />
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-12 col-lg-10 position-absolute adc-panel__content mb-sm-0 mb-md-4 mb-lg-5">
					<div className="w-100 d-flex bd-highlight align-items-center adc-panel__items">
						{items.map((item) =>
							<div key={item.icon} className={'flex-fill text-center w-25 adc-panel__items--border px-2'}>
								<i className={`adc-icon adc-panel__icon adc-icon--${item.icon} align-middle`}/>
								<h4 className="mt-3 adc-panel__title adc-title--white " dangerouslySetInnerHTML={{__html: item.text}} />
							</div>)}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>;

Panel.propTypes = {
	image: PropTypes.string,
	items: PropTypes.array,
	altText: PropTypes.string
};
export default Panel;