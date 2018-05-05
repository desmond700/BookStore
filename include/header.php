<!Doctype html>
<html lang="en">
<head>
  <title><?php echo $pageTitle ?> - Book-Store</title>
  <meta charset="UTF-8">
  <meta name="description" content="Free Web tutorials">
  <meta name="keywords" content="HTML,CSS,XML,JavaScript">
  <meta name="author" content="Desmond Wallace">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="css/main.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-social/5.1.1/bootstrap-social.css" />
  <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
  <!-- Owl carousel minified CSS -->
  <link rel="stylesheet" href="css/owl.carousel.min.css" />
  <link rel="stylesheet" href="css/owl.theme.css" />
  <!-- Latest compiled and minified CSS -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
  <!-- jQuery library -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
  <!-- Popper JS -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js"></script>
  <!-- Latest compiled JavaScript -->
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>
  <script type="text/javascript" src="js/main.js"></script>
  <?php if(isset($bookscript)) echo $bookscript; ?>
</head>
<body>
  <div class="se-pre-con"></div>
    <div class="container-fluid px-0">
      <header class="d-flex head bg-dark px-3">
          <form class="d-flex mobileSrch container-fluid mt-2" action="search.php">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text"><i class="fa fa-arrow-left"></i></span>
              </div>
              <input class="form-control mr-2 tags" type="search" name="book" placeholder="search Book-Store" />
              <button id="sBtn" class="btn btn-outline-light" type="submit">Search</button>
            </div>
          </form>
        <h1 class="text-white">Book-Store</h1>
        <div class="display bg-dark" id="searchBar">
          <form class="form-inline my-2 my-lg-0 search" action="search.php">
            <input class="form-control mr-sm-2 tags" type="search" name="book" placeholder="Search Book-Store" aria-label="Search">
            <button class="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
        <button class="searchBtn btn btn-outline-light" type="button" data-toggle="display" data-target="#searchBar" aria-controls="searchBar" aria-expanded="false" aria-label="Toggle navigation">
          <div class="icon-bar">
            <i class="fa fa-search"></i>
          </div>
        </button>
      </header>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="d-flex flex-row btn cart"><a href="shopping-cart.php"><i class="fa fa-shopping-cart text-white" style="font-size: 28px"></i>&nbsp;<span class="badge badge-light itemCnt" style="font-size:14px; color:red; height: 21px">0</span></a></div>
        <button class="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <hr>
          <ul class="navbar-nav" id="headnav">
            <li class="nav-item <?php echo $homelinkactive ?>">
              <a class="nav-link" href="./">Home <i class="fa fa-home" aria-hidden="true"></i> <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item <?php echo $bookslinkactive ?>">
              <a class="nav-link" href="./books">Books <i class="fa fa-book"></i></a>
            </li>
            <li class="nav-item <?php echo $aboutlinkactive ?>">
              <a class="nav-link" href="./about">About <i class="fa fa-info-circle"></i></a>
            </li>
            <li class="nav-item <?php echo $contactlinkactive ?>">
              <a class="nav-link" href="./contact">Contact <i class="fa fa-phone-square" aria-hidden="true"></i></a>
            </li>
          </ul>
        </div>
      </nav>
