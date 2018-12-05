$(document).ready(() => {

    // TO-DO:  Use jQuery tooltip widget to make tooltips look pretty?  

    // when home is clicked, append everything to page container
    $("#pageContainer").empty();
    $("#pageContainer").append("<div id=\"pictureContainer\"></div>");
    $("#pageContainer").append("<img src=\"https://bento.cdn.pbs.org/hostedbento-prod/filer_public/master%20images/SECE/Travel/travelimagetransparent.png\" alt=\"Stylized drawing of multiple cities\" id=\"fullsizePhoto\">");
    $("#pageContainer").append("<br><br>");
    $("#pageContainer").append("<div id=\"splashpage\"></div>");
    $("#splashpage").append("<div id=\"splashpageText\"> Pick from one of our popular destinations </div>");
    // Raleigh
    $("#splashpage").append("<div id=\"location1Container\" class=\"locationContainer\"></div>");
    $("#location1Container").append("<h3 id=\"raleigh\">Raleigh</h3>");
    $("#raleigh").attr("title", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac felis ac nibh placerat dapibus. Nullam lacinia molestie velit, a euismod leo blandit nec. Suspendisse ut placerat augue, et consequat leo. Morbi vestibulum lorem lectus. In tempus diam eu lectus egestas porta. Curabitur viverra est ligula, in fermentum ligula egestas eget. Aenean at nibh id nulla gravida tempor at quis nisi.");
    $("#location1Container").append("<img src=\"http://www.northcarolinatravels.com/raleigh/capital-raleigh.jpg\" alt=\"Historic Raleigh building\" class=\"splashpagePhoto\">");
    // Charleston
    $("#splashpage").append("<div id=\"location2Container\" class=\"locationContainer\"></div>");
    $("#location2Container").append("<h3 id=\"charleston\">Charleston</h3>");
    $("#charleston").attr("title", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac felis ac nibh placerat dapibus. Nullam lacinia molestie velit, a euismod leo blandit nec. Suspendisse ut placerat augue, et consequat leo. Morbi vestibulum lorem lectus. In tempus diam eu lectus egestas porta. Curabitur viverra est ligula, in fermentum ligula egestas eget. Aenean at nibh id nulla gravida tempor at quis nisi.");
    $("#location2Container").append("<img src=\"https://i0.wp.com/www.charlestoncvb.com/blog/wp-content/uploads/ExploreCharleston_HighBattery_3-2.jpg?resize=1400%2C750&ssl=1\" alt=\"Historic Charleston building\" class=\"splashpagePhoto\">");
    // Asheville
    $("#splashpage").append("<div id=\"location3Container\" class=\"locationContainer\"></div>");
    $("#location3Container").append("<h3 id=\"asheville\">Asheville</h3>");
    $("#asheville").attr("title", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac felis ac nibh placerat dapibus. Nullam lacinia molestie velit, a euismod leo blandit nec. Suspendisse ut placerat augue, et consequat leo. Morbi vestibulum lorem lectus. In tempus diam eu lectus egestas porta. Curabitur viverra est ligula, in fermentum ligula egestas eget. Aenean at nibh id nulla gravida tempor at quis nisi.");
    $("#location3Container").append("<img src=\"https://www.medprodisposal.com/wp-content/uploads/2016/05/Asheville-NC.jpg\" alt=\"Historic Charleston building\" class=\"splashpagePhoto\">");


    let rootURL = "http://comp426.cs.unc.edu:3001/";

    $('#searchButton').click(function () {
        buildSearchInterface();
    });

    $('.pageContainer').on("keyup", "#search-bar", function () {
        let searchText = $(this).val().toLowerCase();
        let searchDropdown = $('#search-type-selector');
        let searchType = searchDropdown.val();
        if (searchType == "city") {
            $('.pageContainer .city-name').filter(function () {
                $(this).parent().toggle($(this).text().toLowerCase().indexOf(searchText) > -1)
            });
        }
        if (searchType == "warmer") {
            //toggle cities who have temperature lower than the searched temperature
        }
        if (searchType == "colder") {
            //toggle cities who have temperature higher than the searched temperature
        }

    });


    function buildSearchInterface() {
        let pageContainer = $('.pageContainer');
        pageContainer.empty();
        pageContainer.append("<select id='search-type-selector' name='searchChoice'><option value='city'>By City</option><option value='warmer'>Warmer Than</option><option value='colder'>Colder Than</option></select>")
        pageContainer.append("<input id='search-bar' type='text' placeholder='Search...'>");
        loadEntries();
    }

    function loadEntries() {
        $.ajax(rootURL + "/airports", {
            type: 'GET',
            xhrFields: { withCredentials: true },
            dataType: 'json',
            success: function (response) {
                let airportArray = response.data;
                for (let i = 0; i < airportArray.length; i++) {
                    let city = airportArray[i].city;
                    let state = airportArray[i].state;
                    let newEntry = buildEntry(city, state);
                    pageContainer.append(newEntry);
                }
            },
            error: function () {
                alert("error");
            }
        });
    }

    function buildEntry(city, state) {
        let cityName = city;
        let stateName = state;

        let entry = $('<div class="list-entry"></div>');
        //append city image to div
        entry.append('<p class="city-name">' + cityName + '</p>');
        entry.append('<p class="state-name">' + stateName + '</p>');
        //append weather data here (user openweathermap API)

        entry.attr("city", cityName);
        return entry;
    }

    var venues_url = "https://api.foursquare.com/v2/venues/explore?client_id=1OLLF5IIHTFP0LPT54GNMU1BQHHGONNAZFVDVVFHSB1NPA5G&client_secret=GGIW2UECPUAP23WFAA5LRU2H3I5ZDUY4NJHYDHOVMQUVTHEQ&near="

    var DetailsPage = function (city, state) {
        city = prompt("What city are we looking at?");
        state = prompt("What state is this city in?");
        var pageContainer = $('#pageContainer');
        pageContainer.empty();

        var cityName = city + ", " + state;
        pageContainer.append('<h2>' + cityName + '</h2>');

        var sampleItenDiv = $('<div class="sampleDay" id="sampleDay"></div>');

        sampleItenDiv.append('<h3>Lets look at what a day in ' + city + ' could look like: </h3>');
        $.ajax(venues_url + city + ", " + state + "&query=breakfast&v=20181202&limit=3&radius=30000", {
            type: 'GET',
            dataType: 'json',
            success: (response) => {
                sampleItenDiv.append('<h4>First, breakfast at ' + response.response.groups[0].items[0].venue.name + '</h4>');
                console.log(response.response.groups[0].items[0].venue.categories[0].name)
                sampleItenDiv.append('<label>' + response.response.groups[0].items[0].venue.name
                    + ' is a ' + response.response.groups[0].items[0].venue.categories[0].name
                    + ' located at ' + response.response.groups[0].items[0].venue.location.formattedAddress[0] + " "
                    + response.response.groups[0].items[0].venue.location.formattedAddress[1] + " "
                    + response.response.groups[0].items[0].venue.location.formattedAddress[2] + '</label>');
                pageContainer.append(sampleItenDiv);
            }
        }).done(function () {
            $.ajax(venues_url + city + ", " + state + "&query=lunch&v=20181202&limit=3&radius=30000", {
                type: 'GET',
                dataType: 'json',
                success: (response) => {
                    sampleItenDiv.append('<h4>After that, lunch at ' + response.response.groups[0].items[1].venue.name + '</h4>');
                    console.log(response.response.groups[0].items[1].venue.categories[0].name)
                    sampleItenDiv.append('<label>' + response.response.groups[0].items[1].venue.name
                        + ' is a ' + response.response.groups[0].items[1].venue.categories[0].name
                        + ' located at ' + response.response.groups[0].items[1].venue.location.formattedAddress[0] + " "
                        + response.response.groups[0].items[1].venue.location.formattedAddress[1] + " "
                        + response.response.groups[0].items[1].venue.location.formattedAddress[2] + '</label>');
                    pageContainer.append(sampleItenDiv);
                }
            }).done(function () {
                $.ajax(venues_url + city + ", " + state + "&query=dinner&v=20181202&limit=3&radius=3000", {
                    type: 'GET',
                    dataType: 'json',
                    success: (response) => {
                        sampleItenDiv.append('<h4>Then, dinner at ' + response.response.groups[0].items[2].venue.name + '</h4>');
                        console.log(response.response.groups[0].items[2].venue.categories[0].name)
                        sampleItenDiv.append('<label>' + response.response.groups[0].items[2].venue.name
                            + ' is a ' + response.response.groups[0].items[2].venue.categories[0].name
                            + ' located at ' + response.response.groups[0].items[2].venue.location.formattedAddress[0] + " "
                            + response.response.groups[0].items[2].venue.location.formattedAddress[1] + " "
                            + response.response.groups[0].items[2].venue.location.formattedAddress[2] + '</label>');
                        pageContainer.append(sampleItenDiv);
                    }
                });
            });
        });
    }
});


