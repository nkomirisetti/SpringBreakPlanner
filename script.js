$(document).ready(() => {

    // TO-DO:  Use jQuery tooltip widget to make tooltips look pretty?  
    function buildHomePage() {
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
    }

    buildHomePage();
    // when home is clicked, append everything to page container
    $("#homeButton").click(function () {
        buildHomePage();
    });

    let rootURL = "http://comp426.cs.unc.edu:3001/";

    $('#searchButton').click(function () {
        buildSearchInterface();
    });

    $('#pageContainer').on("keyup", "#search-bar", function () {
        let searchText = $(this).val().toLowerCase();
        let searchDropdown = $('#search-type-selector');
        let searchType = searchDropdown.val();
        if (searchType == "city") {
            $('#pageContainer .city-name').filter(function () {
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
        let pageContainer = $('#pageContainer');
        pageContainer.empty();
        pageContainer.append("<select id='search-type-selector' name='searchChoice'><option value='city'>By City</option><option value='warmer'>Warmer Than</option><option value='colder'>Colder Than</option></select>")
        pageContainer.append("<input id='search-bar' type='text' placeholder='Search...'>");
        loadEntries();
    }

    function loadEntries() {
        $.ajax(rootURL + "/airports", {
            type: 'GET',
            xhrFields: {
                withCredentials: true
            },
            dataType: 'json',
            success: function (response) {
                let airportArray = response;
                for (let i = 0; i < 30; i++) {
                    let city = airportArray[i].city;
                    let newEntry = buildEntry(city);
                    $("#pageContainer").append(newEntry);
                }
            },
            error: function () {
                alert("error");
            }
        });
    }

    function buildEntry(city) {
        let cityName = city;

        let entry = $('<div class="list-entry"></div>');
        //append city image to div
        entry.append('<p class="city-name">' + cityName + '</p>');
        //append weather data here (user openweathermap API)

        entry.attr("city", cityName);
        return entry;
    }

    var venues_url = "https://api.foursquare.com/v2/venues/explore?client_id=1OLLF5IIHTFP0LPT54GNMU1BQHHGONNAZFVDVVFHSB1NPA5G&client_secret=GGIW2UECPUAP23WFAA5LRU2H3I5ZDUY4NJHYDHOVMQUVTHEQ&near="
    var places_url1 = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=AIzaSyCeA-FfGGy8YeLB04QLxrt_XgFiC0lbyuo&input="; // add text query
    var places_url2 = "&inputtype=textquery&fields=photos";
    var images_url = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photoreference="; // add photo refrence ID
    var DetailsPage = function (city) {
        var pageContainer = $('#pageContainer');
        pageContainer.empty();


        var cityName = city;
        pageContainer.append('<h2>' + cityName + '</h2>');

        var returnButton = $('<button class="return">Return</button>');
        pageContainer.on("click", ".return", function (event) {
            buildSearchInterface();
        });
        pageContainer.append(returnButton);

        // slideShowCode
        pageContainer.append('<div class="places-slideshow"></div>');

        var addToSlideShow = function (textQuery) {
            pageContainer.append('<div class="map" id="map"></div>');
            var map = new google.maps.Map(document.getElementById('map'),{
                zoom:200
            });
            var initialRequest = {
                query: textQuery,
                fields: ['photos']
            };
            var service = new google.maps.places.PlacesService(map);
            service.findPlaceFromQuery(initialRequest, function (results, status) {
                console.log(results[0].photos[0].getUrl());
            });
            // get place (need author name)
            // get image
            // add to page container
        }
        // endSlideShowCode

        var sampleItenDiv = $('<div class="sampleDay" id="sampleDay"></div>');

        // $.ajax(venues_url + city + "&query=breakfast&v=20181202&limit=3&radius=30000", {
        //     type: 'GET',
        //     dataType: 'json',
        //     success: (response) => {
        //        $.ajax(places_url1 + response.response.groups[0].items[0].venue.name + places_url2, {
        //             type: 'GET',
        //             dataType: 'json',
        //             success: (response) => {
        //                 $.ajax(images_url + response.candidates[0].photos[0].photo_reference, {
        //                     type: 'GET',
        //                     dataType: 'json',
        //                     success: (response)=>{
        //                         console.log(response);
        //                     }
        //                 })
        //             }
        //        });
        //     }
        // })


        sampleItenDiv.append('<h3>Lets look at what a day in ' + city + ' could look like: </h3>');
        $.ajax(venues_url + city + "&query=breakfast&v=20181202&limit=3&radius=30000", {
            type: 'GET',
            dataType: 'json',
            success: (response) => {
                addToSlideShow(response.response.groups[0].items[0].venue.name);
                sampleItenDiv.append('<h4>First, breakfast at ' + response.response.groups[0].items[0].venue.name + '</h4>');
                sampleItenDiv.append('<label>' + response.response.groups[0].items[0].venue.name +
                    ' is a ' + response.response.groups[0].items[0].venue.categories[0].name +
                    ' located at ' + response.response.groups[0].items[0].venue.location.formattedAddress[0] + " " +
                    response.response.groups[0].items[0].venue.location.formattedAddress[1] + " " +
                    response.response.groups[0].items[0].venue.location.formattedAddress[2] + '</label>');
                pageContainer.append(sampleItenDiv);
            }
        }).done(function () {

            $.ajax(venues_url + city + "&section=arts&v=20181202&limit=1&radius=30000", {
                type: 'GET',
                dataType: 'json',
                success: (response) => {
                    sampleItenDiv.append('<h4>After breakfast, we think you will like an art activity at ' + response.response.groups[0].items[0].venue.name + '</h4>');
                    sampleItenDiv.append('<label>' + response.response.groups[0].items[0].venue.name +
                        ' is a ' + response.response.groups[0].items[0].venue.categories[0].name +
                        ' located at ' + response.response.groups[0].items[0].venue.location.formattedAddress[0] + " " +
                        response.response.groups[0].items[0].venue.location.formattedAddress[1] + " " +
                        response.response.groups[0].items[0].venue.location.formattedAddress[2] + '</label>');
                    pageContainer.append(sampleItenDiv);
                }
            }).done(function () {
                $.ajax(venues_url + city + "&query=lunch&v=20181202&limit=3&radius=30000", {
                    type: 'GET',
                    dataType: 'json',
                    success: (response) => {
                        sampleItenDiv.append('<h4>After that, lunch at ' + response.response.groups[0].items[1].venue.name + '</h4>');
                        sampleItenDiv.append('<label>' + response.response.groups[0].items[1].venue.name +
                            ' is a ' + response.response.groups[0].items[1].venue.categories[0].name +
                            ' located at ' + response.response.groups[0].items[1].venue.location.formattedAddress[0] + " " +
                            response.response.groups[0].items[1].venue.location.formattedAddress[1] + " " +
                            response.response.groups[0].items[1].venue.location.formattedAddress[2] + '</label>');
                        pageContainer.append(sampleItenDiv);
                    }
                }).done(function () {
                    $.ajax(venues_url + city + "&section=shops&v=20181202&limit=2&radius=3000", {
                        type: 'GET',
                        dataType: 'json',
                        success: (response) => {
                            sampleItenDiv.append('<h4>After lunch, a very popular local site to shop at is ' + response.response.groups[0].items[1].venue.name + '</h4>');
                            sampleItenDiv.append('<label>' + response.response.groups[0].items[1].venue.name +
                                ' is a ' + response.response.groups[0].items[1].venue.categories[0].name +
                                ' located at ' + response.response.groups[0].items[1].venue.location.formattedAddress[0] + " " +
                                response.response.groups[0].items[1].venue.location.formattedAddress[1] + " " +
                                response.response.groups[0].items[1].venue.location.formattedAddress[2] + '</label>');
                            pageContainer.append(sampleItenDiv);
                        }
                    }).done(function () {
                        $.ajax(venues_url + city + "&query=dinner&v=20181202&limit=3&radius=3000", {
                            type: 'GET',
                            dataType: 'json',
                            success: (response) => {
                                sampleItenDiv.append('<h4>Then, dinner at ' + response.response.groups[0].items[2].venue.name + '</h4>');
                                sampleItenDiv.append('<label>' + response.response.groups[0].items[2].venue.name +
                                    ' is a ' + response.response.groups[0].items[2].venue.categories[0].name +
                                    ' located at ' + response.response.groups[0].items[2].venue.location.formattedAddress[0] + " " +
                                    response.response.groups[0].items[2].venue.location.formattedAddress[1] + " " +
                                    response.response.groups[0].items[2].venue.location.formattedAddress[2] + '</label>');
                                pageContainer.append(sampleItenDiv);
                            }
                        });
                    });
                });
            });
        });
    }

    $('#pageContainer').on("click", ".list-entry", function () {
        let city = $(this).attr("city");
        let state = $(this).attr("state");
        DetailsPage(city, state);
    });
});