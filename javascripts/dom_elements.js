"use strict";

console.log("the DOM");

let date = new Date();
let yyyy = date.getFullYear();
document.getElementById("footer").innerHTML = `© ${yyyy} Unitainment. All Rights Reserved`;
