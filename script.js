let rootURL = "http://comp426.cs.unc.edu:3001/";
$(document).ready(() => {

    function login() {
        $.ajax({
            url: rootURL + '/sessions',
            type: 'POST',
            data: {
                "user": {
                    "username": "nikhilk",
                    "password": "730097777"
                }
            },
            xhrFields: {
                withCredentials: true
            }
        });
    }

    login();
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


    $('#searchButton').click(function () {
        buildSearchInterface();
    });

    $('#pageContainer').on("keyup", "#search-bar", function () {
        let searchText = $(this).val().toLowerCase();
        if (searchText === "") {
            $('#pageContainer .city-name').each(function () {
                $(this).parent().parent().show();
            });
            return;
        }
        let searchDropdown = $('#search-type-selector');
        let searchType = searchDropdown.val();
        if (searchType == "city") {
            $('#pageContainer .city-name').each(function () {
                let cityName = $(this).text().toLowerCase();
                if (cityName.indexOf(searchText) > -1) {
                    $(this).parent().parent().show();
                } else {
                    $(this).parent().parent().hide();
                }
            });
        }
        if (searchType == "warmer") {
            $('#pageContainer .list-entry').each(function () {
                let searchTemp = parseInt(searchText);
                let cityTemp = $(this).attr("weather");
                if (cityTemp > searchTemp) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        }
        if (searchType == "colder") {
            $('#pageContainer .list-entry').each(function () {
                let searchTemp = parseInt(searchText);
                let cityTemp = $(this).attr("weather");
                if (cityTemp < searchTemp) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
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
        $.ajax(rootURL + "airports", {
            type: 'GET',
            xhrFields: {
                withCredentials: true
            },
            dataType: 'json',
            success: function (response) {
                console.log(response);
                let airportArray = response;
                for (let i = 0; i < 300; i++) {
                    let city = airportArray[i].city;
                    let idNum = airportArray[i].id;
                    let newEntry = buildEntry(city, idNum);
                    $("#pageContainer").append(newEntry);
                }
            },
            error: function () {
                alert("error");
            }
        });
    }

    function buildEntry(city, idNum) {
        let cityName = city;

        let entry = $('<div class="list-entry"></div>');
        //append city image to div
        let contentDiv = $('<div class="content-box"></div>');
        let imgDiv = $('<div class="img-box"></div>');
        entry.append(imgDiv);
        entry.append(contentDiv);
        contentDiv.append('<p class="city-name">' + cityName + '</p>');
        //append weather data here (user openweathermap API)
        addWeatherData(entry, cityName, contentDiv);


        entry.attr("city", cityName);
        entry.attr("id", idNum);
        addRaleighFlights(entry, contentDiv, imgDiv);

        return entry;
    }

    function addRaleighFlights(entry, contentDiv, imgDiv) {
        $.ajax(rootURL + "flights?filter[departure_id]=144154", {
            type: 'GET',
            xhrFields: {
                withCredentials: true
            },
            dataType: 'json',
            success: function (response) {
                let raleighFlights = response;
                let flightCount = 0;
                for (let i = 0; i < raleighFlights.length; i++) {
                    if (raleighFlights[i].arrival_id == entry.attr("id"))
                        flightCount++;

                }
                contentDiv.append('<p class="flights">Number of Flights Available: ' + flightCount + '</p>');
                if (flightCount == 0) {
                    imgDiv.append('<img src="red_plane.png" alt="red" height="100" width="100" class="plane-icon">');
                } else {
                    imgDiv.append('<img src="green_plane.png" alt="green" height="100" width="100" class="plane-icon">');
                }

            },
            error: function () {
                alert("error");
            }
        });
    }

    function addWeatherData(entry, city, contentDiv) {
        let encodedCity = encodeURIComponent(city);
        $.ajax("http://api.openweathermap.org/data/2.5/weather?q=" + encodedCity + "&units=imperial&APPID=ea615f34affc4be5cb4f0be51df01e6a", {
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                let weather = $('<p class="weather">Current Weather: ' + response.main.temp + "&deg; F</p>");
                entry.attr("weather", response.main.temp);
                contentDiv.append(weather);
            },
            error: function () {
                let weather = $('<p class="weather-not-found">No weather data</p>');
                contentDiv.append(weather);
            }
        });
    }

    var venues_url = "https://api.foursquare.com/v2/venues/explore?client_id=1OLLF5IIHTFP0LPT54GNMU1BQHHGONNAZFVDVVFHSB1NPA5G&client_secret=GGIW2UECPUAP23WFAA5LRU2H3I5ZDUY4NJHYDHOVMQUVTHEQ&near="
    var DetailsPage = function (city) {
        var pageContainer = $('#pageContainer');
        pageContainer.empty();

        var showSlides = function (n) {
            var i;
            var slides = document.getElementsByClassName("slide");
            if (slides.length === 0) {
                return;
            }
            if (n > slides.length) {
                currentPicture = 1
            }
            if (n < 1) {
                currentPicture = slides.length
            }
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            slides[currentPicture - 1].style.display = "block";
        }
        var cityName = city;
        pageContainer.append('<h2>' + cityName + '</h2>');

        var returnButton = $('<button class="return">Return</button>');
        pageContainer.on("click", ".return", function (event) {
            buildSearchInterface();
        });
        pageContainer.append(returnButton);

        // slideShowCode
        var currentPicture = 1;
        var slideShowContainer = $('<div id="places-slideshow"class="places-slideshow"></div>');

        // next and back buttons
        var prevButton = $('<a class="prev">&#10094;</a>');
        prevButton.click(function () {
            showSlides(currentPicture -= 1)
        });

        var nextButton = $('<a class="next">&#10095;</a>');
        nextButton.click(function () {
            showSlides(currentPicture += 1)
        });

        slideShowContainer.append(prevButton);
        slideShowContainer.append(nextButton);

        pageContainer.append(slideShowContainer);

        var addToSlideShow = function (textQuery) {
            pageContainer.append('<div class="map" id="map"></div>');
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 200
            });
            var initialRequest = {
                query: textQuery,
                fields: ['photos']
            };
            var service = new google.maps.places.PlacesService(map);
            service.findPlaceFromQuery(initialRequest, function (results, status) {
                if (results != null) {
                    var imageUrl = results[0].photos[0].getUrl();
                    var imageCaption = $(results[0].photos[0].html_attributions[0]);
                    imageCaption.addClass("caption");

                    // add to page container
                    var imageContainer = $('<div class="slide fade"></div>');
                    imageContainer.append('<img src=' + imageUrl + '>');
                    imageContainer.append(imageCaption);
                    slideShowContainer.append(imageContainer);
                    showSlides(currentPicture);
                }
            });
        }
        // endSlideShowCode

        var sampleItenDiv = $('<div class="sampleDay" id="sampleDay"></div>');

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
                    addToSlideShow(response.response.groups[0].items[0].venue.name);
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
                        addToSlideShow(response.response.groups[0].items[0].venue.name);
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
                            addToSlideShow(response.response.groups[0].items[0].venue.name);
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
                                addToSlideShow(response.response.groups[0].items[0].venue.name);
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
        showSlides(currentPicture);
    }

    $('#pageContainer').on("click", ".list-entry", function () {
        let city = $(this).attr("city");
        DetailsPage(city);
    });
});