$(document).ready(function() {

    let rootURL =  "http://comp426.cs.unc.edu:3001/";

    $('#searchButton').click(function() {
        buildSearchInterface();
    });


    function buildSearchInterface() {
        let pageContainer = $('.pageContainer');
        pageContainer.empty();
        pageContainer.append("<select id='search-type-selector' name='searchChoice'><option value='city'>By City</option><option value='weather'>By Weather</option><option value='flights'>By Number of Flights</option></select>")
        pageContainer.append("<input id='search-bar' type='text' placeholder='Search...'>");
        loadEntries();
    }

    function loadEntries() {
        $.ajax(rootURL + "/airports", {
            type: 'GET',
            xhrFields: {withCredentials: true},
            dataType: 'json',
            success: function(response) {
                let airportArray = response.data;
                for(let i = 0; i < airportArray.length; i++) {
                    let city = airportArray[i].city;
                    let state = airportArray[i].state;
                    let newEntry = buildEntry(city, state);
                    pageContainer.append(newEntry);
                }
            },
            error: function() {
                alert("error");
            }
        });
    }

    
});