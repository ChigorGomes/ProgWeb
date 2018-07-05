
<?php
use yii\helpers\Html;
use yii\helpers\Url;
/* @var $this yii\web\View */

$this->title = 'Skifree';
?>





<div class="site-index">

    <div class="jumbotron">
    <?= Html::img('@web/img/ski.jpg',['width'=>'200']) ?>
        <p class="lead">SkiFree consiste em um dos jogos mais arcaicos para Windows. Fez muito sucesso nas versões de 
        16-bit do sistema operacional, mas depois sumiu pela falta de compatibilidade com as versões sucessoras, que apresentavam 
        32-bit.</p>

        <p><a class="btn btn-lg btn-success" href=" <?= Url::to(['jogo/index']) ?>">Iniciar jogo! </a></p>
    </div>

    
</div>
