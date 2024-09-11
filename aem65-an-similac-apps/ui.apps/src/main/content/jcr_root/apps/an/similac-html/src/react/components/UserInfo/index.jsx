import React from "react";

const UserAlert = ({alertMessage}) => {

   
    return alertMessage && (
            <div className="alertMessage" dangerouslySetInnerHTML={{__html:alertMessage} }>
               
            </div>
    ) || null
}

export default UserAlert;