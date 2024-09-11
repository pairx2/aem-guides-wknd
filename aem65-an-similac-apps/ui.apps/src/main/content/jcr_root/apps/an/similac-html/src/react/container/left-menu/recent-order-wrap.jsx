import React, { useState, useEffect } from 'react';
import RecentOrder from './recent-order';
import Portal from "../../components/Portal"

const RecentOrderWrap = (props) => {

    if (jQuery(window).width() > 768) {
        return <div className="d-none d-md-flex">
            <RecentOrder aemData={props.aemData}/>
        </div>;

    } else {
        return <Portal node={"#recent-mob"} >
            <RecentOrder aemData={props.aemData}/>
        </Portal>;
    }

}

export default RecentOrderWrap;
