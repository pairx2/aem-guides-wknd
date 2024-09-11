import React, { Component, Suspense } from "react";
import {
  createCustomElement,
  DOMModel,
  byContent,
} from "@adobe/react-webcomponent";
import { DistibutorApprove } from "./../distibutor-components/DistibutorApprove";

class WCDistributorDashboardApproved extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Suspense fallback={<div>...</div>}>
          <DistibutorApprove />
        </Suspense>
      </div>
    );
  }
}

class ContainerModel extends DOMModel {
  @byContent(".content") content;
}
const ContainerCustomElement = createCustomElement(
  WCDistributorDashboardApproved,
  ContainerModel,
  "container"
);
window.customElements.define(
  "wc-distributor-dashboard-approved",
  ContainerCustomElement
);

export default { ContainerCustomElement };
