import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {ComboBox, InputField} from "@abbott/add-platform";
import {useSharedResults} from "../shared/Results";
import {useSharedFilters} from "../shared/Filters";

export const COADropdowns = () => {
    const { t, i18n } = useTranslation();
    const {setIsDisabled} = useSharedResults();
    const { setSearchFilters, handleWildcardInput, handleListNumOnInput, resetFacets}= useSharedFilters();
    const [queryType, setQueryType] = useState(null);
    const {setHasSearched} = useSharedResults();

    const handleInputs = (e) => {
        setHasSearched(false);
        resetFacets();
    }

    const [options, setOptions] = useState([
        {
            value : "lotNumber",
            label : t('search-by-lot-number')
        },
        {
            value : "listNumber",
            label : t('search-by-list-number2')
        }
    ]); // we're using useState because for some reason a const keeps re-initializing the dropdown

    const onParentSelect = (ev) => {
        resetFacets();
        setHasSearched(false);
        setQueryType(ev?.value ?? "none");
        setSearchFilters({currentFilters : [{}], isSearching: false})
        return ev?.value;
    }

    const coaHandleInput = (ev) => {
        if (ev?.target?.value && ev?.target?.value.length > 3) {
            setIsDisabled(false);
            handleWildcardInput("cplotnumber", ev)
        } else {
            setIsDisabled(true);
        }
    }
    const coaHandleListNumInput = (ev) => {
        if (ev?.target?.value && ev?.target?.value.length > 3) {
            setIsDisabled(false);
            handleListNumOnInput("cplistnumber", ev)
        } else {
            setIsDisabled(true);
        }
    }

    return (<>
        <ComboBox
            className={"col-12 col-md-4"}
            options={options}
            label={t('lot-specific-or-list-number-search')}
            placeholder={t('select')}
            onChange={onParentSelect}
            isLoading={false}
            isDisabled={false}/>
        {queryType == "lotNumber" && (
            <InputField placeholder={t('enter-lot-number')}
                        className={"col-12 col-md-5"}
                        label={t('lot-number')}
                        name={"cplotnumber"}
                        inputType={"alph-number"}
                        onInput={(ev) => coaHandleInput(ev)}
                        isDisabled={false}/>
        )}

        {queryType == "listNumber" && (
            <InputField placeholder={t('enter-list-number')}
                        className={"col-12 col-md-5"}
                        label={t('list-number')}
                        name={"cplistnumber"}
                        onInput={(ev) => coaHandleListNumInput(ev)}
                        isDisabled={false}/>
        )}
        {queryType == null && (
            <InputField placeholder={t('select-query-type')}
                        className={"col-12 col-md-5"}
                        label={""}
                        name={""}
                        isDisabled={true}/>
        )}
    </>);
}