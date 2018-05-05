// javaScript Document

//var json;

//loadDoc();

/*function asyncFn(){
  const works = true;
  return new Promise(function(resolve, reject){
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          json = this.responseText;
         }
      };
      xhttp.open("GET", "../data/books.json", true);
      xhttp.send();
      if(works){
        resolve(json);
      }else{
        reject("Request failed.");
      }
    });
}*/


self.onmessage = function(e){
  var item = e.data;
  //self.postMessage(e.data);
  fetch("../data/books.json").then((response) => {
    response.json().then((json) => {
      self.postMessage(json.Books[0].Title);
      storeViewedItem(item, json)
    })
  })
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

    console.log("Transaction completed: database modification finished.");
  };

  transaction.onabort = function(event){
    console.log("Transaction aborted");
  }

  transaction.onerror = function(event) {
    //note.innerHTML += '<li>Transaction not opened due to error. Duplicate items not allowed.</li>';
    console.log("Transaction not opened due to error. Duplicate items not allowed");
  };

  // create an object store on the transaction
  var objectStore = transaction.objectStore("BooksViewed");

  // add our newItem object to the object store
  var objectStoreRequest = objectStore.add(viewedData);

  objectStoreRequest.onsuccess = function(event) {
    // report the success of the request (this does not mean the item
    // has been stored successfully in the DB - for that you need transaction.oncomplete)
    console.log("objectStore Request successful.");
  };

  // handles errors that may arise
  objectStoreRequest.onerror = function(){
    console.log("adding to object store failed");
  }
}