import React from 'react';
import PropTypes from 'prop-types';
import {i18nLabels} from '../../../../utils/translationUtils';
import SearchBarTextField from './SearchBarTextField';

const SearchField = ({isInBanner, handleSearch, onFocus, onChange, onKeyDown, topFaqLabel, faqPagePath, rendition}) => {
	return (
			<div
      onFocus={onFocus}
      className="adc-search-field form-inline align-items-center"
    >
      <div
        className={"adc-search-field__input-wrapper" + (!isInBanner ? " p-relative form-inline justify-content-end d-flex" : " w-100 text-left")}>
				<SearchBarTextField
          			name={isInBanner ? "faqQuery" : "query"}
          			type="text"
					placeholder={rendition === 'v2-rendition' ? i18nLabels.FAQ_SEARCH_PLACEHOLDER_v2 : i18nLabels.FAQ_SEARCH_PLACEHOLDER }
					onChange={onChange}
					onKeyDown={onKeyDown}
				/>

				<if condition={rendition === 'v2-rendition'}>
					<span className="search-icon-blue" onClick={handleSearch}>
						<i className="search-icon-blue-logo" />
					</span>
				</if>
				<else>
					<span className="adc-search-field__icon c-pointer" onClick={handleSearch}>
						<i className={'adc-icon adc-icon--' + (isInBanner ? 'lg' : 'md') + ' adc-icon--search-' + (isInBanner ? 'blue' : 'grey')}/>
					</span>
				</else>
			</div>

      {!isInBanner &&
        <a href={faqPagePath} className="m-0 faq-link d-none d-lg-block">{topFaqLabel}</a>
      }
		</div>
	);
};

SearchField.propTypes = {
	isInBanner: PropTypes.bool,
	handleSearch: PropTypes.func,
	onKeyDown: PropTypes.func,
	onFocus: PropTypes.func,
	onChange: PropTypes.func,
	topFaqLabel: PropTypes.string,
	faqPagePath: PropTypes.string,
	rendition: PropTypes.string
};
export default SearchField;