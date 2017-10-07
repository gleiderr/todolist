<?php
require_once 'token.php';

error_reporting(E_ALL | E_STRICT);
mb_internal_encoding('UTF-8');
mb_http_output('UTF-8');

session_start();
echo false;
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <title>To-Do List</title>

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <style type="text/css">
      .glyphicon-ok {
        color: greenyellow;
      }
      .glyphicon-refresh {
        color: yellow;
      }
      .glyphicon-alert {
        color: orangered;
      }
    </style>
</head>
<body class="container" style="background-color: darkorchid">
  <div class="page-header">
    <h1 style="color: cyan">Tarefas</h1>
  </div>

    <!-- Componentes controle de token de segurança -->
    <div id="token" style="display: none"><?= token() ?></div>
    <div id="tokenResponse"></div>

    <!-- Componente para armazenar formulários -->
    <div id="forms"></div>

    <!-- Script jQuery -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

    <!-- Script Firebase -->
    <script src="https://www.gstatic.com/firebasejs/4.5.0/firebase.js"></script>
    <script>
      // Initialize Firebase
      var config = {
        apiKey: "AIzaSyDZko3XPnNnQ-zThQLzWfWImMRrNM_vyg0",
        authDomain: "todolist-93f0e.firebaseapp.com",
        databaseURL: "https://todolist-93f0e.firebaseio.com",
        projectId: "todolist-93f0e",
        storageBucket: "",
        messagingSenderId: "16615280625"
      };
      var defaultApp = firebase.initializeApp(config);
      var database = firebase.database();
    </script>

    <!-- Script próprio -->
    <script src="./scripts/script.js"></script>
</body>
</html>