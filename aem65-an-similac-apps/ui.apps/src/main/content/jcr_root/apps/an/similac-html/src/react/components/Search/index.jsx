import React, { useState, useEffect, useRef } from "react";
import debounce from 'lodash.debounce';
import { Formik, Form, Field } from 'formik';
import InputField from "../InputField";
import { SvgIcon } from "../../common/common";

import graphQLQuery from '../../services/product.service.js';

const Search = (props) => {

    const { labels, queryData, setSuggestions = {} } = props;
    const [products, setproducts] = useState();
    const [searchValue, setsearchValue] = useState("");

    useEffect(() => {
        setsearchValue(props.searchTerm);
    }, [props.searchTerm]);
    
    if (setSuggestions) {
        useEffect(() => {
            getSearchSuggestions.current(searchValue);
        }, [searchValue]);
    }


    const getSearchSuggestions = useRef(debounce((value) => {

        if (value !== "" && value.length > 3) {
            let data = {
                ...queryData,
                "searchTerm": value
            };
            data.pageSize = 1000;
            data.sortType = "name:ASC";

            let ajaxConfig = {
                url: `${ABBOTT.config.getEndpointUrl('GRAPH_QL')}?query=
            ${graphQLQuery.generateSearchPredictionQuery(data)}`,
                method: "get",
                contentType: "application/json",
                headers:
                {
                    "Store": ABBOTT.config.storeName
                }
            };
            ABBOTT.http.makeAjaxCall(ajaxConfig).done(res => {
                setproducts(res.data.products.items);
            });
        }

    }, 750));

    return (
        <>
            <Formik
                initialValues={{ search: '' }}
                onSubmit={(values, actions) => {
                    if (!actions.isSubmitting) {
                        props.handleSearchTermSubmit(searchValue)
                    }
                }}>
                {({ values, errors }) => (
                    <Form className="similac-form">
                        <Field
                            key={"searchProduct" + "textbox"}
                            label={labels.searchLabel}
                            name="search"
                            type="text"
                            value={searchValue}
                            icon={<SvgIcon icon={"mag-glass-color"}
                                onClick={e => props.handleSearchTermSubmit(searchValue)} />}
                            fieldId="searchProduct"
                            iconClickable={true}
                            onChange={e => setsearchValue(e.target.value)}
                            autoComplete="new-password"
                            as={InputField}
                        />
                        {products && products.length > 0 && searchValue.length > 3 &&
                            <div className="products__search-suggestions">
                                <ul className="products__search-suggestions-list">
                                    {products.map((product) =>
                                        <li className="products__search-suggestions-list-item"
                                            key={product.id} onClick={e => props.handleSearchTermSubmit(product.name)}
                                            dangerouslySetInnerHTML={{ __html: product.meta_title || product.name}}>
                                        </li>
                                    )
                                    }

                                </ul>
                            </div>
                        }
                    </Form>
                )}
            </Formik>
        </>
    )
}
export default Search;