import React, { Component, Suspense } from 'react';
import { createCustomElement, DOMModel, byContent } from "@adobe/react-webcomponent";
import { InstrumentDetails } from '../instrument-components/InstrumentDetails';

class WCInstrumentDetails extends Component {

    constructor(props) {
        super(props);
        this.children = props.children;
    }

    render() {
        return (
            <div>
                <Suspense fallback={<div>...</div>}>
                    <InstrumentDetails />
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
const ContainerCustomElement = createCustomElement(WCInstrumentDetails, ContainerModel, "container");
window.customElements.define("wc-instrumentdetails", ContainerCustomElement);

export default { ContainerCustomElement };
