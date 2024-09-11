import React, { Component, Suspense } from 'react';
import { i18n } from '../services/i18n';
import { createCustomElement, DOMModel, byContent } from "@adobe/react-webcomponent";

import {SearchFilters} from "../search-components/SearchFilters";

class WCCustomSearch extends Component {

    constructor(props) {
        super(props);
        this.children = props.children;
    }

    render() {
        return (<div className={'custom-search'}>
            <Suspense fallback={<div>...</div>}>
                <SearchFilters />
            </Suspense>
            <div className={'children'}>
                {this.props.content}
            </div>
        </div>)
    }
}

class ContainerModel extends DOMModel {
    @byContent('.content') content;
}
const ContainerCustomElement = createCustomElement(WCCustomSearch, ContainerModel, "container");
window.customElements.define("wc-customsearch", ContainerCustomElement);

export default { ContainerCustomElement };
