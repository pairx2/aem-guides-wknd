import React, { Component, Suspense } from 'react';
import { createCustomElement, DOMModel, byContentVal, registerEvent } from "@adobe/react-webcomponent";
import {LabProfileResults} from '../labProfiles-components/LabProfileResults';

export class WClabProfileResults extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div >
        <Suspense fallback={<div>...</div>}>
          <LabProfileResults/>
        </Suspense>
        <div className={'children'}>
          {this.props.content}
        </div>
      </div>
    );
  }
}
class ProfilesModel extends DOMModel {
  @byContentVal text = "something";
  @registerEvent("change") change;
}
const ButtonCustomElement = createCustomElement(WClabProfileResults, ProfilesModel, "element");

window.customElements.define("wc-labprofileresults", ButtonCustomElement);

export default {ButtonCustomElement};
