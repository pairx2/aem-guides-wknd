import React from 'react';
import PropTypes from 'prop-types';
import {For} from '../../../Generic/components/Logic/LogicalComponents';

const Results = ({hits, rendition}) => {
	function renderResults(hit){
		return <>
			<div className="adc-search-result pt-2 pl-3 pl-lg-0">
						<if condition={hit.categorytagfacets}>
							<div className="pt-1">
								{hit?.categorytagfacets?.map(item=> {
                                    return <span key={item} className="adc-search-result__tag d-inline">{item}</span>;
                                })}
							</div>
						</if>
						<a href={hit?.location}>
							<p className="adc-title adc-title--black">{hit.title}</p>
						</a>
						<p className="adc-search-result__short-desc">
							{hit.description}
						</p>
					</div>
				
		</>
	}

	return (
		<>
		<if condition = {rendition === 'v2-rendition'}>
		<For array={hits}>
			{(hit) => 
				<div>
					<a href={hit?.location} className='search-result-text-styling'>
						<div key={'search_result_' + hit.title} className="div-hover list-div d-flex align-items-center justify-content-between  px-lg-2">
							{renderResults(hit)}
							<a href={hit?.location}>
								<i className="adc-icon adc-icon--medium adc-icon--arrow-forth-blue"/>
							</a>
						</div>
					</a>
						<hr className='mt-2 mb-2'/>
				</div>
			
			}
		</For>
		</if>
		<else>
		<For array={hits}>
			{(hit) =>
				<div key={'search_result_' + hit.title}
					 className="adc-search-result__content d-flex align-items-center justify-content-between pt-2 px-lg-4 pb-2">
					{renderResults(hit)}
					<a href={hit.location}>
						<i className="adc-icon adc-icon--large adc-icon--arrow-forth-blue"/>
					</a>
				</div>
			}
		</For>
		</else>
		
		</>
	);
};

Results.propTypes = {
	hits: PropTypes.array,
};

export default Results;
