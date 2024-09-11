import React, { useState, useRef, useMemo } from "react";
import {useTranslation} from "react-i18next";
import PropTypes from "prop-types";
import {Accordion, Checkbox} from '@abbott/add-platform';
import {useSharedResults} from "../shared/Results";
import {useSharedFacet} from "../shared/Facet";
import {useSharedLabProfiles} from "../shared/LabProfiles";

export const SearchFacets = (props) => {
  const { t, i18n } = useTranslation();
  const {
    className,
    ...rest
  } = props;

  const {userRole} = useSharedLabProfiles();
  const isEmployee = useMemo(() => {return userRole == "employee"}, [userRole]);

  const {resultsFacets} = useSharedResults();
  const {facets,setSearchFacet} = useSharedFacet();

  const [clicked,setClicked] = useState(true);
  
  const handleToggle = () => {
    setClicked((prev)=> !prev);
  };

  const onFacetSelected = (facet) => {
    facet.state = facet.state == "selected" ? "idle" : "selected";
    resultsFacets[facet.facetIndex].values[facet.valueIndex].state = facet.state;
    const newFacets = facets.currentFacets.map((initialFacet) => {
      const match = resultsFacets.find((resultFacet) => {
        return resultFacet.facetId == initialFacet.facetId;
      });
      initialFacet.currentValues = match.values;
      initialFacet["freezeCurrentValues"] = true;
      return initialFacet;
    });
    setSearchFacet({
      isSearching: true,
      currentFacets: newFacets
    });
  };

  const renderFacet = (facet, facetIndex) => {
    return facet?.values?.map((facetValue, valueIndex) => {
      facetValue["facetIndex"] = facetIndex;
      facetValue["valueIndex"] = valueIndex;
      return <Checkbox
        text={facetValue?.value}
        item={facetValue}
        checked={facetValue?.state == "selected" ? true : false}
        parentControl={true}
        onChange={onFacetSelected}
      />;
    });
  };
  
  const getFacetText = (facet) => {
    let accordionText = facet.facetId;
    
    switch (facet.facetId) {
      case "cpmandatoryupgrade":
        accordionText = t('mandatory');
        break;
      case "cpcondition":
        accordionText = t('condition');
        break;
      case "cplanguage":
        accordionText = t('language');
        break;
    }
    return accordionText;
  };
  
  const renderFacets = () => {
    return resultsFacets.map((facet, facetIndex) => (
    (facet.facetId !== 'cpcondition' || (facet.facetId === 'cpcondition')) &&
      <Accordion text={getFacetText(facet)}
                 key={`facet_group_${facetIndex}`} 
                 controlType={"arrow"}
                 className={"search-facet__accordion"}
                 startOpen={true}
                 items={renderFacet(facet, facetIndex)} />
    ));
  }

  return (
    
   
    
    <div
        className={`search-facets`}>
      <Accordion
        text={t('filter-by')}
        className={"search-facets__accordion first-row"}
        items={renderFacets()}
      />
    </div>)
                

  
}

SearchFacets.defaultProps = {
  onClick: null,
  text: "",
};

SearchFacets.propTypes = {
  text: PropTypes.string.isRequired,
  items: PropTypes.element,
  onClick: PropTypes.func,
};

export default SearchFacets;
