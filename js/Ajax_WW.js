// javaScript Document

// Open indexedDB a database
var request = indexedDB.open("Library");
var db;
var count;

request.onsuccess = function(event) {
  console.log("DB request successful");
  db = event.target.result;
   var objectStore = db.transaction("Books").objectStore("Books");
   var countRequest = objectStore.count();
   countRequest.onsuccess = function(){
      count = countRequest.result;
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


self.onmessage = function(event){
  fetch("../data/books.json").then(response => {
    return response.json();
  }).then(json => {
    self.postMessage({Json: json, recordCount: count});
  })
}
