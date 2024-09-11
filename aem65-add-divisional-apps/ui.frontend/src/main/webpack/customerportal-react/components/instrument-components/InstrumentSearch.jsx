import React, { useState } from "react";
import { useSharedInstrumentFlags } from "../shared/InstrumentFlags";
import { useSharedSort } from "../shared/Sort";
import { InstrumentDropdown } from "./InstrumentDropdown";
import { useSharedInstrumentData } from '../shared/InstrumentData';
import { Button, Tooltip } from '@abbott/add-platform';
import { useTranslation } from "react-i18next";

export const InstrumentSearch = () => {

    const { setIsDisabled, hasSearchedProdType, setHasSearchedProdType, setHasSearchedProdName, setInstType, setInstName, pinnedFirst, setPinnedFirst } = useSharedInstrumentFlags();
    const { myInstruments, setCurrentPage } = useSharedInstrumentData()
    const { sort, setSearchSort } = useSharedSort();
    const [productName, setProductName] = useState([{}])
    const { t } = useTranslation();

    // Below handles changes in the product type dropdown by returning a subset of the broader my instruments data
    const doInstTypeFilter = (type) => {
        const fireTypeChangeEvent = (type) => {
            const event = new CustomEvent('typeChanged', { detail: type });
            document.dispatchEvent(event);
        }

        fireTypeChangeEvent(type)
        setCurrentPage(0)
        if (type !== 'All') {
            setHasSearchedProdType(true)
            setIsDisabled(false)
            return myInstruments.filterMap[type]

        } else {
            let allInst = [{ value: 'All', label: t('all'), producttype: 'All' }]

            Object.keys(myInstruments.filterMap).map((key, index) => {
                allInst.push({
                    value: key,
                    label: key,
                    producttype: key
                })
            })

            setHasSearchedProdType(false)
            return allInst
        }

    };

    // Below handles changes in the product name/serial number dropdown
    const doInstNameFilter = (selectedName) => {
        const fireNameChangeEvent = () => {
            const event = new CustomEvent('nameChanged');
            document.dispatchEvent(event);
        }
        setInstName(selectedName.value)
        setHasSearchedProdName(true)
        fireNameChangeEvent()
        setCurrentPage(0)
        return selectedName
    }


    // ************* PRODUCT OPTIONS FROM SHARED INSTRUMENTS ***********
    let productType = [{ value: 'All', label: t('all'), producttype: 'All' }]
    let productNameFilter = [{ value: 'All', label: t('all'), producttype: 'All' }]

    if (myInstruments.filterMap != undefined) {
        Object.keys(myInstruments.filterMap).map((key, index) => {
            productType.push({
                value: key,
                label: key,
                producttype: key
            })
        })
    }

    const onProductTypeSelect = (item) => {
        setInstType(item.value)
        let productNameList = doInstTypeFilter(item.value)
        if (item.value !== 'All') {
            if (productNameList) {
                Object.values(productNameList).map((value, index) => {
                    productNameFilter.push({
                        value: value,
                        label: value,
                        producttype: value
                    })
                })
                setProductName(productNameFilter)
                setHasSearchedProdName(false)
            }
        } else {
            setHasSearchedProdName(false)
            setHasSearchedProdType(false)
            setIsDisabled(true)
        }

        // ********

    }

    // ***************
    const postProductType = <InstrumentDropdown
        id={'productType'}
        options={productType}
        label={t('product-type')}
        placeholder={t('all')}
        onChange={onProductTypeSelect} />
    //* *************** */

    const emptyDropdown = <InstrumentDropdown
        id={'emptyDropdown'}
        options={[]}
        label={t('name-serial-number')}
        placeholder={t('select')}
        isLoading={false}
        isDisabled={true} />

    // ******* 
    // sets which product name/serial number to search for
    const onProductNameSelect = (item) => {
        if (item.value !== 'All') {
            doInstNameFilter(item)
        } else {
            setHasSearchedProdName(false)
        }
    }

    const postProductName = <InstrumentDropdown
        id={'productName'}
        options={productName ?? [{}]}
        label={t('name-serial-number')}
        placeholder={t('select')}
        onChange={onProductNameSelect}
        isDisabled={false} />
    // ***********  
    const containerZindex = () => {
        document.querySelector('.a-container').style.zIndex = "auto";
    }
    // ******* 
    // Sets which pin sorting method to use
    const onPinTypeSelect = (item) => {
        setCurrentPage(0)
        const newSort = { ...sort };
        newSort.pinType = item.pintype;
        setSearchSort(newSort);
        if (pinnedFirst == 'default') {
            newSort.pinType == 'pinnedfirst' ? setPinnedFirst(true) : setPinnedFirst(false)
        } else if (pinnedFirst) {
            setPinnedFirst(false)
        } else {
            setPinnedFirst(true)
        }
    }

    // Creates Pins Sort dropdown
    const postPinType = <InstrumentDropdown
        id={'pinning'}
        options={[
            {
                label: t('pinned-first'),
                value: "Pinned First",
                pintype: "pinnedfirst"
            }, {
                label: t('all'),
                value: "All",
                pintype: "all"
            }
        ]}
        label={t('pin-type')}
        placeholder={t('pinned-first')}
        onChange={onPinTypeSelect} />

    // ***********

    return (
        <div>
            {containerZindex()}
            <div className='instrument-header-tooltip my-instrument-header-tooltip'>
                <div className="my-instruments-header-container">
                    <p className='my-instruments-header'>{t('my-instruments')} </p>
                    <Tooltip placement={"bottom"} title={`<p>${t('my-instruments-tooltip')}</p>`}></Tooltip>
                </div>
                <div className="my-instruments-view-all">
                    <Button text={t("view-all-incidents")} buttonStyle='secondary' anchorLink={"lab-incidents.html"} />
                </div>
            </div>
            <div className='instrument-search-input-section'>
                <div className='instrument-product-filter'>
                    {postProductType}
                </div>
                <div className='instrument-product-filter'>
                    {hasSearchedProdType ? postProductName : emptyDropdown}
                </div>
                <div className='instrument-pin-sort'>
                    {postPinType}
                </div>
            </div>
        </div>
    )
}

