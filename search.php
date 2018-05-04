
<?php $pageTitle = "Books" ?>
<?php require "include/header.php" ?>
      <div class="jumbotron" id="jumbotronID">
        <div class="container">
          <h1>Bootstrap Tutorial</h1>
          <p>Bootstrap is the most popular HTML, CSS...</p>
        </div>
      </div>
      <div class="container">
        <section class="card bg-light">
			<h2 class="card-header text-center">(<span id="srchCnt">0</span>) Search Results</span></h2>
        </section>
      <section class="card mt-4">
        <div class="card-body" >
          <div class="container">
            <div class="row" id="srchRslt"></div>
          </div>
        </div>
      </section>
    </div>
        <?php require "include/footer.php" ?>
    </div>
</body>
</html>
