// javaScript Document


// Worker response
self.onmessage = function(e){
  var title = e.data.Title;
  var json = JSON.parse(e.data.Json);
  storeViewedItem(title, json)
}

// Open indexedDB a database
var request = indexedDB.open("Library");
var db;

request.onsuccess = function(event) {
  db = event.target.result;
}

// This event is only implemented in recent browsers
request.onupgradeneeded = function(event) {
 // Save the IDBDatabase interface
 var db = event.target.result;

 // Create an objectStore for this database
 var objectStore = db.createObjectStore("Books", { keyPath: "ISBN"});
 // Create an objectStore for this database
 var booksViewedObjectStore = db.createObjectStore("BooksViewed", { keyPath: "ISBN"});
}

function storeViewedItem(item, json){
  var viewedData;
  json.Books.forEach(function (element) {
    if(item === element.Title){
      viewedData = {
        ISBN: element.ISBN,
        title: element.Title,
        author: element.Author,
        bookType: element["Book Type"],
        price: element.Price,
        img: element.img,
      }
    }
  })

  // open a read/write db transaction, ready to add data
  var transaction = db.transaction(["BooksViewed"], "readwrite");

  // report on the success of opening the transaction
  transaction.oncomplete = function(event) {
    //note.innerHTML += '<li>Transaction completed: database modification finished.</li>';

    self.postMessage("Transaction completed: database modification finished.");
  };

  transaction.onabort = function(event){
    self.postMessage("Transaction aborted");
  }

  transaction.onerror = function(event) {
    //note.innerHTML += '<li>Transaction not opened due to error. Duplicate items not allowed.</li>';
    self.postMessage("Transaction not opened due to error. Duplicate items not allowed");
  };

  // create an object store on the transaction
  var objectStore = transaction.objectStore("BooksViewed");

  // add our newItem object to the object store
  var objectStoreRequest = objectStore.add(viewedData);

  objectStoreRequest.oncomplete = function(event) {
    // report the success of the request (this does not mean the item
    // has been stored successfully in the DB - for that you need transaction.oncomplete)
    self.postMessage("Transaction completed successfully. Item stored in database.");
  };

  // handles errors that may arise
  objectStoreRequest.onerror = function(){
    self.postMessage("adding to object store failed");
  }
}
