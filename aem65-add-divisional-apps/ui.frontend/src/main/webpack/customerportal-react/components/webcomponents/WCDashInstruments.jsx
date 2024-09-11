import React, { Component, Suspense } from 'react';
import { createCustomElement, DOMModel, byContent } from "@adobe/react-webcomponent";
import {InstrumentsDash} from '../instrument-components/InstrumentsDash';

class WCDashInstruments extends Component {

    constructor(props) {
        super(props);
        this.children = props.children;
    }

    render() {
        return (
        <div>
            <Suspense fallback={<div>...</div>}>
                <InstrumentsDash />
            </Suspense>
            <div className={'children'}>
                {this.props.content}
            </div>
        </div>
        )
    }
}

class ContainerModel extends DOMModel {
    @byContent('.content') content;
}
const ContainerCustomElement = createCustomElement(WCDashInstruments, ContainerModel, "container");
window.customElements.define("wc-dash-instruments", ContainerCustomElement);

export default { ContainerCustomElement };
