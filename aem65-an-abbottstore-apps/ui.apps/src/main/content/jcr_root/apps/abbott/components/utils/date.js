"use strict";
use(function() {
	var text = this.text,
    dateObj = new Date();
    text = text.replace(new RegExp('\[$]{year}', 'gi'),dateObj.getFullYear());
    return text;
});