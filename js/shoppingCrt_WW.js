// Web Worker Document

// Open a database
var request = indexedDB.open("Library");
var db;

self.onmessage = function(event){
  request.onsuccess = function(event) {
  	db = event.target.result;
  	getBook();
  };

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
    var titleIndex = objectStore.createIndex("by_title", "title", {unique: true});
    var authorIndex = objectStore.createIndex("by_author", "author");
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
        });
	      cursor.continue();
    }
    else {
      //alert("No more entries!");
    }
  }
}
