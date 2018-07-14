var carsArr = ["Lamborghini", "Ferrari", "Audi"];

//Functions were breaking...notating e-v-e-r-y-t-h-i-n-g; moved document.ready to bottom.
// renderButtons will display the car buttons for all cars within the carsArr array.
function renderButtons() {
  // Empty the buttons panel before redrawing it
  $("#buttonPanel").empty();

  // Loop through the array of cars
  for (var i = 0; i < carsArr.length; i++) {
    // Dynamicaly generate a button for each car in the array
    var button = $("<button>");
    button.addClass("carButton");
    button.attr("data-car", carsArr[i]);
    button.text(carsArr[i]);

    // Add the button to the HTML
    $("#buttonPanel").append(button);
  }
}
//Event handlers

// An event handler for the user form to add additional cars to the array
$("#add-car").on("click", function(event) {
  event.preventDefault();

  // Get the input from the textbox
  var car = $("#car-input")
    .val()
    .trim();

  // The car from the textbox is then added to our carsArr array
  carsArr.push(car);
  $("#car-input").val("");

  // Redraw the car buttons
  renderButtons();
});

// fetchcargifs will fetch car gifs with the Giphy API
function fetchcargifs() {
  // Get the car name from the button clicked
  var carName = $(this).attr("data-car");
  var carStr = carName.split(" ").join("+");

  // make the giphy URL
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    carStr +
    "&limit=10&api_key=b0JAGUJDjol9HySDb1qMsu16MrDHEEL3";

  // AJAX giphy API call
  $.ajax({
    method: "GET",
    url: queryURL
  }).done(function(result) {
    // Get the results array
    var dataArray = result.data;
    // Create and display div elements for each of the returned gifs
    $("#gifPanel").empty();
    for (var i = 0; i < dataArray.length; i++) {
      var newDiv = $("<div>");
      newDiv.addClass("cargif");
      var newRating = $("<h2>").html("Rating: " + dataArray[i].rating);
      newDiv.append(newRating);
      var newImg = $("<img>");
      newImg.attr("src", dataArray[i].images.fixed_height_still.url);
      newImg.attr("data-still", dataArray[i].images.fixed_height_still.url);
      newImg.attr("data-animate", dataArray[i].images.fixed_height.url);
      newImg.attr("data-state", "still");
      newDiv.append(newImg);

      // Append the new gifs to the gifPanel
      $("#gifPanel").append(newDiv);
    }
  });
}
// animatecargif will animate a still gif and stop a moving gif
function animatecargif() {
  // The image state will be either "still" or "animated", function will swap states onClick via handler
  var state = $(this)
    .find("img")
    .attr("data-state");

  // Make the gif either animated or still depending on the "data-state" value
  if (state === "still") {
    $(this)
      .find("img")
      .attr(
        "src",
        $(this)
          .find("img")
          .attr("data-animate")
      );
    $(this)
      .find("img")
      .attr("data-state", "animate");
  } else {
    $(this)
      .find("img")
      .attr(
        "src",
        $(this)
          .find("img")
          .attr("data-still")
      );
    $(this)
      .find("img")
      .attr("data-state", "still");
  }
}

// relocated ready function as it was causing issues initally
//
$(document).ready(function() {
  renderButtons();
});

// An event handler for the car buttons to fetch appropriate gifs
$(document).on("click", ".carButton", fetchcargifs);

// Add an event handler for the car gifs to make the image animate and stop
$(document).on("click", ".cargif", animatecargif);
