// JavaScript Document

$(function(){
  // Open a database
  var request = window.indexedDB.open("Library");
  var db;

  
  // This event is only implemented in recent browsers
  request.onupgradeneeded = function(event) {
	  // Save the IDBDatabase interface
	  var db = event.target.result;

	  // Create an objectStore for this database
	  var objectStore = db.createObjectStore("Books", { keyPath: "ISBN"});
	  var titleIndex = objectStore.createIndex("by_title", "title", {unique: true});
	  var authorIndex = objectStore.createIndex("by_author", "author");
  }

  request.onsuccess = function(event) {
	db = event.target.result;
	getBook();
  };

  request.onerror = function(event) {
	// Generic error handler for all errors targeted at this database's
	// requests!
	alert("Database error: " + event.target.errorCode);
  };

  
  
  function getBook() {
    var objectStore = db.transaction("Books").objectStore("Books");
	var subtotal = 0;
   objectStore.openCursor().onsuccess = function(event) {
      var cursor = event.target.result;
      if (cursor) {
		var small = $("<small />").append(" by " + cursor.value.author);
        var title = $("<p class='txtg'></p>").append($("<strong />").text(cursor.value.title), small);
		var language = $("<p class='txtg'></p>").append(cursor.value.language);
        var bookType = $("<p class='txtg'></p>").append(cursor.value.bookType);
        var price = $("<p class='txtg text-danger'></p>").append("CDN$ "+cursor.value.price);
		var quantity = $("<p class='txtg'></p>").append("Qty: 1");
		var img = $("<img />").attr("src","images/bookcover/"+cursor.value.img)
							  .attr("clsss","")
		                      .width("100");  
		var deleteBtn = $("<button class='btn btn-danger ml-auto mt-auto' id='deleItem' data-book-isbn='"+cursor.key+"'></button>").text("delete");
        var imgDiv = $("<div class=' col-12 col-sm-3 col-md-3 col-lg-2 mr-0'></div>").append(img);
		var infoDiv = $("<div class='d-flex flex-column col-12 col-sm-9 col-md-9 col-lg-10'></div>").append(title,bookType,language,price,quantity,deleteBtn);
		var row = $("<div class='row'></div>").append(imgDiv, infoDiv);
		var parentDiv = $("<div class='card col-md-12 pt-3 pb-3 mb-3' data-id='"+cursor.key+"'></div>").append(row);
		subtotal += parseFloat(cursor.value.price);
		$("#spcrt").append(parentDiv);
		$("span.subtl").html(subtotal.toFixed(2));
		cursor.continue();
      }
      else {
        //alert("No more entries!");
      }
    }
  }
  
  $(".hide-dialog-txt").hide();
  
  // Delete item from database
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
  
})
