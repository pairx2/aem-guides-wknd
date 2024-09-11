import React from "react";
import LoginDialog from "./loginForm";

const LoginF = (props) => {

  const styleObject = {
    "height" :jQuery(document).height() - 150
  }

  return (
    <div className="loginContainer text-left" style={styleObject}>
      <div id="loginPopup">
        <LoginDialog {...props} captchaId="id-captcha-login-popup"/>
      </div>
    </div>
  )
}

export default LoginF;