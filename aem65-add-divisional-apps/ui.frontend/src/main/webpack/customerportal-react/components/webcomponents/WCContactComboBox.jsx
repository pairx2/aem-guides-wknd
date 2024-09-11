import React, { Component, Suspense } from 'react';

import { createCustomElement, DOMModel, byContentVal, byAttrVal, registerEvent } from "@adobe/react-webcomponent";
import {ContactComboBox} from "../incident-components/ContactComboBox";

export class WCContactComboBox extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {t} = this.props;
        return (
            <div>
                <Suspense fallback={<div>...</div>}>
                    <ContactComboBox />
                </Suspense>
            </div>
        );
    }
}
class ContactComboBoxModel extends DOMModel {
    @byContentVal text = "something";
    @registerEvent("change") change;
}

const ContactComboBoxCustomElement = createCustomElement(WCContactComboBox, ContactComboBoxModel, "element");

window.customElements.define("wc-contactcombobox", ContactComboBoxCustomElement);

export default {ContactComboBoxCustomElement};
