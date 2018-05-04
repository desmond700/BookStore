
      <?php $bookscript = "<script type='text/javascript' src='js/owl.carousel.min.js'></script>" ?>
      <?php $pageTitle = "Home" ?>
      <?php $homelinkactive = "active" ?>
      <?php require "include/header.php" ?>
      <div class="px-0 py-0">
        <div class="container ">
          <div class="row mb-3">
            <div class="d-flex col-md-12 bg-light mb-3" id="leftfold">
              <div class="d-flex container px-4 py-4 my-4 my-auto">
                  <div class="mx-auto col-md-6 py-4">
                    <div class="my-auto mx-auto text-white">
                      <h1>50% Percent off</h1>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum perspiciatis officiis ad quidem animi, debitis, perferendis autem provident impedit soluta?</p>
                      <button type="button" class="btn btn-primary">View</button>
                    </div>
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-between col-md-12 bg-dark px-4 py-2">
              <p class="my-auto text-white">FREE SHIPPING: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem, enim!</p>
              <form class="d-flex" action="index.html" method="post">
                <input type="input" class="form-control form-control-lg" name="specialOffer" placeholder="Enter email for special offers">
                <input type="submit" class="btn btn-danger ml-2" value="submit">
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="container mt-4">
        <section class="text-center">
          <h2 >Featured</h2>
          <hr>
          <div class="row">
            <div class="owl-carousel owl-theme" id="featured">
                <div class="item">
                  <div class="d-flex card overlay">
                    <img src="images/bookcover/Astrophysics_for_People_in_a_Hurry.jpg" class="img-responsive image" height="350" alt="">
                    <div class="align-self-end middle">
                      <div class="text">
                        Quick look
                      </div>
                    </div>
                  </div>
                </div>
                <div class="item">
                  <div class="d-flex card overlay">
                    <img src="images/bookcover/How_to_Solve_It.jpg" class="img-responsive image" height="350" alt="">
                    <div class="align-self-end middle">
                      <div class="text">
                        Quick look
                      </div>
                    </div>
                  </div>
                </div>
                <div class="item">
                  <div class="item">
                    <div class="d-flex card overlay">
                      <img src="images/bookcover/Enlightenment_Now.jpg" class="img-responsive image" height="350" alt="">
                      <div class="align-self-end middle">
                        <div class="text">
                          Quick look
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="item">
                  <div class="item">
                    <div class="d-flex card overlay">
                      <img src="images/bookcover/A_Brief_History_of_Time.jpg" class="img-responsive image" height="350" alt="">
                      <div class="align-self-end middle">
                        <div class="text">
                          Quick look
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="item">
                  <div class="item">
                    <div class="d-flex card overlay">
                      <img src="images/bookcover/A_Mind_for_Numbers.jpg" class="img-responsive image" height="350" alt="">
                      <div class="align-self-end middle">
                        <div class="text">
                          Quick look
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="item">
                  <div class="item">
                    <div class="d-flex card overlay">
                      <img src="images/bookcover/How_to_Solve_It.jpg" class="img-responsive image" height="350" alt="">
                      <div class="align-self-end middle">
                        <div class="text">
                          Quick look
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </section>
        <section class="mt-5" id="recentViewed">
          <h3 class='text-center'>Your Recently Viewed Items</h3>
          <hr>
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
