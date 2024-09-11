import React, { Component, Suspense } from 'react';
import { createCustomElement, DOMModel, byContent } from "@adobe/react-webcomponent";
import {NotificationSettings} from '../notfications-components/NotificationSettings';

class WCNotificationSettings extends Component {

    constructor(props) {
        super(props);
        this.children = props.children;
    }

    render() {
        return (
        <div>
            <Suspense fallback={<div>...</div>}>
                <NotificationSettings />
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
const ContainerCustomElement = createCustomElement(WCNotificationSettings, ContainerModel, "container");
window.customElements.define("wc-notification-settings", ContainerCustomElement);

export default { ContainerCustomElement };