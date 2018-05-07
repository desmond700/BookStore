// Service Worker file

var CACHE_NAME = "my-site-cache-v1";
var urlsToCache = [
  "./books",
  "./book",
  "./shopping-cart",
  "./search",
  "./css/bootstrap.min.css",
  "./css/main.css",
  "./css/owl.carousel.min.css",
  "./css/owl.theme.css",
  "./data/books.json",
  "./include/footer.php",
  "./include/header.php",
  "./js/bootstrap.min.js",
  "./js/FetchWorker.js",
  "./js/main.js",
  "./js/ModWorker.js",
  "./js/owl.carousel.min.js",
  "./images/pexels-photo-326424.jpeg",
  "./images/Preloader_2.gif",
  "./images/bookcover/A_Brief_History_of_Time.jpg",
  "./images/bookcover/A_Mind_for_Numbers.jpg",
  "./images/bookcover/Astrophysics_for_People_in_a_Hurry.jpg",
  "./images/bookcover/Brave_New_World.jpg",
  "./images/bookcover/C++_how_to_program.png",
  "./images/bookcover/college_algera.jpg",
  "./images/bookcover/Effective_Java_.jpg",
  "./images/bookcover/Enlightenment_Now.jpg",
  "./images/bookcover/How_to_Solve_It.jpg",
  "./images/bookcover/In_Cold_Blood.jpg",
  "./images/bookcover/JavaScript_and_jQuery_.jpg",
  "./images/bookcover/JavaScript-The_Good_Parts_.jpg",
  "./images/bookcover/Linear_Algebra_Done_Right.jpg",
  "./images/bookcover/Nineteen_Eighty_Four.jpg",
  "./images/bookcover/Python_Crash_Course.jpg",
  "./images/bookcover/Silent_Spring.jpg",
  "./images/bookcover/Surely_You_re_Joking_Mr_Feynman.jpg",
  "./images/bookcover/The_Alchemist.jpg",
  "./images/bookcover/The_Double_Helix.jpg",
  "./images/bookcover/The_Immortal_Life_of_Henrietta_Lacks.jpg",
  "./images/bookcover/The_Power.jpg",
  "./images/bookcover/The_sea_inside.jpg",
  "./images/bookcover/the-da-vinci-code.jpg",
  "./images/bookcover/What_Is_Mathematics.jpg",
  "./images/bookcover/When_Breath_Becomes_Air.jpg"
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache){
        console.log("Opened cache");
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener("fetch", function(event){
  console.log('WORKER: fetch event in progress.');

  /* We should only cache GET requests, and deal with the rest of method in the
     client-side, by handling failed POST,PUT,PATCH,etc. requests.
  */
  if (event.request.method !== 'GET') {
    /* If we don't block the event as shown below, then the request will go to
       the network as usual.
    */
    console.log('WORKER: fetch event ignored.', event.request.method, event.request.url);
    return;
  }
  /* Similar to event.waitUntil in that it blocks the fetch event on a promise.
     Fulfillment result will be used as the response, and rejection will end in a
     HTTP response indicating failure.
  */
  event.respondWith(
    caches.match(event.request)
      .then(function(event){
        /* Even if the response is in our cache, we go to the network as well.
           This pattern is known for producing "eventually fresh" responses,
           where we return cached responses immediately, and meanwhile pull
           a network response and store that in the cache.
           Read more:
           https://ponyfoo.com/articles/progressive-networking-serviceworker
        */
        var networked = fetch(event.request)
          // We handle the network request with success and failure scenarios.
          .then(fetchedFromNetwork, unableToResolve)
          // We should catch errors on the fetchedFromNetwork handler as well.
          .catch(unableToResolve);

        /* We return the cached response immediately if there is one, and fall
           back to waiting on the network as usual.
        */
        console.log('WORKER: fetch event', cached ? '(cached)' : '(network)', event.request.url);
        return cached || networked;

        function fetchedFromNetwork(response) {
          /* We copy the response before replying to the network request.
             This is the response that will be stored on the ServiceWorker cache.
          */
          var cacheCopy = response.clone();

          console.log('WORKER: fetch response from network.', event.request.url);

          caches
            // We open a cache to store the response for this request.
            .open(CACHE_NAME)
            .then(function add(cache) {
              /* We store the response for this request. It'll later become
                 available to caches.match(event.request) calls, when looking
                 for cached responses.
              */
              cache.put(event.request, cacheCopy);
            })
            .then(function() {
              console.log('WORKER: fetch response stored in cache.', event.request.url);
            });

          // Return the response so that the promise is settled in fulfillment.
          return response;
        }

        /* When this method is called, it means we were unable to produce a response
           from either the cache or the network. This is our opportunity to produce
           a meaningful response even when all else fails. It's the last chance, so
           you probably want to display a "Service Unavailable" view or a generic
           error response.
        */
        function unableToResolve () {
          /* There's a couple of things we can do here.
             - Test the Accept header and then return one of the `offlineFundamentals`
               e.g: `return caches.match('/some/cached/image.png')`
             - You should also consider the origin. It's easier to decide what
               "unavailable" means for requests against your origins than for requests
               against a third party, such as an ad provider
             - Generate a Response programmaticaly, as shown below, and return that
          */

          console.log('WORKER: fetch request failed in both cache and network.');

          /* Here we're creating a response programmatically. The first parameter is the
             response body, and the second one defines the options for the response.
          */
          return new Response('<h1>Service Unavailable</h1>', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/html'
            })
          });
        }
      })

        /*if(response){
          return response;
        }

        // IMPORTANT: Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the response.
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response){
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== "basic"){
              return response;
            }

            // IMPORTANT: Clone the request. A request is a stream and
            // because we want the browser to consumed the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache){
                cache.put(event.request, responseToCache).catch((err) => {
                  console.warn(request.url + ': ' + err.message);
                });
              })
            return response;
          }*/
        );
      //})
    //);
});
