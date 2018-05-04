
<?php $bookslinkactive = "active" ?>
<?php $pageTitle = "Books" ?>
<?php require "include/header.php" ?>
      <div class="container">
        <section class="mt-4">
          <div class="d-flex card-body px-0 pt-0 pb-0">
            <div class="d-flex col-md-3 px-0">
              <ul class="breadcrumb mt-auto mb-auto">
               <li class="breadcrumb-item"><a href="./">Home</a></li>
               <li class="breadcrumb-item active"><a href="./books">Books</a></li>
               <li class="breadcrumb-item active" id="bkgenre">All</li>
              </ul>
            </div>
            <div class="d-flex justify-content-between col-10 col-sm-8 col-md-5 col-lg-3">
              <label class=" mr-2 mt-auto mb-auto">Genre:</label>
              <select id="genreSel" class="form-control form-control-sm mt-auto mb-auto" onchange="getVal(this.value)">
                <option value="All">All</option>
                <option value="Technology">Technology</option>
                <option value="Science">Science</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Fiction">Fiction</option>
                <option value="Mathematics">Mathematics</option>
              </select>
            </div>
          </div>
        </section>
      <section class="card mt-4">
        <div class="card-body" >
          <div class="container">
            <div class="row" id="bookslib">

            </div>
          </div>

        </div>
      </section>
    </div>
        <?php require "include/footer.php" ?>
    </div>
</body>
</html>
