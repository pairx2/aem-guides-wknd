import React from "react";

const MessageBox = props => {
  var messageClass = 'abbott-minicart-message';

  if((props.cartStatus)) {
    if((props.cartStatus === 'deleted' )){
      messageClass += ' deleted';
    } else {
      messageClass += ' success';
    }
  } else {
    messageClass += ' failure';
  }

  return (
    <div className={messageClass}>
        {props.cartMessage}
    </div>
  );
}

export default MessageBox;