"use strict";

use( function () {
 var Constants = {
     	COUNT: "rowCount",

    };

    var arrayCount = [];
    var rowCount = properties.get(Constants.COUNT, "");

    for(var i = 0 ; i < rowCount ; i++) {
		arrayCount[i] = i;
		}

    return {
        count: rowCount,
        arrayCnt: arrayCount

    };
});
