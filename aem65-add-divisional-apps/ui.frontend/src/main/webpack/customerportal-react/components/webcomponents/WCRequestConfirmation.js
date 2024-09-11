import React, { Component, Suspense } from 'react';
import { createCustomElement, DOMModel, byContent } from "@adobe/react-webcomponent";
import {TicketSummary} from '../incident-components/TicketSummary';

class WCRequestConfirmation extends Component {

    constructor(props) {
        super(props);
        this.children = props.children;
    }

    render() {
        return (
        <div>
            <Suspense fallback={<div>...</div>}>
                <TicketSummary/>
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
const ContainerCustomElement = createCustomElement(WCRequestConfirmation, ContainerModel, "container");
window.customElements.define("wc-request-confirmation", ContainerCustomElement);

export default { ContainerCustomElement };