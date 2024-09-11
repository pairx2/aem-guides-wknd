import React, { Component, Suspense } from 'react';
import { createCustomElement, DOMModel, byContentVal, registerEvent } from "@adobe/react-webcomponent";
import {LabProfileUsers} from '../labProfiles-components/LabProfileUsers';

export class WCLabUsers extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div >
        <Suspense fallback={<div>...</div>}>
          <LabProfileUsers/>
        </Suspense>
        <div className={'children'}>
          {this.props.content}
        </div>
      </div>
    );
  }
}
class LabUsersModel extends DOMModel {
  @byContentVal text = "something";
  @registerEvent("change") change;
}
const UsersCustomElement = createCustomElement(WCLabUsers, LabUsersModel, "element");

window.customElements.define("wc-labusers", UsersCustomElement);

export default {UsersCustomElement};