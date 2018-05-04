// JavaScript Document

$(function(){
  var query = window.location.search.substring(7);
  var qs = decodeURI(query.replace(/%20/g, " ").trim());
  var json = JSON.parse(sessionStorage.getItem("json"));
  
  $.each(json.Books, function (index, element) {
    if(qs === element.Title){
      var img = $("<img />").height("340")
                            .attr("src", "images/bookcover/"+element.img);
      var author = $("<small />").text(" by "+element.Author);
      var strong = $("<strong />");
      var title = $("<p></p>");
      var span = $("<span />");
      var review = $("<p></p>").text(element.Review)
                               .prepend(strong.text("Review: "));
      var isbn = $("<p class='txtg'></p>").text("ISBN: "+element.ISBN);
      var price = $("<p class='txtg text-danger'></p>").append("CDN$ "+element.Price);
      var addToCart = $("<button class='btn btn-warning' data-book='"+element.Title+"' id='cartBtn'></button>").text(" Add to cart")
      .prepend($("<i class='fa fa-shopping-cart' style='font-size: 18px'></i>"));
      var bookType = $("<div class='btn border border-warning mb-1 font-weight-bold'></div>").append(element["Book Type"],$("<br />"),span.text("CDN$ "+element.Price).addClass("text-danger"));
      title.append($("<h4 class='mb-0'></h4>").text(element.Title),author);
      $("#bkimg").append(img,isbn,price);
      $("#bkinfo").append(title,bookType,review,addToCart);
      $("#bkdesc").append();
      $("a#genrelink").html(element.Genre)
                      .attr("href", "./books#"+element.Genre);
      $("#activebook").html(qs);
    }
  })
})
