
// Create web workers
var viewedWorker = new Worker("js/addViewedItem_WW.js");
var ajaxWorker = new Worker("js/Ajax_WW.js");
var cartWorker = new Worker("js/AddToCart_WW.js");
var getViewedWorker = new Worker("js/GetViewedItem_WW.js");
var shoppingCrtWorker = new Worker("js/shoppingCrt_WW.js");

$(function(){

  var jsonObj;
  var genre = "";
  var hashVal = window.location.hash.substring(1);

  ajaxWorker.onmessage = function(event){
      $(".se-pre-con").stop().fadeOut(600);
      jsonObj = event.data.Json;
      $("i.itemCnt,span.itemCnt").html(event.data.recordCount);
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
        $("select#genreSel").val(hashVal).trigger( "change" );
  }

  ajaxWorker.postMessage("fetch");


  // Change event handler
  $('select').on('change', function () {
    var value = $(this).val();
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

  })

  // Fills book page based on query value
  var query = window.location.search.substring(7);
  var qs = decodeURI(query.replace(/%20/g, " ").trim());
  var json = JSON.parse(sessionStorage.getItem("json"));
  var titleVar = window.location.search.substring(1,6);

  if(titleVar === "title"){
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
  }



  $("#tabs").tabs();
  // assign a sessionStorage to the CartItems variable
  var CartItems = window.sessionStorage;

  $(".searchBtn").click(function(){
    $(this).css("visibility", "hidden");
    $(".mobileSrch").css("visibility", "visible");
      $(".mobileSrch .form-control").focus();
  })

  $(".mobileSrch").focusout(function(){
    window.setTimeout(function() {
      $(".searchBtn").css("visibility", "visible");
      $(".mobileSrch").css("visibility", "hidden")
    }, 100);
  })

  if($(window).width() >= 600){
    $(".searchBtn").css("visibility", "hidden");
    $(".mobileSrch").focusout();
    $(".mobileSrch").hide();
  }

    $(window).scroll(function() {
        if($(this).scrollTop() != 0) {
            $('.Backtotop').fadeIn();
        } else {
            $('.Backtotop').fadeOut();
        }
    });

  $('.Backtotop').click(function() {
       $("html, body").animate({
           scrollTop: 0
       }, 1000);
   });

   // Get number of items stored in the cart
   $(".itemCount").html(CartItems.getItem("itemCount"));

   // Search Results

   // Search function
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

   var qv = window.location.search.substring(1,5);
   var queryVar = qv.trim();
   var query = window.location.search.substring(6);
   var bookSearch = decodeURIComponent(query.replace(/%20/g, " ").trim());
   var count = 0;

   if(queryVar === "book"){
      let json = JSON.parse(sessionStorage.getItem("json"));
      var isNotMatch = true;
      $.each(json.Books, function (index, element) {
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
          isNotMatch = false;
    		  count++;
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

   // Shopping Cart
   var subtotal = 0;
   shoppingCrtWorker.onmessage = function(event){
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
   }
   shoppingCrtWorker.postMessage("fetch");

   $(".hide-dialog-txt").hide();

   // Remove item from carta
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

   function deleteItem(e){
 	var item = e.attr("data-book-isbn");
 	var request = db.transaction("Books", "readwrite")
 		.objectStore("Books")
 		.delete(item);
 	request.onsuccess = function(event) {
 		// It's gone!
 		var cartVal = $(".itemCnt").html();
 	    $(".itemCnt").html(parseInt(cartVal) - 1);
 		$("div[data-id='"+item+"']").remove();
 	};
   }


  // Adds item to Cart on click
  $("div#bkinfo").delegate("button#cartBtn","click",function(event){
    var item = $(this).attr("data-book");

    cartWorker.onmessage = function(e){

      if(!Number.isNaN(parseInt(e.data))){
        var cartVal = $(".itemCnt").html();
        $(".itemCnt").html(parseInt(cartVal) + 1);
      }else {
        console.log(e.data);
      }
    }

    cartWorker.postMessage({Title: item, Json: JSON.stringify(jsonObj)});
  })

  // Add viewed item on click
  $("div#bookslib").delegate("div.viewedItem","click",function(){
      var item = $(this).attr("data-viewed-item");
      //let jsonObj = JSON.parse(sessionStorage.getItem("json"));
      viewedWorker.onmessage = function(e){
        console.log(e.data);
      }

      viewedWorker.postMessage({Title: item.toString(), Json: JSON.stringify(jsonObj)});

  })

  // Get recently viewed book
  getViewedWorker.onmessage = function(event){
    $('#recentViewed').show();
    $('#viewed')
      .trigger('add.owl.carousel', [event.data])
      .trigger('refresh.owl.carousel');
  }
  getViewedWorker.postMessage("fetch");


  // disable Cart's tooltip
  $('.cart').tooltip({
	 disabled: true,
	 //close: function( event, ui ) { $(this).tooltip('disable'); },
  });

  $(".cart").tooltip("disable");


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
