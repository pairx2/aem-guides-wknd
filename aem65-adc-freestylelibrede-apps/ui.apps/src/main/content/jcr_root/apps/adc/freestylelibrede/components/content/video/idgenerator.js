"use strict";
use(function () {
    let idgenerator = {};    
    idgenerator.id = Math.floor((Math.random() * 100) + 1);
    return idgenerator;
});