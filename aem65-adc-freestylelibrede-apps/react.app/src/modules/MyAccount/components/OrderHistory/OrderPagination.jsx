import React from 'react';
import PropTypes from 'prop-types';
import Pagination from 'react-js-pagination';
import {NO_OF_PAGES_TO_DISPLAY} from '../../../../utils/enums';

const OrderPagination = ({currentPagination, setPagination, totalItemsCount, itemsCountPerPage}) => {
	return (
		<div className="row">
			<div className="col-12 pt-4 pb-2">
				<Pagination
					activePage={currentPagination}
					itemsCountPerPage={itemsCountPerPage}
					totalItemsCount={totalItemsCount}
					innerClass='adc-pagination pagination justify-content-center align-items-center'
					activeClass = {'adc-pagination__page-item page-item active'}
					itemClass = {'adc-pagination__page-item page-item	'}
					activeLinkClass= "adc-pagination__page-item__page-link page-link"
					onChange={(page) => setPagination(page)}
					onClick={(page) => setPagination(page)}
					nextPageText={<i className="adc-icon adc-icon--md adc-icon--arrow-forth-blue"/>}
					lastPageText={<i className="adc-icon adc-icon--md adc-icon--skip-forward"/>}
					prevPageText={<i className="adc-icon adc-icon--md adc-icon--arrow-back-blue"/>}
					firstPageText={<i className="adc-icon adc-icon--md adc-icon--skip-backward"/>}
					pageRangeDisplayed={NO_OF_PAGES_TO_DISPLAY}
				/>
			</div>
		</div>
	);
};

OrderPagination.propTypes = {
	currentPagination: PropTypes.number,
	totalItemsCount: PropTypes.number,
	itemsCountPerPage: PropTypes.number,
	setPagination: PropTypes.func
};

export default OrderPagination;