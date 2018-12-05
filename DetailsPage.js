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

