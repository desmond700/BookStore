
<?php $pageTitle = "Contact" ?>
<?php require "include/header.php" ?>
      <div class="container mt-4">
        <section class="card bg-light">
			<h2 class="card-header text-center">Contact Us</span></h2>
        </section>
      <section class="card mt-4">
        <div class="container">
          <div class="row py-3">
            <div class="col-md-6">
              <address>
                <strong>BookStore, Inc.</strong><br>
                1355 City Center Dr., Suite 900<br>
                Mississauga ON, L5v-345<br>
                P: (123) 456-7890<br>
                <strong>Full Name</strong><br>
                <a href="">first.last@example.com</a><br>
              </address>
            </div>
            <div class="col-md-6">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2498.313653351279!2d-79.64032468476461!3d43.5937149791234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b4725f43fcd8f%3A0xd785e797899a770c!2striOS+College+Business+Technology+Healthcare+-+Mississauga+Campus!5e1!3m2!1sen!2sca!4v1526083572737" width="100%" height="auto" frameborder="0" style="border:0" allowfullscreen></iframe>
            </div>
            <div class="col-md-12"><hr class="bg-dark"></div>
            <div class="col-md-6 mt-2">
              <h3>Get in touch-</h3>
              <form class="d-flex flex-column" action="index.html" method="post">
                <label for="">Name:</label>
                <input type="text" class="form-control form-control-sm" placeholder="Name">
                <label for="">Email:</label>
                <input type="email" class="form-control form-control-sm" placeholder="Email">
                <label for="">Subject:</label>
                <input type="text" class="form-control form-control-sm" placeholder="Subject">
                <label for="">Message:</label>
                <textarea class="form-control" rows="8" cols="80"></textarea>
                <input class="ml-auto mt-2 btn btn-primary" type="submit" value="Submit">
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
        <?php require "include/footer.php" ?>
    </div>
</body>
</html>
