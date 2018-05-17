<?php

    $login = $_POST["login"];
    $senha = $_POST["senha"];
    $token= md5("demo");
    $aux= md5($senha);

    session_start();

    if($login=="demo" && $aux==$token){
        echo "<script>alert('Seja Bem-Vindo!');</script>";
        include('pagina.php');
    }else{
        session_destroy();
        echo "<script>alert('senha invalida!');</script>";
        include('exe12.php');
       
    }
?>
