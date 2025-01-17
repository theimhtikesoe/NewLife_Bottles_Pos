<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Life</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>  
    
    body {
    background-color: var(--bs-body-bg, white);
    color: var(--bs-body-color, black);
  }
  .dark-mode {
    --bs-body-bg: #212529;
    --bs-body-color: white;
  }
  .table {
    margin-top: 20px;
  }
  .form-control {
    border: 1px solid #6c757d;
  }</style>
</head>
<body class="container py-5">
    <header class="navbar">
        <div class="logo"> New Life</div>
        <div class="nav-buttons">
            <form action="/search" method="GET" class="search-form">
                <input type="text" name="query" placeholder="Search..." required>
                <button type="submit">Search</button>
            </form>
            <button class="login-btn btn ">Login</button>
        </div>
    </header>


    <main class="container mt-5">
        <div class="photo-gallery text-center">
            <h2>Photo Gallery</h2>
            <button class="btn btn-success" onclick="window.location.href='index.php'">Photo Gallery</button>
            <button class="btn btn-success" onclick="window.location.href='myms.html'">MYMS</button>
        </div>
        <div class="links text-center mt-3">
            <button class="btn btn-info" onclick="window.location.href='lili'">LiLi</button>
            <button class="btn btn-info" onclick="window.location.href='lica'">LiCa</button>
        </div>
    </main>
    <h1>Garden<h1>  
    <section class="gallery-display">
        @include('photogallery')
    </section>

    <footer class="text-center mt-5">
        <p>&copy; 2023 New Life. All rights reserved.</p>
    </footer>
<script src="js/script.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    
</body>
</html>
