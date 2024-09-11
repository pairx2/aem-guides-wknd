import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import PropTypes from 'prop-types';


const SearchForm = (props) => {
	const {heading, description, image} = props;
	return <div className="adc-search-banner" style={{backgroundImage: `url(${image})`}}>
		<div className="adc-search-banner__content">
			<div className="container">
				<div className="row justify-content-center">
					<div className="row col-12 col-lg-10 col-xl-8 justify-content-center">
						<if condition={heading}>
							<h1 className="adc-title adc-title--white col-12">{heading}</h1>
						</if>
						<if condition={description}>
							<div className="adc-search-banner__subheading col-12 col-lg-9">
								<h5 className="adc-title adc-title--white">{description}</h5>
							</div>
						</if>
						<SearchBar isInBanner {...props}/>
					</div>
				</div>
			</div>
		</div>
	</div>;
};

SearchForm.propTypes = {
	heading: PropTypes.string,
	description: PropTypes.string,
	image: PropTypes.string,
};

export default SearchForm;