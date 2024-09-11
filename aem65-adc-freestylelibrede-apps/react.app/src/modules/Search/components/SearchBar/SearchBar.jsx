import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchField from './SearchField';
import LoadingIndicator, { LOADING_INDICATOR_OPTIONS } from '../../../Generic/components/Loading/LoadingIndicator';
import { i18nLabels } from '../../../../utils/translationUtils';
import I18n from '../../../Translation/components/I18n';
import ClickOutsideHandler from './ClickOutsideHandler';
import { fetchDictionaryRequest } from '../../../Translation/redux/actions/translation.actions';
import { getSearchBarResultRequest, getSearchResultRequest } from '../../redux/actions/get_results.action';
import { reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import Link from '../../../Generic/components/Link/Link';
import Button, { BUTTON_OPTIONS } from '../../../Generic/components/Button/Button';
import { empty } from '../../../../utils/default';
import { stripHTML } from '../../../../utils/regexUtils';
import { getCookie, setCookie } from "../../../../utils/cookieUtils";
import { search } from "../SearchResults/SearchResults";

const mapStateToProps = state => {
	const { searchBarLoading: isSearchBarLoading, searchBarResults: { result }, faqSearchBarLoading: isFaqSearchBarLoading, faqSearchBarResults: { result: faqResult } } = state.resultsModuleReducer.GetResultsReducer;
	const { dictionary } = state.translationModuleReducer.translationReducer;
	const { values: formValues } = state.form.searchResultForm || {};
	return { isSearchBarLoading, result, isFaqSearchBarLoading, faqResult, dictionary, formValues };
};

const mapDispatchToProps = {
	fetchDictionary: fetchDictionaryRequest,
	getSearchBarResultRequest,
	getSearchResultRequest
};

export default reduxForm({
	form: 'searchResultForm',
	destroyOnUnmount: false
})(connect(mapStateToProps, mapDispatchToProps)(class SearchBar extends Component {
	static propTypes = {
		fetchDictionary: PropTypes.func,
		getSearchBarResultRequest: PropTypes.func,
		nrOfResults: PropTypes.number,
		nrOfViewMore: PropTypes.number,
		resultPage: PropTypes.string,
		isSearchBarLoading: PropTypes.bool,
		isFaqSearchBarLoading: PropTypes.bool,
		result: PropTypes.array,
		faqResult: PropTypes.array,
		isInBanner: PropTypes.bool,
		showAllStyle: PropTypes.string,
		searchRootPath: PropTypes.string,
		topFaqLabel: PropTypes.string,
		faqPagePath: PropTypes.string,
		getSearchResultRequest: PropTypes.func,
		rendition: PropTypes.string
	};

	static defaultProps = {
		nrOfResults: 3,
		nrOfViewMore: 3,
	};

	state = {
		dropdownOpen: false,
		query: '',
		amountToShow: this.props.nrOfResults,
		timeGap: 0,
		delay: 1000
	};

	componentDidMount() {
		this.props.fetchDictionary();
	}

	componentDidUpdate(prevProps) {
		if (this.props.isInBanner) {
			if (JSON.stringify(prevProps.faqResult || {}) !== JSON.stringify(this.props.faqResult || {})) {
				const { nrOfResults } = this.props;
				this.setState({
					amountToShow: nrOfResults
				});
			}
		} else {
			if (JSON.stringify(prevProps.result || {}) !== JSON.stringify(this.props.result || {})) {
				const { nrOfResults } = this.props;
				this.setState({
					amountToShow: nrOfResults
				});
			}
		}
	}

	toggleDropdown = (open) => this.setState({
		dropdownOpen: open,
		limitResults: !open || this.state.limitResults
	});

	getSearchBarResults = (query) => {
		if (query?.trim() !== '') {
			this.props.getSearchBarResultRequest({
				query: stripHTML(query),
				isFAQResults: this.props.isInBanner
			});
		}
	};

	changeQuery = (e) => {
		const self = this;

		if (self.state.timeGap) {
			clearTimeout(self.state.timeGap);
		}

		self.setState({
			query: e.target.value
		}, () => {
			self.setState({
				timeGap: setTimeout(() => {
					self.getSearchBarResults(self.state.query);
				}, this.state.delay)
			});
		});
	};

	handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			this.handleSearch();
		}
	};

	searchQueryV2 = (isInBanner, formValues) =>{
		if (this.props.rendition === "v2-rendition") {
			const searchQuery = isInBanner ? formValues?.faqQuery : formValues?.query;
			this.props.getSearchResultRequest({
				query: searchQuery !== undefined ? searchQuery : this.props.formValues?.search
			});
			this.state.query = searchQuery;
		} else {
			window.location.href = this.props.resultPage + '?query=' + (isInBanner ? formValues?.faqQuery : formValues?.query);
		}
	}

	handleSearch = () => {
		const onResultsPage = this.props.resultPage === window.location.origin + window.location.pathname
			|| this.props.resultPage === window.location.pathname
			|| this.props.resultPage + '.html' === window.location.pathname;
		const { isInBanner, formValues } = this.props;
		if (onResultsPage) {
			const query = isInBanner ? formValues?.faqQuery : formValues?.query;
			const urlSearchParams = new URLSearchParams(window.location.search);
			if (query) {
				urlSearchParams.set('query', query);
			} else {
				urlSearchParams.delete('query');
			}
			window.history.replaceState({}, '', decodeURIComponent(`${window.location.pathname}?${urlSearchParams}`));
			window.dispatchEvent(new Event('locationchange'));
		} else {
			this.searchQueryV2(isInBanner, formValues);
		}

	}

showMoreResults = () => {
	const { nrOfViewMore } = this.props;
	const { amountToShow } = this.state;
	this.setState({
		amountToShow: amountToShow + nrOfViewMore
	});
};

filterByPagination = (result, index) => {
	const { amountToShow } = this.state;
	return index < amountToShow;
};

filterByPath = (result) => {
	const { searchRootPath } = this.props;
	return !searchRootPath || (result.location && result.location.indexOf(searchRootPath) > -1);
};

filteredHits = () => {
	const { isInBanner, faqResult, result } = this.props;
	const results = isInBanner ? faqResult : result;
	return (results || empty.array).filter(this.filterByPath).filter(this.filterByPagination);
};

render() {
	const { isSearchBarLoading, result, isFaqSearchBarLoading, faqResult, isInBanner, formValues, showAllStyle, resultPage, topFaqLabel, faqPagePath, rendition } = this.props;
	const { dropdownOpen, query, amountToShow } = this.state;
	const onResultsPage = resultPage === window.location.origin + window.location.pathname;
	const isLoading = isInBanner ? isFaqSearchBarLoading : isSearchBarLoading;
	const results = isInBanner ? faqResult : result;
	const isSearchQuery = formValues?.faqQuery || formValues?.query;
	return <ClickOutsideHandler handleClickOutside={() => this.toggleDropdown(false)}>
		<div
			className={'adc-search-container' + (isInBanner ? ' adc-search-container--banner col-12 col-lg-9' : '') + (dropdownOpen && query.length >= 3 ? ' open' : '')}>
			<SearchField rendition={rendition} isInBanner={isInBanner} handleSearch={isSearchQuery && this.handleSearch}
				onFocus={() => this.toggleDropdown(true)} onChange={this.changeQuery}
				onKeyDown={isSearchQuery && this.handleKeyDown} value={query} topFaqLabel={topFaqLabel && faqPagePath ? topFaqLabel : null} faqPagePath={faqPagePath} />
			{dropdownOpen && query.length >= 3 &&
				<div className={'adc-search-dropdown' + (isInBanner ? ' adc-search-dropdown--banner' : '')}>
					{isLoading ?
						<div className="row justify-content-center">
							<LoadingIndicator size={LOADING_INDICATOR_OPTIONS.SIZE.SMALL}
								label={i18nLabels.LOADING_RESULTS} />
						</div>
						:
						<>
							<ul className="adc-search-dropdown__list">
								{results && this.filteredHits().map((result) =>
									<li key={'search_bar_result_' + result.title} className="adc-search-dropdown__item">
										<a className="adc-search-dropdown__item-link"
											href={result.location}
										>{result.title}</a>
									</li>
								)}
							</ul>
							{!results || this.filteredHits()?.length === 0 ?
								<p><I18n text={i18nLabels.NO_RESULTS_FOUND} /></p>
								:
								results.length > amountToShow &&
								<div className="adc-search-dropdown__show-result-link">
									<Link action={this.showMoreResults}
										hasNoMargin
										label={i18nLabels.SHOW_MORE_RESULTS}
									/>
								</div>
							}
							{!onResultsPage && (results.length || this.filteredHits()?.length) ?
								<div className="row mt-5">
									<div className="col-md-8">
										<Button
											href={resultPage + (query ? '?query=' + query : '')}
											label={i18nLabels.SHOW_ALL_RESULTS}
											ctaStyle={showAllStyle && showAllStyle.toLowerCase() || BUTTON_OPTIONS.STYLE.PRIMARY}
											size={BUTTON_OPTIONS.SIZE.LARGE}
											isFullWidth
											hasNoMargin
											type={BUTTON_OPTIONS.TYPE.BUTTON}
										/>
									</div>
								</div> : null
							}
						</>
					}
				</div>
			}
		</div>
	</ClickOutsideHandler>;
}
}));