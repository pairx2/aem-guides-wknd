import React, { Component } from 'react';

import { createCustomElement, DOMModel, byContentVal, byAttrVal, registerEvent } from "@adobe/react-webcomponent";
import {Checkbox} from "@abbott/add-platform";

export class WCCheckbox extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Checkbox
              text={this.props.text}

            />)
    }
}
class CheckboxModel extends DOMModel {
    @byContentVal text = "something";
    @registerEvent("change") change;
}
const CheckboxCustomElement = createCustomElement(WCCheckbox, CheckboxModel, "element");

window.customElements.define("wc-checkbox", CheckboxCustomElement);

export default {CheckboxCustomElement};
