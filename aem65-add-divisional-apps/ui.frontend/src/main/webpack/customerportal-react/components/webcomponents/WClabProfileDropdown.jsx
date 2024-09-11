import React, { Component, Suspense } from 'react';
import { createCustomElement, DOMModel, byContentVal, registerEvent } from "@adobe/react-webcomponent";
import {LabProfileDropdown} from '../labProfiles-components/LabProfileDropdown';

export class WClabProfileDropdown extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div >
        <Suspense fallback={<div>...</div>}>
          <LabProfileDropdown/>
        </Suspense>
        <div className={'children'}>
          {this.props.content}
        </div>
      </div>
    );
  }
}
class ProfilesDropdownModel extends DOMModel {
  @byContentVal text = "something";
  @registerEvent("change") change;
}
const ButtonCustomElement = createCustomElement(WClabProfileDropdown, ProfilesDropdownModel, "element");

window.customElements.define("wc-labprofiledropdown", ButtonCustomElement);

export default {ButtonCustomElement};