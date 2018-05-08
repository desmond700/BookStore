// javaScript Document

// Open indexedDB a database
var db;
var count;

self.onmessage = function(e){

  var request = indexedDB.open("Library");
//self.postMessage(e.data);

  request.onsuccess = function(event) {
    self.postMessage("e.data");
    db = event.target.result;

     var objectStore = db.transaction("Books").objectStore("Books");
     var countRequest = objectStore.count();
     countRequest.onsuccess = function(){
       //self.postMessage("e.data");
        count = countRequest.result;

        if(e.data.message === "fetch json"){
          fetch("../data/books.json").then(response => {
            return response.json();
          }).then(json => {
            self.postMessage({Json: json, recordCount: count});
          })
        }
        else if(e.data.message === "fetch cart items")
          getBook();
        else if(e.data.message === "fetch viewed")
          getViewedItem()

      }
   }
   request.onerror = function(event) {
     // Generic error handler for all errors targeted at this database's
     // requests!
     self.postMessage("Database error: " + event.target.errorCode);
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
}







function getBook() {
  var objectStore = db.transaction("Books").objectStore("Books");
  objectStore.openCursor().onsuccess = function(event) {
    var cursor = event.target.result;
    if (cursor) {
	      self.postMessage({
          title: cursor.value.title,
          author: cursor.value.author,
          key: cursor.key,
          price: cursor.value.price,
          language: cursor.value.language,
          bookType: cursor.value.bookType,
          img: cursor.value.img,
          recordCount: count
        });
	      cursor.continue();
    }
    else {
      //alert("No more entries!");
    }
  }
}


function getViewedItem(){
  var objectStore = db.transaction(["BooksViewed"]).objectStore("BooksViewed");
  var viewCount = objectStore.count();
  viewCount.onsuccess = function(){

    if(viewCount.result > 3){
      objectStore.openCursor().onsuccess = function(event){
        var cursor = event.target.result;
        if(cursor){

          var content = '<div class="card item mb-3">'+
          '<div class="card-body">'+
          '<p class="txtg"><a href="./book?title='+cursor.value.title+'"><img src="images/bookcover/'+cursor.value.img+'" height="248" /><a/></p>'+
          '<p class="txt"><a href="./book?title='+cursor.value.title+'">'+cursor.value.title+'</a></p>'+
          '<p class="txtg font-weight-bold">'+cursor.value.author+'</p>'+
          '<p class="txtg">'+cursor.value.bookType+'</p>'+
          '<p class="txtg text-danger">CDN$ '+cursor.value.price+'</p>'+
          '</div>'+
          '</div>';

          self.postMessage({
            owlAdd: content,
            recordCount: count
          })

          cursor.continue();
        }
      }
    }
  }
  viewCount.onerror = function(){
    self.postMessage("count request unsuccessful");
  }
}
