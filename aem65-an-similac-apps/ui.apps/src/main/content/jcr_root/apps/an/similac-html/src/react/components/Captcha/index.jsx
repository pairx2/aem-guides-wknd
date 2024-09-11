import React, { useState, useRef, useEffect }  from 'react';
import { ReCaptcha } from 'react-recaptcha-google';



const FormCaptcha = ({

  name,
 
  size, theme, render, sitekey,
  
 
 
}) => {
  

 
    const recaptchaRef = React.createRef();
    const id = "react-form-field-" + name;
    const isVerified = useState(false);
    let g_cap="";
    const onloadCallback = (e) => {
     //console.log("loaded");
    };
  
    const  verifyCallback= (response) => {
       if (response) {
        jQuery('button[type="submit"]').removeAttr('disabled');
    }
  };

    return (
     
        <fieldset className={`form-group similac-form-group`}>
          <div className="captcha-container">
            <span className="captcha-wrapper">
              <label htmlFor={id}>
            
              <ReCaptcha 
              ref={recaptchaRef}
              sitekey={sitekey}
              id={id}
              size={size}
              data-theme={theme}          
              render={render}
              onloadCallback={onloadCallback}
        verifyCallback={verifyCallback}
        />
     
                
              </label>
            </span>
  
            
          </div>
         
        </fieldset>
     
      );

};
export default FormCaptcha;