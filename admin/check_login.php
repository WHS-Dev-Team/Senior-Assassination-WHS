<?php
  $username = $_POST['username'];
  $password = $_POST['password'];
  
  if ($username === 'admin' && $password === 'password') {
    //redirect to panel.html located in admin folder
    header('Location: admin/panel.html');
    exit();
  } else {
    // Redirect to the permission denied page
    header('Location: permission_denied.html');
    exit();
  }
?>
