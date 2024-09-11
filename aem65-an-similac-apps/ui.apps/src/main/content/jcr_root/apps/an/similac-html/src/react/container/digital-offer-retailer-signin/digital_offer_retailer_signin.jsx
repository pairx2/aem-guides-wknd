import * as React from "react";
import DigitalOfferRetailerLogin from "./doLoginRetailer";
import DigitalOfferRetailerRegister from "./doRegisterRetailer";


const DORForm = (props) => {
  return (
    <div className="container">
      <DigitalOfferRetailerLogin {...props.dorLogin} />
      <DigitalOfferRetailerRegister {...props.dorRegistration} />
    </div>
  )
}

export default DORForm;