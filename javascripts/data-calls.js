"use strict";

let getAllAreas = function() {
	return new Promise(function(resolve, reject) {

		let getAreas = new XMLHttpRequest();
		getAreas.open('GET', 'https://ux-ui-theme-park.firebaseio.com/areas.json');
		getAreas.send();
		getAreas.addEventListener("load", (event) => {
			let areas = JSON.parse(event.target.responseText);
			resolve(areas);
		});
	});
};

let getAreaFive = () =>{
    return new Promise(function(resolve, reject) {

		let getAreas = new XMLHttpRequest();
		getAreas.open('GET', 'https://ux-ui-theme-park.firebaseio.com/attractions.json?orderBy="type_id"&equalTo=5');
		getAreas.send();
		getAreas.addEventListener("load", (event) => {
			let areas = JSON.parse(event.target.responseText);
			resolve(areas);
		});
	});
};

let getIndTypes = function(id) {
	return new Promise(function(resolve, reject) {

		let getType = new XMLHttpRequest();
		getType.open('GET', `https://ux-ui-theme-park.firebaseio.com/attraction_types.json?orderBy="id"&equalTo=${id}`);
		getType.send();
		getType.addEventListener("load", (event) => {
			let type = JSON.parse(event.target.responseText);
			resolve(type);
		});
	});
};

let getAllAttractions = function(id) {
	return new Promise(function(resolve, reject) {

		let getAttractions = new XMLHttpRequest();
		getAttractions.open('GET', `https://ux-ui-theme-park.firebaseio.com/attractions.json?orderBy="area_id"&equalTo=${id}`);
		getAttractions.send();
		getAttractions.addEventListener("load", (event) => {
			let attractions = JSON.parse(event.target.responseText);
			resolve(attractions);
		});
	});
};

module.exports = {
    getAllAreas,
    getAllAttractions,
    getIndTypes,
    getAreaFive
};