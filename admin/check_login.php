<?php
  $username = $_POST['username'];
  $password = $_POST['password'];
  
  if ($username === 'admin' && $password === 'password') {
    // Redirect to the admin page
    header('Location: admin/panel.html');
    exit();
  } else {
    // Redirect to the permission denied page
    header('Location: admin/permission_denied.php');
    exit();
  }
?>
