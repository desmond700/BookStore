<?php $bookscript = "<script src='js/shopping-cart.js'></script>" ?>
<?php $pageTitle = "Shopping-Cart" ?>
<?php require "include/header.php" ?>
      <div class="container">
	  <section class="mt-4">
			<div class="d-flex justify-content-between">
			  <h3 class="pb-0">Shopping Cart <i class="fa fa-shopping-cart" style="font-size: 28px"></i></h3>
			  <div class="d-flex">
				<button class="btn btn-warning">Checkout</button>
				<div class=" d-flex h-100 pb-0 mt-auto mb-auto ml-2 font-weight-bold" style="border-left:1px solid #000">
					<p class="mt-auto mb-auto ml-2">Subtotal(<span class="itemCnt">0</span> items): <span class="text-danger">CDN$ <span class="subtl">0</span></span></p>
				</div>
			  </div>
			</div>
      </section>
      <section class="card mt-4">
        <div class="card-body" >
          <div class="container">
            <div class="row" id="spcrt">
				<div id="dialog-confirm" class="hide-dialog-txt" title="Delete item?">
				  <p><span class="ui-icon ui-icon-alert" style="float:left; margin:12px 12px 20px 0;"></span>This item will be permanently deleted and cannot be recovered. Are you sure?</p>
				</div>
            </div>
			<div class="row">
			   <div class="d-flex justify-content-end col-md-12">
				  <p class="mt-auto mb-auto font-weight-bold">Subtotal: <span class="text-danger">CDN$ <span class="subtl">0</span></span></p>
			   </div>
			</div>
          </div>
        </div>
      </section>
    </div>
    <?php require "include/footer.php" ?>
  </div>
</body>
</html>
