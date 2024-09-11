import React, { Component } from 'react';

import { createCustomElement, DOMModel, byContentVal, byAttrVal, registerEvent } from "@adobe/react-webcomponent";
import {Button} from "@abbott/add-platform";

export class WCButton extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Button
              text={this.props.text}
              anchorLink={'#'}
              buttonStyle={'primary'}
            />)
    }
}
class ButtonModel extends DOMModel {
    @byContentVal text = "something";
    @registerEvent("change") change;
}
const ButtonCustomElement = createCustomElement(WCButton, ButtonModel, "element");

window.customElements.define("wc-button", ButtonCustomElement);

export default {ButtonCustomElement};
