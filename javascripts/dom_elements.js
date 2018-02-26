"use strict";

console.log("the DOM");
let dataCalls = require("./data-calls.js");

let images = ["https://i1.wp.com/howtobeagraduate.com/wp-content/uploads/2017/06/Disneyland_Paris_Park_mainstreetsquare.jpg", "https://cdn.cnn.com/cnnnext/dam/assets/141016172023-future-theme-parks-wanda-hefei-opera-garden-horizontal-large-gallery.jpg", "https://secure.parksandresorts.wdpromedia.com/resize/mwImage/1/630/354/75/wdpromedia.disney.go.com/media/wdpro-assets/parks-and-tickets/attractions/magic-kingdom/walt-disney-world-railroad-frontierland/walt-disney-world-railroad-frontierland-00.jpg?21072014093146", "https://www.disneyfanatic.com/wp-content/uploads/2017/04/Liberty-Bell-replica-and-Hall-of-Presidents-liberty-square-magic-kingdom-walt-disney-world-2.jpg", "http://www.bestoforlando.com/articles/Walt-Disney-World-Fantasyland-to-Get-Makeover/images/BOO_Large_New-Fantasyland_at-Magic-Kingdom-at-Walt-Disney-World-Blog.jpg", "https://vignette.wikia.nocookie.net/disney/images/d/d3/Tomorrowland_Magic_Kingdom.jpg/revision/latest/scale-to-width-down/350?cb=20120107183212", "https://vignette.wikia.nocookie.net/disneyparksfanon/images/2/21/Cinderella_Castle.png/revision/latest/scale-to-width-down/640?cb=20160204211208", "https://hello.travefy.com/wp-content/uploads/2014/12/free-itinerary-builder-maker-travefy.png"];

let date = new Date();
let yyyy = date.getFullYear();
document.getElementById("footer").innerHTML = `© ${yyyy} Unitainment. All Rights Reserved`;
$(document).ready(function () {});

dataCalls.getAllAreas()
    .then((results) => {
        let keys = Object.keys(results);
        document.getElementById("body").innerHTML = " ";
        keys.forEach((item) => {
            // begin creating the interactive card elements on the DOM
            document.getElementById("body").innerHTML +=
                `<div class="col s12 l4" id="${results[item].id}">
                    <div class="card">
                    <div class="card-image activator waves-effect waves-block waves-light">
                    <img class="activator" src="${images[results[item].id - 1]}">
                    <span class="card-title activator grey-text text-darken-4">${results[item].name}<i class="material-icons right">more_vert</i></span>    
                </div>
                <div class="card-content">
                    <p><a class="modal-trigger" href="#modal${results[item].id}" style="color:#${results[item].colorTheme}">(Area ${results[item].id}) Attractions</a></p>
                </div>
                <div class="card-reveal">
                    <span class="card-title grey-text text-darken-4">${results[item].name}<i class="material-icons right">close</i></span>
                    <p>${results[item].description}</p>
                </div>
             </div>
            </div>
  
            <div id="modal${results[item].id}" class="modal">
                <div class="modal-content">
                <h4>Area ${results[item].id}</h4>
                    <ul id="modal${results[item].id}text"class="collapsible" data-collapsible="accordion">
                    </ul>
                </div>
            </div>`;

            // Call to attractions and merge with areas
            dataCalls.getAllAttractions(`${results[item].id}`)
                .then((data) => {
                    let aKeys = Object.keys(data);
                    aKeys.forEach((attr) => {
                        dataCalls.getIndTypes(`${data[attr].type_id}`)
                            .then((response) => {
                                let tKeys = Object.keys(response);
                                tKeys.forEach((type) => {
                                    document.getElementById(`modal${results[item].id}text`).innerHTML += `<li>
                      <div class="collapsible-header"><a href="#">${data[attr].name}</a> &nbsp;(${(response[type].name).toUpperCase()})</div>
                      <div class="collapsible-body"><span>${data[attr].description}</span></div>
                    </li>`;
                                });
                            });
                    });
                });

            // Set each area background color
            document.getElementById(`${results[item].id}`).style.background = `#${results[item].colorTheme}`;
        });

        // get modals ready for the click
        $(document).ready(function () {
            $('.modal').modal();
        });

        // make accordions ready
        $(document).ready(function () {
            $('.collapsible').collapsible();
        });

    });

let displaySearchResults = (array) => {
    document.getElementById("body").innerHTML = " ";
    $(document).ready(function () {
        $('.collapsible').collapsible();
    });
    document.getElementById("body").innerHTML +=
        `<h3>Your Search Returned ${array.length} Results</h3>`;

    if (array.length === 0) {
        document.getElementById("body").innerHTML +=
            `<h5>Try Your Search Using Another Term</h5>
            <a id="searchReturn" class="waves-effect waves-light btn-large">Return Home</a>`;
        document.getElementById("searchReturn").addEventListener("click", function (e) {
            location.reload();
        });
    } else {
        document.getElementById("body").innerHTML +=
            `<ul id="searchCollapse" class="collapsible popout" data-collapsible="accordion">`;
        array.forEach((item) => {
            document.getElementById("searchCollapse").innerHTML += `
        <li>
          <div class="collapsible-header">${item.name}</div>
          <div class="collapsible-body searchDescription"><span>
            <h4>Area ${item.area_id}</h4>
          ${item.description}</span></div>
        </li>`;
        });
        document.getElementById("body").innerHTML +=
            `</ul>
    <a id="searchReturn" class="waves-effect waves-light btn-large">Return Home</a>`;
        document.getElementById("searchReturn").addEventListener("click", function (e) {
            location.reload();
        });
    }
};


module.exports = {
    displaySearchResults
};