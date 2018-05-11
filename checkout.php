<?php $pageTitle = "Checkout" ?>
<?php require "include/header.php" ?>
      <div class="container">
	  <section class="mt-4">
			<div class="col-12 col-md-4 pl-0">
        <ul class="col-sm-12 breadcrumb mt-auto mb-auto">
         <li class="breadcrumb-item"><a href="./shopping-cart"><i class="fa fa-shopping-cart" style="font-size:28px"></i></a></li>
         <li class="breadcrumb-item active">Checkout</li>
        </ul>
			</div>
      </section>
      <section class="card mt-4">

          <div class="col-sm-12"><hr></div>
        <div class="container">
          <div class="row" id="spcrt">
            <div class="col-md-8">
              <h3 class="text-center mb-0 py-4">Secure checkout</h3>
              <div id="accordion">
              <h3>Step 1: Billing Address</h3>
              <div>
                <form class="" action="index.html" method="post">
                  <div class="container-fluid">
                    <div class="row">
                      <div class="col-md-6 mt-4">
                        <label for="">FirstName:<span class="text-danger">*</span></label><br>
                        <input type="text" class="form-control form-control-sm" placeholder="">
                      </div>
                      <div class="col-md-6 mt-4">
                        <label for="">LastName:<span class="text-danger">*</span></label><br>
                        <input type="text" class="form-control form-control-sm" placeholder="">
                      </div>
                      <div class="col-md-6 mt-4">
                        <label for="">Email Address:<span class="text-danger">*</span></label><br>
                        <input type="text" class="form-control form-control-sm" placeholder="">
                      </div>
                      <div class="col-md-6 mt-4">
                        <label for="">Telephone:<span class="text-danger">*</span></label><br>
                        <input type="text" class="form-control form-control-sm" placeholder="">
                      </div>
                      <div class="col-md-12 mt-4">
                        <label for="">Address:<span class="text-danger">*</span></label><br>
                        <input type="text" class="form-control form-control-sm" placeholder="">
                      </div>
                      <div class="col-md-12 mt-4">
                        <input type="text" class="form-control form-control-sm" placeholder="">
                      </div>
                      <div class="col-md-6 mt-4">
                        <label for="">City:<span class="text-danger">*</span></label><br>
                        <input type="text" class="form-control form-control-sm" placeholder="">
                      </div>
                      <div class="col-md-6 mt-4">
                        <label for="">Postcode:<span class="text-danger">*</span></label>
                        <input type="text" class="form-control form-control-sm" name="" value="">
                      </div>
                      <div class="col-md-12 mt-4">
                        <label for="">Country:<span class="text-danger">*</span></label>
                        <select class="form-control form-control-sm" name="">

                        </select>
                      </div>
                      <div class="col-md-12">

                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <h3>Step 2: Shipping Method</h3>
              <div>
                <div class=" d-flex col-md-12">
                  <div class="form-check col-md-6">
                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                    <label class="form-check-label" for="defaultCheck1">
                      Regular(1-6 wks, no tracking)
                    </label>
                  </div>
                  <div class="col-md-6">$8.00</div>
                </div>
                <div class="d-flex col-md-12 mt-4">
                  <div class="form-check col-md-6">
                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                    <label class="form-check-label" for="defaultCheck1">
                      Express(2-8 days, tracking)
                    </label>
                  </div>
                  <div class="col-md-6">$14.00</div>
                </div>
              </div>
              <h3>Step 3: Payment Method</h3>
              <div>
                <div class="d-flex col-md-12 mt-4">
                  <div class="form-check col-md-6">
                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                    <label class="form-check-label" for="defaultCheck1">
                      Credit Card
                    </label>
                  </div>
                  <div class="col-md-6">$14.00</div>
                </div>
                <form class="mt-4" action="index.html" method="post">
                  <label for="">Credit Card Type:<span class="text-danger">*</span></label><br>
                  <input type="text" class="form-control form-control-sm">
                  <label for=""  class="mt-4">Credit Card Number:<span class="text-danger">*</span></label><br>
                  <input type="text" class="form-control form-control-sm">
                  <label for="" class="mt-4">Expiry Date:<span class="text-danger">*</span></label><br>
                  <input type="text" class="form-control form-control-sm">
                  <label for="" class="mt-4">Card Verification Number:<span class="text-danger">*</span></label><br>
                  <input type="text" class="form-control form-control-sm">
                </form>

                <div class="d-flex col-md-12 mt-4">
                  <div class="form-check col-md-6">
                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                    <label class="form-check-label" for="defaultCheck1">
                      PayPal Express Checkout
                    </label>
                  </div>
                  <div class="col-md-6">$14.00</div>
                </div>
              </div>
              <h3>Step 4: Review Order</h3>
              <div>

              </div>
            </div>
            </div>
            <div class="col-md-4">
              <h3 class="text-center mb-0 py-4"><i class="fa fa-shopping-cart"></i>(<span>0</span> items)</h3>
            </div>
    			</div>
        </div>
      </section>
    </div>
    <?php require "include/footer.php" ?>
  </div>
</body>
</html>
