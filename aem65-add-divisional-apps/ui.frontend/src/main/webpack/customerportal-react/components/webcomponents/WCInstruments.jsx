import React, { Component, Suspense } from 'react';
import { createCustomElement, DOMModel, byContent } from "@adobe/react-webcomponent";
import { Instruments } from '../instrument-components/Instruments';

class WCInstruments extends Component {

    constructor(props) {
        super(props);
        this.children = props.children;
    }

    render() {
        return (
            <div>
                <Suspense fallback={<div>...</div>}>
                    <Instruments />
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
const ContainerCustomElement = createCustomElement(WCInstruments, ContainerModel, "container");
window.customElements.define("wc-instruments", ContainerCustomElement);

export default { ContainerCustomElement };
