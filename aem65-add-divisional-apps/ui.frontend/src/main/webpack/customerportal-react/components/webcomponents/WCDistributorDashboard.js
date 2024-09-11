import React, { Component, Suspense } from "react";
import {
  createCustomElement,
  DOMModel,
  byContent,
} from "@adobe/react-webcomponent";
import { Distibutor } from "./../distibutor-components/Distibutor";

class WCDistributorDashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Suspense fallback={<div>...</div>}>
          <Distibutor />
        </Suspense>
      </div>
    );
  }
}

class ContainerModel extends DOMModel {
  @byContent(".content") content;
}
const ContainerCustomElement = createCustomElement(
  WCDistributorDashboard,
  ContainerModel,
  "container"
);
window.customElements.define(
  "wc-distributor-dashboard",
  ContainerCustomElement
);

export default { ContainerCustomElement };
