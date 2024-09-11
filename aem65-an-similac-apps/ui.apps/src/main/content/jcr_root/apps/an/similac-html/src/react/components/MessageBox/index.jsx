import React from "react";

const MessageBox = props => {
  var messageClass = 'minicart-message';

  
  return (
    <div className={messageClass}>
       {
      props.cartMessage.map(str => {
        return( <><span dangerouslySetInnerHTML={{ __html: str }}></span><br/></>)
      })
    }
    </div>
  );
}

export default MessageBox;