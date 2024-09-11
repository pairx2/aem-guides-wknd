import * as React from "react";

const HiddenInput = ({name,value}) => {
    return <input name={name} type={"hidden"} value={value}/>
}

export default HiddenInput;