import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getSearchResultRequest} from '../../redux/actions/get_results.action';
import LoadingIndicator from '../../../Generic/components/Loading/LoadingIndicator';
import {getUrlParameter} from '../../../../utils/getParams';
import {reduxForm} from 'redux-form';
import Results from './Results';
import NoResults from './NoResults';
import SearchFilterField from '../../../Form/components/FormFields/SearchFilterField';
import {i18nLabels} from '../../../../utils/translationUtils';
import I18n from '../../../Translation/components/I18n';
import PropTypes from 'prop-types';
import Button, {BUTTON_OPTIONS} from '../../../Generic/components/Button/Button';
import {empty} from '../../../../utils/default';
import {stripHTML} from '../../../../utils/regexUtils';
import 'custom-event-polyfill';
import {For} from "../../../Generic/components/Logic/LogicalComponents";
const mapStateToProps = state => {
	const {loading: isLoading, results: {result, query}} = state.resultsModuleReducer.GetResultsReducer;
	const {values: formValues} = state.form.searchResultForm || {};
	return {isLoading, result, query, formValues};
};

const mapDispatchToProps = {
	getSearchResultRequest
};

export default reduxForm({
	form: 'searchResultForm',
	destroyOnUnmount: false
})(connect(mapStateToProps, mapDispatchToProps)(class SearchResult extends Component {
	static propTypes = {
		nrOfResults: PropTypes.number,
		nrOfViewMore: PropTypes.number,
		getSearchResultRequest: PropTypes.func,
		query: PropTypes.string,
		isLoading: PropTypes.bool,
		result: PropTypes.object,
		filters: PropTypes.array,
		searchRootPath: PropTypes.string,
		searchDefaultList:PropTypes.array,
		rendition:PropTypes.string,
		noResultDescription:PropTypes.string,
		noResultBtnLink:PropTypes.string,
	};

	static defaultProps = {
		nrOfResults: 3,
		nrOfViewMore: 3,
	};

	state = {
		amountToShow: this.props.nrOfResults
	};

	componentDidMount() {
		const query = stripHTML(getUrlParameter('query')); //removing the html tags
		this.props.change('search', query);
		if(this.props.rendition !== 'v2-rendition'){
			this.search(query);
		}
		this.addEventListeners();
	}

	componentDidUpdate(prevProps) {
		if (JSON.stringify(prevProps.formValues?.filters || {}) !== JSON.stringify(this.props.formValues?.filters || {})) {
			const filters = (this.props.formValues?.filters || empty.array).filter(filter => filter !== null);
			const urlSearchParams = new URLSearchParams(window.location.search);
			if (filters) {
				if (filters.length) {
					urlSearchParams.set('filters', filters);
				} else {
					urlSearchParams.delete('filters');
				}
				window.history.replaceState({}, '', decodeURIComponent(`${window.location.pathname}?${urlSearchParams}`));
				window.dispatchEvent(new window.CustomEvent('locationchange'));
			}
		}

		if (JSON.stringify(prevProps.result || {}) !== JSON.stringify(this.props.result || {})) {
			const {nrOfResults} = this.props;
			this.setState({
				amountToShow: nrOfResults
			});
		}
	}

	addEventListeners = () => {
		window.addEventListener('locationchange', () => {
			const query = stripHTML(getUrlParameter('query')); //removing the html tags;
			this.props.change('search', query);
			this.search(query);
		});
	};

	search = (query) => {
		this.props.getSearchResultRequest({
			query: query !== undefined ? query : this.props.formValues?.search
		});
	};

	loadMore = () => {
		const {nrOfViewMore} = this.props;
		const {amountToShow} = this.state;
		this.setState({
			amountToShow: amountToShow + nrOfViewMore
		});
	};

	filterByPath = (result) => {
		const {searchRootPath} = this.props;
		return !searchRootPath || (result.location && result.location.indexOf(searchRootPath) > -1);
	};

	filterByTag = (result) => {
		const {formValues} = this.props;
		const selectedFilters = (formValues?.filters || empty.array).filter(filter => filter !== null);
		return selectedFilters.length === 0 || result.categorytagfacets?.find(tag => selectedFilters?.find(selectedFilter => selectedFilter === tag || selectedFilter === ('/content/cq:tags/' + tag.replace(':', '/'))));
	};

	filterByPagination = (result, index) => {
		const {amountToShow} = this.state;
		return index < amountToShow;
	};

	filteredHits = () => {
		const {result} = this.props;
		return (result || empty.array).filter(this.filterByPath).filter(this.filterByTag);
	};

	render() {
		const {isLoading, query, nrOfViewMore, filters, formValues, noResultDescription, noResultBtnLink} = this.props;
		const {amountToShow} = this.state;
		const hits = this.filteredHits();
		const hasFiltersSelected = (formValues?.filters || empty.array).filter(filter => filter !== null)?.length > 0;
		return <div className="adc-search-result container">
			<div className="bg-white p-relative">
				<if condition={isLoading}>
					<div className={this.props.rendition === 'v2-rendition' ? 'row justify-content-center loader-alignment' : 'row justify-content-center'}>
						<LoadingIndicator isOverlay/>
					</div>
				</if>
				<else>
					
					<if condition={this.props.rendition === "v2-rendition"}>
						<if condition={!query || query.trim() === ''}>
							<p className="adc-search-result__title adc-title--blue  mt-5 my-4 pl-2">
								<I18n text={i18nLabels.NO_QUERY_TEXT}/>
							</p>
							<hr className='mt-2 mb-2'/>
					
							<For array={this.props.searchDefaultList}>
								{(hit, index) =>
									<div>
										<a  href={hit.url} className='search-result-text-styling'>
										<div  key={'search_result_' + index} class="div-hover list-div d-flex align-items-center justify-content-between px-lg-2">
											<div className="adc-search-result pt-2 pl-3 pl-lg-0">
												<a href={hit.url}>
													<p className="adc-title adc-title--black">{hit.title}</p>
												</a>
												<p className="adc-search-result__short-desc">
													{hit.description}
												</p>
											</div>
											<a href={hit.url} className="px-lg-2">
												<i className="adc-icon adc-icon--medium adc-icon--arrow-forth-blue"/>
											</a>
										</div>
										</a>
										<hr className='mt-2 mb-2'/>
									</div>
								}
							</For>
						
						</if>

						<elseif condition={hits.length > 0 && query && query.trim() !== ''}>
							<p className="adc-search-result__title adc-title--blue my-4 mt-5 pl-2">
								<I18n text={i18nLabels.AMOUNT_OF_RESULTS_FOR} params={[hits.length, query]}/>
							</p>
							<hr className='mt-2 mb-2' />
							<Results
								hits={hits.filter(this.filterByPagination)}
								nrOfViewMore={nrOfViewMore}
								filters={filters}
								rendition={this.props.rendition}
							/>
						</elseif>
						<else>
							<div className="bg-white py-4 px-1 mt-4">
								<p className="adc-search-result__title adc-title--blue mb-4">
									<I18n text={i18nLabels.NO_RESULTS_TEXT_V2} params={[query]}/>
								</p>

								<hr mt-2 mb-2 />
								<p className="adc-search-result__short-desc">
									{noResultDescription}
								</p>

								<div className="d-flex justify-content-center full-width">
									<Button
										href={noResultBtnLink}
										type={BUTTON_OPTIONS.TYPE.BUTTON}
										className={'mt-4 px-5 py-3 w-100 mb-3 v2-rendition-mobile-button'}
										ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY}
										hasNoMargin
										label={i18nLabels.NO_RESULT_BTN_LABEL}
										params={[nrOfViewMore]}
									/>
								</div>
							</div>
						</else>
					</if>
					
					<else>
							<if condition={(hasFiltersSelected || hits.length > 0)}>
								<SearchFilterField searchFilters={filters} margin="mb-3"/>
							</if>
							<if condition={hits.length > 0 && query && query.trim() !== ''}>
								<p className="adc-search-result__title adc-title--blue text-center my-4">
									<I18n text={i18nLabels.AMOUNT_OF_RESULTS_FOR} params={[hits.length, query]}/>
								</p>
							</if>
							<if condition={hits.length > 0}>
								<Results
									hits={hits.filter(this.filterByPagination)}
									nrOfViewMore={nrOfViewMore}
									filters={filters}
									rendition={this.props.rendition}
								/>
							</if>
							<else>
								<NoResults
									query={query}
								/>
							</else>
					</else>
				</else>
			</div>
			<if condition={hits.length > amountToShow && query}>
				<div className="d-flex justify-content-center full-width">
					<Button
						action={this.loadMore}
						type={BUTTON_OPTIONS.TYPE.BUTTON}
						className={this.props.rendition === 'v2-rendition' ? 'mt-4 px-5 py-3 mb-3 w-100 v2-rendition-mobile-button' : 'mt-4 px-5 mb-3'}
						ctaStyle={this.props.rendition === 'v2-rendition' ? BUTTON_OPTIONS.STYLE.PRIMARY : BUTTON_OPTIONS.STYLE.SECONDARY}
						hasNoMargin
						label={i18nLabels.LOAD_NEXT_AMOUNT_OF_RESULTS}
						params={[nrOfViewMore]}
					/>
				</div>
			</if>
		</div>
	}
}));