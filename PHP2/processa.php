<?php
    $nome = $_POST["nome"];
    $email = $_POST["email"];
    $url = $_POST["url"];
    $msg = $_POST["mensagem"];

    $login= "root";
    $senha="root";

    try{
        $conn= new PDO("mysql:host=localhost;dbname=formulario",$login,$senha);
        $conn->exec("set names utf8");

        $stmt= $conn->prepare("INSERT INTO dados (nome,email,url,mensagem) VALUES (:nome,:email,:url,:mensagem)");
        $stmt->bindValue(":nome",$nome);
        $stmt->bindValue(":email",$email);
        $stmt->bindValue(":url",$url);
        $stmt->bindValue(":mensagem",$msg);

        $stmt->execute();

        echo "<script>alert('Enviou com sucesso!');</script>";
    }catch (PDOException $e){
        echo $e->getMessage();
    }

?>