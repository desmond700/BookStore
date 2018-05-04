//JavaScript Document

var jsonObj;
var genre = "";
$(function(){
  var hashVal = window.location.hash.substring(1);



  $.ajax({
    url: "data/books.json",
    type: "GET",
    dataType: "json",
    complete: function(data){
      jsonObj = data.responseJSON;
      window.sessionStorage.setItem("json", JSON.stringify(jsonObj));

      $.each(jsonObj.Books, function (index, element) {
          var img = $("<img />").attr("style", "height:248px")
                                .attr("class", "img-thumbnail")
                                .attr("src", "images/bookcover/" + element.img);
          var anchorImg = $("<a />").attr("href", "./book?title="+element.Title).append(img)
                                                     .attr("class", "ml-auto mr-auto");
          var title = $("<p class='txt'></p>").append(element.Title);
          var author = $("<h6 class='txtg'></h6>").append(element.Author);
          var anchorTitle = $("<a />").attr("href", "./book?title="+element.Title).append(title);
          var bookType = $("<p class='txtg'></p>").append(element["Book Type"]);
          var price = $("<p class='txtg text-danger'></p>").append("CDN$ "+element.Price);
          var parentDiv = $("<div class='viewedItem d-flex flex-column col-10 col-sm-5 col-md-3 col-lg-2 mx-3 mt-3 pt-3 bg-light' data-viewed-item='"+element.Title+"'></div>")
                          .append(anchorImg, anchorTitle, author, bookType, price);

          $("#bookslib").append(parentDiv);

      })

      if(hashVal != "")
        $("select#genreSel").val(hashVal)
                            .trigger( "change" );

    }

  }).done(function(data){
    console.log("json loaded. ");
  }).fail(function(data, status, error){
    console.log("json failed to load: " + error);
  })



})


function getVal(value){
  $("#bkgenre").html(value);
  $("#bookslib").empty();
  if(value !== "All"){
    $.each(jsonObj.Books, function (index, element) {
        if(value == element.Genre){
          var img = $("<img />").attr("style", "height:248px")
                                .attr("class", "img-thumbnail")
                                .attr("src", "images/bookcover/" + element.img);
          var anchorImg = $("<a />").attr("href", "./book?title="+element.Title).append(img)
                                                     .attr("class", "ml-auto mr-auto");
          var title = $("<p class='txt'></p>").append(element.Title);
          var author = $("<h6 class='txtg'></h6>").append(element.Author);
          var anchorTitle = $("<a />").attr("href", "./book?title="+element.Title).append(title);
          var bookType = $("<p class='txtg'></p>").append(element["Book Type"]);
          var price = $("<p class='txtg text-danger'></p>").append("CDN$ "+element.Price);
          var parentDiv = $("<div class='d-flex flex-column col-10 col-sm-5 col-md-3 col-lg-2 mx-3 mt-3 pt-3 bg-light'></div>")
                          .append(anchorImg, anchorTitle, author, bookType, price);

          $("#bookslib").append(parentDiv);
        }
    })
  }
  else{
    $.each(jsonObj.Books, function (index, element) {

        var img = $("<img />").attr("style", "height:248px")
                              .attr("class", "img-thumbnail")
                              .attr("src", "images/bookcover/" + element.img);
        var anchorImg = $("<a />").attr("href", "./book?title="+element.Title).append(img)
                                                   .attr("class", "ml-auto mr-auto");
        var title = $("<p class='txt'></p>").append(element.Title);
        var author = $("<h6 class='txtg'></h6>").append(element.Author);
        var anchorTitle = $("<a />").attr("href", "./book?title="+element.Title).append(title);
        var bookType = $("<p class='txtg'></p>").append(element["Book Type"]);
        var price = $("<p class='txtg text-danger'></p>").append("CDN$ "+element.Price);
        var parentDiv = $("<div class='d-flex flex-column col-10 col-sm-5 col-md-3 col-lg-2 mx-3 mt-3 pt-3 bg-light'></div>")
                        .append(anchorImg, anchorTitle, author, bookType, price);

        $("#bookslib").append(parentDiv);
      })
  }

}
