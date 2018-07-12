

/* var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=star+wars&b0JAGUJDjol9HySDb1qMsu16MrDHEEL3&limit=10");
xhr.done(function(data) { console.log("success got data", data); });

static image data access
static image url-> data.images.fixed_height_still.url */

$(document).ready(function(){

    //This function will do a search call to the Giphy API and will create the still image <img> tags
    //Recommend including the onClick function here to consolidate still/animated
    
    $('button').on('click', function() {
    
        var cars = $(this).data('name');
        var giphyQ = "https://api.giphy.com/v1/gifs/search?q=" + cars + "&api_key=b0JAGUJDjol9HySDb1qMsu16MrDHEEL3&limit=10";
    
        $.ajax({
            url: giphyQ,
            method: 'GET'
        })
            .done (function (response){
              console.log(response)
            var apiResponse = response.data;

            for(var i = 0; i < results.length; i++){
                var divTag = $('<div/>');
                
    // create var for jQuery tag creation  
      
              var pTag = $('<p/>');
              var imgTag = $('<img/>');
              p.text(results[i].rating);
              
              imgTag.addClass('something');//whatever class you want the images to use
              imgTag.attr('src', apiResponse[i].images.fixed_height.url);
              imgTag.attr('data-still', apiResponse[i].images.fixed_height_still.url);// data attributes can be used for the onClick function
              imgTag.attr('data-animated', apiResponse[i].images.fixed_height.url);
              
              
              
            }
          
          
          
          
          })
    
    /*user submission and parse function will go here
    *
    *
    */
    });
    });