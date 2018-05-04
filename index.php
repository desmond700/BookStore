
      <?php $bookscript = "<script type='text/javascript' src='js/owl.carousel.min.js'></script>" ?>
      <?php $pageTitle = "Home" ?>
      <?php $homelinkactive = "active" ?>
      <?php require "include/header.php" ?>
      <div class="card px-0 py-0" style="height:700">
        <div class="container-fluid py-3">
          <div class="row pl-3">
            <div class="d-flex col-md-8 bg-info" id="leftfold">
              <div class="container px-4 py-4 my-auto">
                <div class="row">
                  <div class="d-flex col-md-6">
                    <p class="mx-auto"><img src="images/bookcover/Python_Crash_Course.jpg" class="img-responsive" height="290" alt=""></p>
                  </div>
                  <div class="d-flex flex-column col-md-6">
                    <div class="my-auto">
                      <h1>50% Percent off</h1>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum perspiciatis officiis ad quidem animi, debitis, perferendis autem provident impedit soluta?</p>
                      <button type="button" class="btn btn-primary">View</button>
                    </div>

                  </div>
                </div>
              </div>

            </div>
            <div class="col-md-4 border-left" id="rightfold">
              <div id="tabs">
                  <ul>
                    <li><a href="#tabs-1">Nunc tincidunt</a></li>
                    <li><a href="#tabs-2">Proin dolor</a></li>
                    <li><a href="#tabs-3">Aenean lacinia</a></li>
                  </ul>
                  <div id="tabs-1">
                    <p>Proin elit arcu, rutrum commodo, vehicula tempus, commodo a, risus. Curabitur nec arcu. Donec sollicitudin mi sit amet mauris. Nam elementum quam ullamcorper ante. Etiam aliquet massa et lorem. Mauris dapibus lacus auctor risus. Aenean tempor ullamcorper leo. Vivamus sed magna quis ligula eleifend adipiscing. Duis orci. Aliquam sodales tortor vitae ipsum. Aliquam nulla. Duis aliquam molestie erat. Ut et mauris vel pede varius sollicitudin. Sed ut dolor nec orci tincidunt interdum. Phasellus ipsum. Nunc tristique tempus lectus.</p>
                  </div>
                  <div id="tabs-2">
                    <p>Morbi tincidunt, dui sit amet facilisis feugiat, odio metus gravida ante, ut pharetra massa metus id nunc. Duis scelerisque molestie turpis. Sed fringilla, massa eget luctus malesuada, metus eros molestie lectus, ut tempus eros massa ut dolor. Aenean aliquet fringilla sem. Suspendisse sed ligula in ligula suscipit aliquam. Praesent in eros vestibulum mi adipiscing adipiscing. Morbi facilisis. Curabitur ornare consequat nunc. Aenean vel metus. Ut posuere viverra nulla. Aliquam erat volutpat. Pellentesque convallis. Maecenas feugiat, tellus pellentesque pretium posuere, felis lorem euismod felis, eu ornare leo nisi vel felis. Mauris consectetur tortor et purus.</p>
                  </div>
                  <div id="tabs-3">
                    <p>Mauris eleifend est et turpis. Duis id erat. Suspendisse potenti. Aliquam vulputate, pede vel vehicula accumsan, mi neque rutrum erat, eu congue orci lorem eget lorem. Vestibulum non ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce sodales. Quisque eu urna vel enim commodo pellentesque. Praesent eu risus hendrerit ligula tempus pretium. Curabitur lorem enim, pretium nec, feugiat nec, luctus a, lacus.</p>
                    <p>Duis cursus. Maecenas ligula eros, blandit nec, pharetra at, semper at, magna. Nullam ac lacus. Nulla facilisi. Praesent viverra justo vitae neque. Praesent blandit adipiscing velit. Suspendisse potenti. Donec mattis, pede vel pharetra blandit, magna ligula faucibus eros, id euismod lacus dolor eget odio. Nam scelerisque. Donec non libero sed nulla mattis commodo. Ut sagittis. Donec nisi lectus, feugiat porttitor, tempor ac, tempor vitae, pede. Aenean vehicula velit eu tellus interdum rutrum. Maecenas commodo. Pellentesque nec elit. Fusce in lacus. Vivamus a libero vitae lectus hendrerit hendrerit.</p>
                  </div>
                </div>
              </div>

            </div>
        </div>

          <div class="d-flex justify-content-between col-md-12 bg-dark px-4 py-2">
            <p class="my-auto">FREE SHIPPING: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem, enim!</p>
            <form class="d-flex" action="index.html" method="post">
              <input type="input" class="form-control form-control-lg" name="specialOffer" placeholder="Enter email for special offers">
              <input type="submit" class="btn btn-danger ml-2" value="submit">
            </form>
          </div>
        </div>
      </div>
      <div class="container">
        <section class="card">
          <h2 class="card-header text-center">Featured</h2>
          <div class="row">
            <div class="owl-carousel owl-theme" id="featured">
                <div class="item"><h4>1</h4></div>
                <div class="item"><h4>2</h4></div>
                <div class="item"><h4>3</h4></div>
                <div class="item"><h4>4</h4></div>
                <div class="item"><h4>5</h4></div>
                <div class="item"><h4>6</h4></div>
                <div class="item"><h4>7</h4></div>
                <div class="item"><h4>8</h4></div>
                <div class="item"><h4>9</h4></div>
                <div class="item"><h4>10</h4></div>
                <div class="item"><h4>11</h4></div>
                <div class="item"><h4>12</h4></div>
            </div>
          </div>
        </section>
        <section class="card mt-5" id="recentViewed">
          <h3 class='card-header text-center'>Your Recently Viewed Items</h3>
          <div class='row px-4 py-4'>
            <div class='owl-carousel owl-theme mb-3' id='viewed'></div>
          </div>
        </section>
      </div>
    <?php require "include/footer.php" ?>
    </div>
    <script type="text/javascript">
      $(function() {
        var featured = $('#featured');
        var viewed = $('#viewed');

        featured.owlCarousel({
          margin: 10,
          nav: true,
          loop: true,
          responsive: {
            0: {
              items: 1
            },
            600: {
              items: 3
            },
            1000: {
              items: 5
            }
          }
        })

        viewed.owlCarousel({
          margin: 10,
          nav: true,
          loop: true,
          autoplay:true,
          autoplayTimeout:2000,
          autoplayHoverPause:true,
          responsive: {
            0: {
              items: 1
            },
            600: {
              items: 3
            },
            1000: {
              items: 5
            }
          }
        })
      })
    </script>
</body>
</html>
