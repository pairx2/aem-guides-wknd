import React, { Component, Suspense } from 'react';
import { createCustomElement, DOMModel, byContent } from "@adobe/react-webcomponent";
import { LabIncidents } from '../incident-components/LabIncidents';

class WCLabIncidents extends Component {

    constructor(props) {
        super(props);
        this.children = props.children;
    }

    render() {
        return (
            <div>
                <Suspense fallback={<div>...</div>}>
                    <LabIncidents />
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
const ContainerCustomElement = createCustomElement(WCLabIncidents, ContainerModel, "container");
window.customElements.define("wc-labincidents", ContainerCustomElement);

export default { ContainerCustomElement };
