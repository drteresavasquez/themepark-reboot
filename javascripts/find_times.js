"use strict";

console.log("FIND TIMES and search");

let dataCalls = require("./data-calls.js");
let domElements = require("./dom_elements.js");

let input = document.getElementById("search");

input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13 && input.value !== "") {
        let lowerInput = (input.value).toLowerCase();
        dataCalls.getAreaFive()
            .then((response) => {
                let AttractionArray = [];
                let areaInfo = Object.keys(response);
                areaInfo.forEach((item) => {
                    let compare = (response[item].name).toLowerCase();
                    if (compare.includes(lowerInput)) {
                        AttractionArray.push(response[item]);
                    }
                });
                domElements.displaySearchResults(AttractionArray);
            });
    }
});