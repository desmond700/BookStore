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
  console.log("Service worker installed.");
  self.skipWaiting();
  if(!('caches' in self)) return;
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache){
        console.log("Opened cache");
        return cache.addAll(urlsToCache);
      })
   );
});

self.addEventListener("activate", (event) => {
  console.log("Service worker installed. "+ event);
})

self.addEventListener("fetch", function(event){
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).then((response) =>{
        console.log("fetched from network this time!");
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, response.clone());
          return response;
        })
      });
    })
  )
});
