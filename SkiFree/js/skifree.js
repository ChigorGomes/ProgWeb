(function () {
  var metros = 0;
  var vidas = 3;
  const FPS = 50;
  const FPS2 = 150; //33 correto.
  const TAMX = 300; //300
  const TAMY = 400;
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
    gameLoop = setInterval(run, 1000 / FPS);
    velocidade();
    metros = Metros()(parseInt(gameLoop));
    Placar(metros);
  }

  function init2() {
    montanha = new Montanha();
    skier = new Skier();
    this.clearInterval(gameLoop);
    gameLoop = setInterval(run, 1000 / FPS);
    velocidade();
    metros = Metros()(parseInt(gameLoop));

  }

  function Metros() {
    metros;
    return function (x) {
      metros += x;
      return metros;
    }

  }

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


  //velocidade do jogo
  function velocidade() {
    window.addEventListener('keydown', function (e) {
      if (e.keyCode == 70) {
        this.clearInterval(gameLoop);
        gameLoop = setInterval(run, parseInt(1000 / FPS2));
      }
    });

  }
  function verificaVida() {
    if (vidas <= 0) {
      location.reload();
      alert("você perdeu!");
    }
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
    this.element.className = 'para-frente'; //para-frente
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
      } if (parseInt(this.element.style.left) < 285 && this.direcao == 2) {
        this.element.style.left = (parseInt(this.element.style.left) + 1) + "px";
      }
    }
  }


  function Monstro() {
    this.element = document.getElementById("monstro");
    this.element.className = 'frente';
    this.perseguir = 1;
    this.element.style.left = parseInt(TAMX / 2) - 7 + 'px';

    this.mudarDirecao = function (giro) {
      if (this.perseguir + giro >= 0 && this.perseguir + giro <= 2) {
        this.perseguir += giro;
        this.element.className = perseguir[this.perseguir];

      }
    }
    this.andar = function () {
      if (parseInt(this.element.style.left) > 0 && this.perseguir == 0) {
        this.element.style.left = (parseInt(this.element.style.left) - 1) + "px";
      } if (parseInt(this.element.style.left) < 285 && this.perseguir == 2) {
        this.element.style.left = (parseInt(this.element.style.left) + 1) + "px";
      }
    }
  }


  function criaObstaculos(nomeClasse, xwidth, xheight) {
    this.element = document.createElement('div');
    montanha.element.appendChild(this.element);
    this.element.className = nomeClasse;
    this.element.style.top = TAMY + "px";
    this.element.style.left = Math.floor(Math.random() * TAMX) + "px";

    this.element.style.width = xwidth + 'px';
    this.element.style.height = xheight + 'px';

  }

  window.addEventListener('keydown', function (e) {
    if (e.keyCode == 37) monstro.mudarDirecao(-1);
    else if (e.keyCode == 39) monstro.mudarDirecao(1);

  });


  function randomCriaObstaculos() {
    var random = Math.floor(Math.random() * 1000); //1000
    if (random <= PROB_OBSTACULOS * 9) { //10
      console.log('passei');
      var randomObstaculos = parseInt(Math.floor(Math.random() * 3) + 1); //10
      switch (randomObstaculos) {
        case 1:
          console.log('arvore');
          obstaculo = new criaObstaculos('arvore', 28, 32); // Criando Arvore
          vetorObstaculos.push(obstaculo);
          console.log('arvore ok');
          break;
        case 2:
          console.log('chama');
          obstaculo = new criaObstaculos('chama', 25, 28); // Criando Chama
          vetorObstaculos.push(obstaculo);
          console.log('chama ok');
          break;
        case 3:
          console.log('toco');
          obstaculo = new criaObstaculos('toco', 20, 13); // Criando Toco
          vetorObstaculos.push(obstaculo);
          console.log('toco ok');
          break;
        case 4:
          console.log('rocha');
          obstaculo = new criaObstaculos('rocha', 28, 13); // Criando Rocha
          vetorObstaculos.push(obstaculo);
          console.log('rocha ok');
          break;
      }
    }
  }


  function run() {
    randomCriaObstaculos();
    verificaVida();
    vetorObstaculos.forEach(function (a) {
      if (parseInt(a.element.style.top) > 34) {
        a.element.style.top = (parseInt(a.element.style.top) - 1) + "px";
      } else {
        montanha.element.removeChild(a.element);
        a.element = null;
        vetorObstaculos.shift();
      }
    });

    //   function colisao
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
          vidas = vidas - 1;
          init2();
        }
      }
    });


    metros = Metros()(parseInt(gameLoop));
    repeteplacar(metros);
    skier.andar();
  }
  init();

})();