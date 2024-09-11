import React, { Component } from 'react';
import Registration from "../mailing-address/editMailing";

class CompleteProfile extends Component {
    constructor(){
        super();
        this.state={}
    }
    shouldComponentUpdate(){
        return false;
    }
    render() {
        var data = window.jsonCompleteProfileData || {};
        const {updateDigitalOffer=()=>null} = this.props;
        return (
            <Registration data={data} setProfileData={updateDigitalOffer}/>
        )
    }
}

export default CompleteProfile;