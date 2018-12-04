$(document).ready(() => {
    
    // TO-DO:  Use jQuery tooltip widget to make tooltips look pretty?  
    
    // when home is clicked, append everything to page container
    $("#homeButton").on("click", () => {
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
    });
});
    