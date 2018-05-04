
<?php $pageTitle = (string)$_GET["title"]; ?>
<?php $bookscript = "<script src='js/book.js'></script>" ?>
<?php require "include/header.php" ?>
      <div class="container mt-4">
        <section>
          <div class="d-flex px-0">
            <ul class="breadcrumb mt-auto mb-auto">
             <li class="breadcrumb-item"><a href="./">Home</a></li>
             <li class="breadcrumb-item"><a href="./books">Books</a></li>
             <li class="breadcrumb-item"><a href="" id="genrelink"></a></li>
             <li class="breadcrumb-item active" id="activebook"></li>
            </ul>
          </div>
        </section>
      <section class="card mt-4">
        <div class="card-body" >
          <div class="container">
            <div class="row">
              <div class="card mr-4" id="bkimg"></div>
              <div class="col-md-6" id="bkinfo"></div>
            </div>
            <div class="col-sm-12" id="bkdesc"></div>
          </div>
        </div>
      </section>
    </div>
      <?php require "include/footer.php" ?>
    </div>
</body>
</html>