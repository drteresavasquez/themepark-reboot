"use strict";

console.log("FIND TIMES");

let dataCalls = require("./data-calls.js");

// only area with times is area 5

dataCalls.getAreaFive()
.then((response)=>{
    console.log("AREA 5 RESPONSE", response);
});