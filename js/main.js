
$(function(){

  var worker = new Worker("js/webWorker.js");


  var jsonObj;
  var genre = "";
  var hashVal = window.location.hash.substring(1);

  fetch("data/books.json").then((response) => {
      response.json().then((json) => {
        jsonObj = json;
        window.sessionStorage.setItem("json", JSON.stringify(json));

        $.each(json.Books, function (index, element) {
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
      });

      if(hashVal != "")
        $("select#genreSel").val(hashVal).trigger( "change" );

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


 // IndexedDB
  if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
  }

   // Open indexedDB a database
  var request = window.indexedDB.open("Library");
  var db;

  request.onsuccess = function(event) {
     console.log("DB request successful");
     db = event.target.result;
     	var objectStore = db.transaction("Books").objectStore("Books");
     	var countRequest = objectStore.count();
      countRequest.onsuccess = function(){
   		   $("i.itemCnt,span.itemCnt").html(countRequest.result);
   	  }
      getBooksViewed();
  }

  request.onerror = function(event) {
	// Generic error handler for all errors targeted at this database's
	// requests!
	alert("Database error: " + event.target.errorCode);
  };

  // This event is only implemented in recent browsers
  request.onupgradeneeded = function(event) {
    // Save the IDBDatabase interface
    var db = event.target.result;

    // Create an objectStore for this database
    var objectStore = db.createObjectStore("Books", { keyPath: "ISBN"});
    // Create an objectStore for this database
    var booksViewedObjectStore = db.createObjectStore("BooksViewed", { keyPath: "ISBN"});
  }


  // Adds item to Cart on click
  $("div#bkinfo").delegate("button#cartBtn","click",function(event){
	  let json = JSON.parse(sessionStorage.getItem("json"));
    var item = $(this).attr("data-book");
    var cartData;

    $.each(json.Books, function (index, element) {
      if(item == element.Title){
        cartData = {
          ISBN: element.ISBN,
          title: element.Title,
          author: element.Author,
    		  language: element.Language,
    		  price: element.Price,
          bookType: element["Book Type"],
          img: element.img
        }
      }
    })

	  // open a read/write db transaction, ready to add data
	  var transaction = db.transaction(["Books"], "readwrite");

	  // report on the success of opening the transaction
	  transaction.oncomplete = function(event) {
  		//note.innerHTML += '<li>Transaction completed: database modification finished.</li>';
      var cartVal = $(".itemCnt").html();
  		$(".itemCnt").html(parseInt(cartVal) + 1);
  		console.log("Transaction completed: database modification finished.");
	  };

	  transaction.onabort = function(event){
		  console.log("Transaction aborted");
	  }

	  transaction.onerror = function(event) {
  	  //note.innerHTML += '<li>Transaction not opened due to error. Duplicate items not allowed.</li>';
      alert("Item already added to cart");
  		console.log("Transaction not opened due to error. Duplicate items not allowed");
	  };

	  // create an object store on the transaction
	  var objectStore = transaction.objectStore("Books");

	  // add our newItem object to the object store
	  var objectStoreRequest = objectStore.add(cartData);

	  objectStoreRequest.onsuccess = function(event) {
  		// report the success of the request (this does not mean the item
  		// has been stored successfully in the DB - for that you need transaction.oncomplete)
  		//note.innerHTML += '<li>Request successful.</li>';
      console.log("Request successful.");

  		//$(".cart").tooltip('enable').tooltip('open');
	  };

	  // handles errors that may arise
	  objectStoreRequest.onerror = function(){
		  console.log("adding to object store failed");
	  }
  })


  // Get recently viewed book
  function getBooksViewed(){
    var objectStore = db.transaction(["BooksViewed"]).objectStore("BooksViewed");
    var viewCount = objectStore.count();
    viewCount.onsuccess = function(){
      console.log("count request successful: " + viewCount.result);
      if(viewCount.result > 0){
        $('#recentViewed').show();
        objectStore.openCursor().onsuccess = function(event){
          var cursor = event.target.result;
          if(cursor){
            $('#viewed')
              .trigger('add.owl.carousel', [
                '<div class="card item mb-3">'+
                '<div class="card-body">'+
                '<p class="txtg"><a href="./book?title='+cursor.value.title+'"><img src="images/bookcover/'+cursor.value.img+'" height="248" /><a/></p>'+
                '<p class="txt"><a href="./book?title='+cursor.value.title+'">'+cursor.value.title+'</a></p>'+
                '<p class="txtg font-weight-bold">'+cursor.value.author+'</p>'+
                '<p class="txtg">'+cursor.value.bookType+'</p>'+
                '<p class="txtg text-danger">CDN$ '+cursor.value.price+'</p>'+
                '</div>'+
                '</div>'
              ])
              .trigger('refresh.owl.carousel');

            cursor.continue();
          }
        }
      }
    }
    viewCount.onerror = function(){
      console.log("count request unsuccessful");
    }
    console.log("get viewed books" + viewCount);

  }


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


    // Viewed item event handler
    $("div#bookslib").delegate("div.viewedItem","click",function(){
      var item = $(this).attr("data-viewed-item");
      //let jsonObj = JSON.parse(sessionStorage.getItem("json"));
      worker.postMessage(item);
      worker.onmessage = function(e){
        console.log("From worker. Item sent: "+e.data);
      }

    })

    $(".se-pre-con").stop().fadeOut(600);
})
