import React, { Component, Suspense } from 'react';
import { createCustomElement, DOMModel, byContent } from "@adobe/react-webcomponent";
import {Notifications} from '../notfications-components/notifications';

class WCNotifications extends Component {

    constructor(props) {
        super(props);
        this.children = props.children;
    }

    render() {
        return (
        <div>
            <Suspense fallback={<div>...</div>}>
                <Notifications />
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
const ContainerCustomElement = createCustomElement(WCNotifications, ContainerModel, "container");
window.customElements.define("wc-notifications", ContainerCustomElement);

export default { ContainerCustomElement };