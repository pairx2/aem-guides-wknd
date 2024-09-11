import React, { useEffect } from "react";

const MessageBox = props => {
  var messageClass = 'similac-minicart-message';

  if(props.cartStatus) {
    if(props.cartStatus === 'deleted'){
      messageClass += ' deleted';
    } else {
      messageClass += ' success';
    }
  } else {
    messageClass += ' failure';
  }

  // Set Mobile Messagebox on every render.
  useEffect(() => {
    var messageEl = jQuery('#mini-cart__comp .similac-minicart-message').clone();
    
    jQuery('#mini-cart__comp--mobile .similac-minicart-message').replaceWith(messageEl);
  });

  return (
    <div className={messageClass}>
        <i className="ai-tick-circle"></i><i className="ai-delete-circle"></i>{props.cartMessage}
    </div>
  );
}

export default MessageBox;