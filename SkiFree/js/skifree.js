(function () {
  var metros = 0;
  var vidas = 3;
  const FPS = 50;
  const FPS2 = 150;//33.333333333; //33 correto.
  const TAMX = 350; //300
  const TAMY = 450;
  const PROB_OBSTACULOS = 5;
  var gameLoop;
  var montanha;
  var skier;
  var monstro;
  var distancia;
  var obstaculo;
  var direcoes = ['para-esquerda', 'para-frente', 'para-direita'];
  var perseguir = ['esquerda', 'frente', 'direita'];
  var vetorObstaculos = [];

  function init() {
    montanha = new Montanha();
    skier = new Skier();
    this.clearInterval(gameLoop);
    gameLoop = setInterval(run, 1000 / FPS);
    velocidade();
    metros = Metros()(parseInt(gameLoop));
  }

//Função que conta os metros
  function Metros() {
    metros;
    return function (x) {
      metros += x;
      return metros;
    }
    
  }

 //Função que cria o placar no jogo 
  function Placar(metros) {
    placar = document.querySelector("#placar");
    var txtMetros = document.createTextNode("Metros:");
    distancia = document.createElement("p");
    distancia.appendChild(txtMetros);
    distancia.setAttribute("id", "txtMetros");

    var distanciaPerc = document.createTextNode(parseFloat(metros.toFixed(2)));
    pontosPerc = document.createElement("p");
    pontosPerc.appendChild(distanciaPerc);
    pontosPerc.setAttribute("id", "distanciaPerc");

    var txtVidas = document.createTextNode("Vidas:");
    tvidas = document.createElement("p");
    tvidas.appendChild(txtVidas);
    tvidas.setAttribute("id", "txtVidas");

    var qtdVidas = document.createTextNode(vidas);
    pVidas = document.createElement("p");
    pVidas.appendChild(qtdVidas);
    pVidas.setAttribute("id", "qtdVidas");

    placar.appendChild(distancia);
    placar.appendChild(pontosPerc);
    placar.appendChild(tvidas);
    placar.appendChild(pVidas);
  }

  function repeteplacar(metros) {
    placar.removeChild(distancia);
    placar.removeChild(pontosPerc);
    placar.removeChild(tvidas);
    placar.removeChild(pVidas);
    Placar(metros);
  }


  //controla velocidade do jogo, após apertar a tecla F
  function velocidade() {
    window.addEventListener('keydown', function (e) {
      if (e.keyCode == 70) {
        this.clearInterval(gameLoop);
        gameLoop = setInterval(run, parseInt(1000 / FPS2));
      }
    });

  }

  window.addEventListener('keydown', function (e) {
    if (e.keyCode == 37) skier.mudarDirecao(-1);
    else if (e.keyCode == 39) skier.mudarDirecao(1);

  });

  function Montanha() {
    this.element = document.getElementById("montanha");
    this.element.style.width = TAMX + "px";
    this.element.style.height = TAMY + "px";
  }

  function Skier() {
    this.element = document.getElementById("skier");
    this.direcao = 1; //0-esquerda;1-frente;2-direita
    this.element.className = 'para-frente'; //para=frente
    this.element.style.top = '90px';
    this.element.style.left = parseInt(TAMX / 2) - 7 + 'px';

    this.mudarDirecao = function (giro) {
      if (this.direcao + giro >= 0 && this.direcao + giro <= 2) {
        this.direcao += giro;
        this.element.className = direcoes[this.direcao];
      }
    }

    this.andar = function () {
      if (parseInt(this.element.style.left) > 0 && this.direcao == 0) {
        this.element.style.left = (parseInt(this.element.style.left) - 1) + "px";
      } if (parseInt(this.element.style.left) < 328 && this.direcao == 2) {
        this.element.style.left = (parseInt(this.element.style.left) + 1) + "px";
      }
    }
  }


//Função que cria um vetor que passa como parametro o nome da classe e o suas propriedades CSS
  function criaObstaculos(nomeClasse, xwidth, xheight) {
    this.element = document.createElement('div');
    montanha.element.appendChild(this.element);
    this.element.className = nomeClasse;
    this.element.style.top = TAMY + "px";
    this.element.style.left = Math.floor(Math.random() * TAMX) + "px";

    this.element.style.width = xwidth + 'px';
    this.element.style.height = xheight + 'px';
  }

//Função que cria o cogumelo com a probabilidade menor. Decidimos colocar esse cogumelo dentro do vetor de obstaculos.
  function ganhaVida() {
    var random = Math.floor(Math.random() * 7000); //1000
    if (random < PROB_OBSTACULOS) {
      obstaculo = new criaObstaculos('cogumelo', 10, 12);
      vetorObstaculos.push(obstaculo);
    }
  }

//Função que cria os obstaculos aleatoriamente, pega cada obstaculo e joga em um vetor 
  function randomCriaObstaculos() {
    var random = Math.floor(Math.random() * 400); 
    if (random <= PROB_OBSTACULOS ) { 
      var randomObstaculos = parseInt(Math.floor(Math.random() * 5) + 1); 
      switch (randomObstaculos) {
        case 1:
          obstaculo = new criaObstaculos('arvore', 28, 32); // Criando Arvore
          vetorObstaculos.push(obstaculo);
          break;
        case 2:
          obstaculo = new criaObstaculos('chama', 25, 28); // Criando Chama
          vetorObstaculos.push(obstaculo);
          break;
        case 3:
          obstaculo = new criaObstaculos('toco', 20, 13); // Criando Toco
          vetorObstaculos.push(obstaculo);
          break;
        case 4:
          obstaculo = new criaObstaculos('rocha', 28, 13); // Criando Rocha
          vetorObstaculos.push(obstaculo);
          break;
        case 5:
          obstaculo = new criaObstaculos('arvoregrande', 33, 64); // Criando Cogumelo
          vetorObstaculos.push(obstaculo);
          break;
      }
    }
  }

//Função que verifica se o skier ainda possui vida, caso não possue aparece uma mensagem de gameover  
  function verificaVida() {
    if (vidas <= 0) {
      skier.element.className = 'gameover';
     // setTimeout(function () { condicao = window.confirm("você perdeu, sua pontuação foi: " + metros);if(condicao==true){location.reload();}}, 100);
      //alert("Você perdeu! :( Sua pontuação foi: " + metros);
      setTimeout(function () {location.reload();}, 400);
      location.reload();
      
      //condicao = window.confirm("você deseja recomeçar o jogo?");
      //if(condicao==true){location.reload();}
      //setTimeout(function () { location.reload();}, 100);
      

    }
  }

//Após o skier colidir com algum obstaculo, essa função é chamada para remover o obstaculo. Decidimos criar para Evitar alguns bugs
  function removeObstaculosDaMontanha(a) {
    montanha.element.removeChild(a.element);
    a.element = null;
    var index = vetorObstaculos.indexOf(a);
    vetorObstaculos.splice(index, 1);
  }

 //Função que verifica se houve uma colisão 
  function colisao() {
    vetorObstaculos.forEach(function (a) {
      var topArv = parseInt(a.element.style.top);
      var leftArv = parseInt(a.element.style.left);
      var topSkier = parseInt(skier.element.style.top);
      var leftSkier = parseInt(skier.element.style.left);
      var widthArv = parseInt(a.element.style.width);
      var heightArv = parseInt(a.element.style.height);
      var widthSkier = 15;
      var heightSkier = 32;

      if ((topArv < (topSkier + heightSkier)) && (topArv > topSkier)) {
        if ((leftArv < (leftSkier + widthSkier)) && ((leftArv + widthArv) > leftSkier)) {
          if (a.element.className == 'cogumelo') {
            vidas += 1;
            removeObstaculosDaMontanha(a);
          } else {
            skier.element.className = 'colisao';
            setTimeout(function () { skier.element.className = 'para-frente'; }, 200);
            vidas -= 1;
            removeObstaculosDaMontanha(a);
            verificaVida();
          }
        }
      }
    });
  }

  //Função que movimenta os obstaculos, após o obstaculo passar pelo limite, ele é excluido. Serve para otimizar o jogo
  function andaObstaculo() {
    vetorObstaculos.forEach(function (a) {
      if (parseInt(a.element.style.top) > 30) {
        a.element.style.top = (parseInt(a.element.style.top) - 1) + "px";
      } else {
        montanha.element.removeChild(a.element);
        a.element = null;
        vetorObstaculos.shift();
      }
    });
  }

  function run() {
    randomCriaObstaculos();
    ganhaVida();
    andaObstaculo();
    verificaVida();
    metros = Metros()(parseInt(gameLoop));
    repeteplacar(metros);
    skier.andar();
    colisao();
  }
  init();
  Placar(metros);

})();

