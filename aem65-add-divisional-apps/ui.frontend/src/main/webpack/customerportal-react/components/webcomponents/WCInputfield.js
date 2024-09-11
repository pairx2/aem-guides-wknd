import React, { Component } from 'react';

import { createCustomElement, DOMModel, byContentVal, registerEvent } from "@adobe/react-webcomponent";
import {InputField} from "@abbott/add-platform";

export class WCInputField extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <InputField
              name={this.props.name}
              label={this.props.text}

            />);
    }
}
class InputFieldModel extends DOMModel {
    @byContentVal text = "something";
    @registerEvent("change") change;
}
const InputFieldCustomElement = createCustomElement(WCInputField, InputFieldModel, "element");

window.customElements.define("wc-inputfield", InputFieldCustomElement);

export default {InputFieldCustomElement};
