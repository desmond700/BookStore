
<?php $bookslinkactive = "active" ?>
<?php $pageTitle = "Books" ?>
<?php require "include/header.php" ?>
      <div class="container">
        <section class="mt-4">
          <div class="container px-0 py-0">
            <div class="row justify-content-between px-3">
              <div class="d-flex col-sm-12 col-md-3 my-1 px-0">
                <ul class="col-sm-12 breadcrumb mt-auto mb-auto">
                 <li class="breadcrumb-item"><a href="./">Home</a></li>
                 <li class="breadcrumb-item active"><a href="./books">Books</a></li>
                 <li class="breadcrumb-item active" id="bkgenre">All</li>
                </ul>
              </div>
              <div class="d-flex justify-content-center col-sm-12 col-md-6 col-lg-3 px-0 my-1">
                <div class="d-flex col-md-12 px-0">
                  <label class="mr-2 my-auto">Genre:</label>
                  <select id="genreSel" class="form-control form-control-sm mt-auto mb-auto">
                    <option value="All">All</option>
                    <option value="Technology">Technology</option>
                    <option value="Science">Science</option>
                    <option value="Non-Fiction">Non-Fiction</option>
                    <option value="Fiction">Fiction</option>
                    <option value="Mathematics">Mathematics</option>
                  </select>
                </div>
              </div>
              <div class="d-flex col-md-2 justify-content-end px-0">
                <p class="my-auto">Entries: <span class="bkCount">0</span></p>
              </div>
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
