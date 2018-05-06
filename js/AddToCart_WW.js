// JavaScript Document

// Worker response
self.onmessage = function(e){
  var title = e.data.Title;
  var json = JSON.parse(e.data.Json);
  addToCart(title, json)
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

function addToCart(item, json){
  var cartData;
  json.Books.forEach(function (element) {
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

    self.postMessage(1);
  };

  transaction.onabort = function(event){
    self.postMessage("Transaction aborted");
  }

  transaction.onerror = function(event) {
    //note.innerHTML += '<li>Transaction not opened due to error. Duplicate items not allowed.</li>';
    console.info("Item already added to cart");
    self.postMessage("Transaction not opened due to error. Duplicate items not allowed");
  };

  // create an object store on the transaction
  var objectStore = transaction.objectStore("Books");

  // add our newItem object to the object store
  var objectStoreRequest = objectStore.add(cartData);

  objectStoreRequest.onsuccess = function(event) {
    // report the success of the request (this does not mean the item
    // has been stored successfully in the DB - for that you need transaction.oncomplete)
    //note.innerHTML += '<li>Request successful.</li>';
    self.postMessage("Request successful.");

    //$(".cart").tooltip('enable').tooltip('open');
  };

  // handles errors that may arise
  objectStoreRequest.onerror = function(){
    self.postMessage("adding to object store failed");
  }
}
