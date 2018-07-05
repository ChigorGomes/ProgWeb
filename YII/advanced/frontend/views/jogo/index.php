  <h1 style='
        font-family: Times New Roman, Times, serif;
        color:rgb(4, 5, 235);
        font-style: italic;
        position: absolute;
        left: 650px;
        top: 60px; '>Ski
        <span>free</span>
  </h1>
  <div id="tela1">
  </div>
  <div id="tela2">
  </div>
  <div id="montanha">
    <div id="skier"></div>
    <div id="monstro"></div>
  </div>
  <div id="placar" 
        style=' border: 3px solid black;
                width: 100px;
                height: 150px;
                position: absolute;
                padding: 3px;
                top: 300px; /**/
                left: 900px;
                background-color: beige;
                font-size: 15px;
                font-family: Verdana, Geneva, Tahoma, sans-serif;'>
    </div>
  
<?php
/* @var $this yii\web\View */

    use yii\helpers\Url;
    $this->registerJsFile("SkiFree/js/skifree.js");//pega o jogo
    $this->registerCssFile("SkiFree/css/estilos.css");//pega o jogo


    $this->registerJs("

        var pontuacao= 555;
        $.ajax({
            url: '" . Url::to(['jogo/save']). "',
            type: 'GET',
            data: {
                'pontuacao': pontuacao,
            },
            error: function (){
                console.log('Deu erro!');
            },
            success: function (data){
                console.log(data);
            }

        });
    
    
    ");




?>
