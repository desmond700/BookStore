
// Create web workers
var fetchWorker = new Worker("js/FetchWorker.js");
var modWorker = new Worker("js/ModWorker.js");

$(function(){
  // Fetch the url of the current page
  var location = window.location.href.substring(26);
  // Variable to store json object
  var jsonObj = "";
  // Variable to store book's genre
  var genre = "";
  // Gets hash value from url
  var hashVal = window.location.hash.substring(1);
  // Gets the query variable
  var titleVar = window.location.search.substring(1,6);
  // Gets the query variable
  var qv = window.location.search.substring(1,5);
  var queryVar = qv.trim();
  // Gets the query variable
  var query = window.location.search.substring(7);
  var qs = decodeURIComponent(query.replace(/%20/g, " ").trim());
  // Decode url
  var bookSearch = decodeURIComponent(query.replace(/%20/g, " ").trim());


  // Chech if browser supports service workers
  /*if("serviceWorker" in navigator){
    window.addEventListener("load", function(registration){
      navigator.serviceWorker.register("sw.js").then(function(){
        console.log("ServiceWorker registration successful with scope: ", registration.scope)
      }, function(err){
        console.log("ServiceWorker registration failed: ", err)
      });
    })
  }*/


  // call onmessage on the web worker
  fetchWorker.onmessage = function(event){
      // FadeOut page loading gif
      $(".se-pre-con").stop().fadeOut(600);
      // Store json received from the worker file in jsonObj variable
      jsonObj = event.data.Json;
      // Call a sessionStorage to store the json object received from the worker file
      window.sessionStorage.setItem("json", JSON.stringify(jsonObj));
      // Pass record count received from the worker file to the html function
      $(".itemCnt").html(event.data.recordCount);
      // Loop through json object and pass value to the respected jQuery function
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
          var parentDiv = $('<div class="viewedItem d-flex flex-column col-10 col-sm-5 col-md-3 col-lg-2 mx-3 mt-3 pt-3 bg-light" data-viewed-item="'+element.Title+'"></div>')
                          .append(anchorImg, anchorTitle, author, bookType, price);

          $("#bookslib").append(parentDiv);

      })
      // Pass url hash value to jQuery function if it's not empty
      if(hashVal != "")
        $("select#genreSel").val(hashVal).trigger( "change" );
  }
  // Start web worker
  fetchWorker.postMessage({message: "fetch json"});

  // Execute function if select option changes
  $('select').on('change', function () {
    // Store value of option in the value variable
    var value = $(this).val();
    // Pass value to jQuery function
    $("#bkgenre").html(value);
    // Empty the html element containing the respected id
    $("#bookslib").empty();
    // Changes url based on the select option's value
    window.location.href = (value === "All") ? "#" : ("#"+value);

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
            var parentDiv = $('<div class="viewedItem d-flex flex-column col-10 col-sm-5 col-md-3 col-lg-2 mx-3 mt-3 pt-3 bg-light" data-viewed-item="'+element.Title+'"></div>')
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
          var parentDiv = $('<div class="viewedItem d-flex flex-column col-10 col-sm-5 col-md-3 col-lg-2 mx-3 mt-3 pt-3 bg-light" data-viewed-item="'+element.Title+'"></div>')
                          .append(anchorImg, anchorTitle, author, bookType, price);

          $("#bookslib").append(parentDiv);
        })
      }
  })

  // Call sessionStorage to retreive the json object stored earlier
  var json = JSON.parse(window.sessionStorage.getItem("json"));
  // Fills book page based on query value
  // If url query variable is title, execute loop function
  if(titleVar === "title"){
    // Loop through json object pass value to respected jQuery function
    $.each(json.Books, function (index, element) {
      /* If the value stored in the url title variable is equal to the
      title of the json object, pass associated values to jQuery functions*/
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
        var header = $("<h1>Production Details</h1>");
        var bookType = $("<p class='txtg'></p>").prepend($("<strong />").text("Book Type: "))
                                                .append(element["Book Type"]);
        var bookPages = $("<p class='txtg'></p>").prepend($("<strong />").text("Book Pages: "))
                                                 .append(element["Book Pages"]);
        var publisher = $("<p class='txtg'></p>").prepend($("<strong />").text("Publisher: "))
                                                 .append(element.Publisher);
        var publishedDate = $("<p class='txtg'></p>").prepend($("<strong />").text("Published Date: "))
                                                     .append(element["Publish Date"]);
        var isbn = $("<p class='txtg'></p>").prepend($("<strong />").text("ISBN: "))
                                            .append(element.ISBN);
        var genre = $("<p class='txtg'></p>").prepend($("<strong />").text("Genre: "))
                                             .append(element.Genre);
        var language = $("<p class='txtg'></p>").prepend($("<strong />").text("Language: "))
                                                .append(element.Language);
        var aboutAuthor = $("<p class='txtg'></p>").prepend($("<strong />").text("About Author: "))
                                                   .append(element.Bio);

        $("#bkdesc").append(header,publisher,publishedDate,bookType,bookPages,isbn,genre,language,aboutAuthor);
        $("a#genrelink").html(element.Genre)
                        .attr("href", "./books#"+element.Genre);
        $("#activebook").html(qs);
      }
    })
  }



  // Make mobile search bar visible and focused on button click
  $(".searchBtn").click(function(){
    $(this).css("visibility", "hidden");
    $(".mobileSrch").css("visibility", "visible");
      $(".mobileSrch .form-control").focus();
  })
  // Make mobile search bar hidden when out of focus
  $(".mobileSrch").focusout(function(){
    // Apply timeout to allow click to register before button disappear
    window.setTimeout(function() {
      $(".searchBtn").css("visibility", "visible");
      $(".mobileSrch").css("visibility", "hidden")
    }, 100);
  })
  // Executes if screen with is greater than or equal to 600
  if($(window).width() >= 600){
    $(".searchBtn").css("visibility", "hidden");
    $(".mobileSrch").focusout();
    $(".mobileSrch").hide();
  }
  // Allow scroll to top, if page is not at the top
  $(window).scroll(function() {
      if($(this).scrollTop() != 0) {
          $('.Backtotop').fadeIn();
      } else {
          $('.Backtotop').fadeOut();
      }
  });
  // Animate scroll to top on button click
  $('.Backtotop').click(function() {
       $("html, body").animate({
           scrollTop: 0
       }, 1000);
   });


   // Search function to handle string comparison
   function string(str2){
     return {
         contains: function str(str1){
                  var _string1 = str1.toLowerCase().trim();
                  var _string2 = str2.toLowerCase();
                  var cmprStr = "";
                  var count = 0;
                  for(let i = 0, j = 0; i < _string2.length; i++, j++){
            			  if(_string1.charAt(j) === _string2.charAt(i)){
                				++count;
                				cmprStr += _string2.charAt(i);
                				if(count === _string1.length)
                				   return true;
            			  }
            			  else{
              				cmprStr = "";
              				count = 0;
              				j = -1;
            			  }
            			  if(j === _string1.length-1)
              				j = -1;
                }
                return false;
           }
      }
	}

   // Declare count variable, to keep track of the number of matches
   var count = 0;
   // If url query variable equals book, execute code
   if(queryVar === "book"){
      let json = JSON.parse(sessionStorage.getItem("json"));
      // Boolean variable to keep track of matching results
      var isNotMatch = true;
      // Loop through json object
      $.each(json.Books, function (index, element) {
        // Using the search function, compare the title of the
        // json object with that of the url variable
        if(string(element.Title).contains(bookSearch)){
          var img = $("<img />").attr("style", "height:248px")
                                .attr("class", "img-thumbnail")
                                .attr("src", "images/bookcover/" + element.img);
          var anchorImg = $("<a />").attr("href", "./book?title="+element.Title).append(img)
                                                     .attr("class", "ml-auto mr-auto");
          var strong = $("<strong />");
          var title = $("<p class='txt'></p>").append(element.Title);
          var author = $("<small class='txtg'></small>").append("<br>by "+element.Author);
          var anchorTitle = $("<a />").attr("href", "./book?title="+element.Title).append(element.Title, author);
          var bookType = $("<p class='txtg'></p>").append(element["Book Type"]);
          var price = $("<p class='txtg text-danger'></p>").append("CDN$ "+element.Price);
          var review = $("<p></p>").text(element.Review).prepend(strong.text("Review: "));
          var imgDiv = $("<div class='col-md-2'></div>").append(anchorImg);
          var infoDiv = $("<div class='col-md-10'></div>").append(anchorTitle, author, bookType, price, review);
          var parentDiv = $("<div class='d-flex flex-row col-10 col-sm-5 col-md-12 pt-3 pb-3 srchDivs bg-light'></div>")
                          .append(imgDiv,infoDiv);

          $("#srchRslt").append(parentDiv);
          // Set isNotMatch to false if there is a match
          isNotMatch = false;
          // increment count for each match
    		  count++;
          // Pass count to jQuery function
    		  $("#srchCnt").html(count);
        }
      })
      if(isNotMatch){
  		  if(bookSearch !== ""){
  			     $("#srchRslt").html("<div class='col-md-12'><p class='text-center'>Search for \""+bookSearch+"\" not found</p></div>");
  		  }else{
  			     $("#srchRslt").html("<div class='col-md-12'><p class='text-center'>invalid search. Please enter a valid input.</p></div>");
  		  }
      }
   }

   if(location === "/"){
     // Get recently viewed book
     fetchWorker.onmessage = function(event){
       $('#recentViewed').show();
       $('#viewed')
         .trigger('add.owl.carousel', [event.data.owlAdd])
         .trigger('refresh.owl.carousel');
       // Pass record count received from the worker file to the html function
       $(".itemCnt").html(event.data.recordCount);
       // FadeOut page loading gif
       $(".se-pre-con").stop().fadeOut(600);
     }
     fetchWorker.postMessage({message:"fetch viewed"});
   }

   if(location === "/shopping-cart"){
     // Shopping Cart
     // Stores subtotal for the shopping cart items
     var subtotal = 0;
     // FadeOut page loading gif
     $(".se-pre-con").stop().fadeOut(600);
     // Call onmessage on web worker
     fetchWorker.onmessage = function(event){
       // Pass data received from web worker file to respected jQuery functions
       var small = $("<small />").append(" by " + event.data.author);
       var title = $("<p class='txtg'></p>").append($("<strong />").text(event.data.title), small);
  	   var language = $("<p class='txtg'></p>").append(event.data.language);
       var bookType = $("<p class='txtg'></p>").append(event.data.bookType);
       var price = $("<p class='txtg text-danger'></p>").append("CDN$ "+event.data.price);
   		 var quantity = $("<p class='txtg'></p>").append("Qty: 1");
   		 var img = $("<img />").attr("src","images/bookcover/"+event.data.img)
   							  .attr("clsss","").width("100");
   		 var deleteBtn = $("<button class='btn btn-danger ml-auto mt-auto' id='deleItem' data-book-isbn='"+event.data.key+"'></button>").text("delete");
       var imgDiv = $("<div class=' col-12 col-sm-3 col-md-3 col-lg-2 mr-0'></div>").append(img);
  		 var infoDiv = $("<div class='d-flex flex-column col-12 col-sm-9 col-md-9 col-lg-10'></div>").append(title,bookType,language,price,quantity,deleteBtn);
    	 var row = $("<div class='row'></div>").append(imgDiv, infoDiv);
    	 var parentDiv = $("<div class='card col-md-12 pt-3 pb-3 mb-3' data-id='"+event.data.key+"'></div>").append(row);
  		 subtotal += parseFloat(event.data.price);
  		 $("#spcrt").append(parentDiv);
  		 $("span.subtl").html(subtotal.toFixed(2));
       // Pass record count received from the worker file to the html function
       $(".itemCnt").html(event.data.recordCount);
       // FadeOut page loading gif
       $(".se-pre-con").stop().fadeOut(600);
     }
     // Start web worker
     fetchWorker.postMessage({message:"fetch cart items"});
  }


   // Hide dialog box until delete button is pressed
   $(".hide-dialog-txt").hide();

   // Remove item from cart
   $("div").delegate("button#deleItem","click",function(){
 	  $(".hide-dialog-txt").show();
 	  var item = $(this);
 	  // Confirmation dialog box
 	  $( "#dialog-confirm" ).dialog({
 		  resizable: false,
 		  height: "auto",
 		  width: 400,
 		  modal: true,
 		  buttons: {
 			"Delete item": function() {
 				deleteItem(item);
 			  $( this ).dialog( "close" );
 			},
 			Cancel: function() {
 			  $( this ).dialog( "close" );
 			}
 		  }
 		});
   })
   // Function that handles deletion of item from the shopping cart
   function deleteItem(e){
      // Stores item's data value in item variable
      var item = e.attr("data-book-isbn");

      modWorker.onmessage = function(e){
        console.log(e.data);
        // It's gone!
     		var cartVal = $(".itemCnt").html();
   	    $(".itemCnt").html(parseInt(cartVal) - 1);
   		  $("div[data-id='"+item+"']").remove();
      }
      modWorker.postMessage({message: "delete", title: item, json: JSON.stringify(jsonObj)});
   }


  // Adds item to Cart on click
  $("div#bkinfo").delegate("button#cartBtn","click",function(event){
    // Stores item's data value in item variable
    var item = $(this).attr("data-book");
    // Call onmessage on web worker
    modWorker.onmessage = function(e){
      // If value received is a number, execute code, else console log the value
      if(!Number.isNaN(parseInt(e.data))){
        var cartVal = $(".itemCnt").html();
        $(".itemCnt").html(parseInt(cartVal) + 1);
      }else {
        console.log(e.data);
      }
    }
    // Start web worker and sends object to it, containing item value and
    //the json object
    modWorker.postMessage({message: "addToCart", title: item, json: JSON.stringify(jsonObj)});
  })

  // Add viewed item on click
  $("div#bookslib").delegate("div.viewedItem","click",function(){
      // Stores data value item into the item variable
      var item = $(this).attr("data-viewed-item");
      // Call onmessage o web worker
      modWorker.onmessage = function(e){
        // Console log value received the web worker file
        console.log(e.data);
      }
      // Start web worker and send object containing item's value and the json object
      modWorker.postMessage({message: "viewed", title: item, json: JSON.stringify(jsonObj)});

  })



  $("#tabs").tabs();
   // jQuery autocomplete
   var availableTags = [
      "Astrophysics",
      "Algera",
      "Alchemist",
      "Brave",
      "C",
      "C++",
      "Cold",
      "Code",
      "Case",
      "Eighty",
      "Feynman",
      "Good",
      "Henrietta",
      "Java",
      "JavaScript",
      "Linear",
      "Programming",
      "Power",
      "Python",
      "Right",
      "Solve",
      "Surely"
    ];
    function split( val ) {
      return val.split( /,\s*/ );
    }
    function extractLast( term ) {
      return split( term ).pop();
    }

    $("input.tags")
      // don't navigate away from the field on tab when selecting an item
      .on( "keydown", function( event ) {
        if ( event.keyCode === $.ui.keyCode.TAB &&
            $( this ).autocomplete( "instance" ).menu.active ) {
          event.preventDefault();
        }
      })
      .autocomplete({
        minLength: 0,
        source: function( request, response ) {
          // delegate back to autocomplete, but extract the last term
          response( $.ui.autocomplete.filter(
            availableTags, extractLast( request.term ) ) );
        },
        focus: function() {
          // prevent value inserted on focus
          return false;
        },
        select: function( event, ui ) {
          var terms = split( this.value );
          // remove the current input
          terms.pop();
          // add the selected item
          terms.push( ui.item.value );
          // add placeholder to get the comma-and-space at the end
          terms.push( "" );
          this.value = terms;
          return false;
        }
    });

})
