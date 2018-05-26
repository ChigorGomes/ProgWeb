/*                                    NOME: CÍCERO HIGOR GOMES DE SOUSA
                                            MATRICULA: 21550190
                                            
  COLABORADORES:  FRANCIELISON M. RIBEIRO
                  ANDRE FELIPE COSTA
                  MATEUS MEDEIROS DE SOUZA 



                                                  SKIFREE
*/


(function () {
  var metros = 0;
  var vidas = 3;
  const FPS = 50;
  const FPS2 = 150;//33.333333333;
  const TAMX = 300;
  const TAMY = 400;
  const PROB_OBSTACULOS = 1;
  var gameLoop;
  var montanha;
  var skier;
  var monstro;
  var distancia;
  var obstaculo;
  var direcoes = ['para-esquerda', 'para-frente', 'para-direita'];
  var perseguir = ['esquerda', 'frente', 'direita'];
  var vetorObstaculos = [];
  var cachorro;
  var vetorObstaculosCachorro = [];
  var botaoPressionado = false;
  var botao = true;
  var verificaComeu = false;
  var controlaMonstro = false;

  //função que inicia o jogo
  function init() {
    montanha = new Montanha();
    skier = new Skier();
    monstro = new Monstro();
    this.clearInterval(gameLoop);
    gameLoop = setInterval(run, 1000 / FPS);
    velocidade();
    metros = Metros()(parseInt(gameLoop));
  }


  /*-----------------------------------------------FUNÇÕES DO PAINEL DO JOGO--------------------------------------------------------*/
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

  /*--------------------------------------------------------------------------------------------------------------------------------*/



  /*--------------------------------------------FUNÇÕES QUE CONTROLAM A VELOCIDADE E O TECLADO--------------------------------------*/

  //controla velocidade do jogo, após apertar a tecla F
  function velocidade() {
    window.addEventListener('keydown', function (e) {
      if (e.keyCode == 70) {
        this.clearInterval(gameLoop);
        gameLoop = setInterval(run, parseInt(1000 / FPS2));
        botao = false;

        if (botaoPressionado) {
          if (parseInt(monstro.element.style.top) > -60)
            monstro.element.style.top = (parseInt(monstro.element.style.top) - 2) + 'px';
        }
      }
    });
    window.addEventListener('keyup', function (e) {
      if (e.keyCode == 70) {
        this.clearInterval(gameLoop);
        botaoPressionado = false;
        botao = true;
        gameLoop = setInterval(run, parseInt(1000 / FPS));
      }
    });

  }

  window.addEventListener('keydown', function (e) {
    if (e.keyCode == 37) skier.mudarDirecao(-1);
    else if (e.keyCode == 39) skier.mudarDirecao(1);

  });

  /*--------------------------------------------------------------------------------------------------------------------------------*/


  /*--------------------------------------------FUNÇÕES QUE CRIAM O CENÁRIO E OS PERSONAGENS----------------------------------------*/

  function Montanha() {
    this.element = document.getElementById("montanha");
    this.element.style.width = TAMX + "px";
    this.element.style.height = TAMY + "px";
  }

  //Função que cria o objeto skier
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
      } if (parseInt(this.element.style.left) < 285 && this.direcao == 2) {
        this.element.style.left = (parseInt(this.element.style.left) + 1) + "px";
      }
    }
  }

  //Função que cria o objeto monstro
  function Monstro() {
    this.element = document.getElementById("monstro");
    this.perseguir = 1;
    this.element.className = 'monstro';
    this.element.style.top = '-60px';
    this.element.style.left = skier.element.style.left;
    this.element.style.width = 30 + 'px';
    this.element.style.height = 43 + 'px';

    this.mudarDirecaoDoMonstro = function (giro) {
      if (this.perseguir + giro >= 0 && this.perseguir + giro <= 2) {
        this.perseguir += giro;
        monstro.element.className = perseguir[this.perseguir];
      }
    }

    this.andarMonstro = function () {
      if (parseInt(this.element.style.left) > 0 && this.perseguir == 0) {
        this.element.style.left = (parseInt(this.element.style.left) - 1) + "px";
      } if (parseInt(this.element.style.left) < 285 && this.perseguir == 2) {
        this.element.style.left = (parseInt(this.element.style.left) + 1) + "px";
      }
    }

  }

  /*--------------------------------------------------------------------------------------------------------------------------------*/


  /*--------------------------------------------FUNÇÕES QUE VERIFICAM A VIDA DO SKIER-----------------------------------------------*/

  //Função que verifica se o skier ainda possui vida, caso não possue aparece uma mensagem de gameover  
  function verificaVida() {
    if (verificaComeu) {
      repeteplacar(metros);
      skier.element.className = '';
      monstro.element.className = 'monstroPega';
      monstro.element.style.width = '42px';
      monstro.element.style.height = '58px';
      this.clearInterval(gameLoop);
      setTimeout(function () {
        condicao = window.confirm("Você perdeu!");
        if (condicao) {
          location.reload();
        }
      }, 2000);
    } else if (vidas == 0) {
      skier.element.className = 'gameover';
      this.clearInterval(gameLoop);
      repeteplacar(metros);
      setTimeout(function () {
        condicao = window.confirm("Você deseja recomeçar o jogo?");
        if (condicao) {
          location.reload();

        }
      }, 800);

    }
  }

  //Função que cria o cogumelo com a probabilidade menor. Decidimos colocar esse cogumelo dentro do vetor de obstaculos.
  function ganhaVida() {
    var random = Math.floor(Math.random() * 7000); //1000
    if (random < PROB_OBSTACULOS) {
      obstaculo = new criaObstaculos('cogumelo', 10, 12);
      vetorObstaculos.push(obstaculo);
    }
  }

  /*--------------------------------------------------------------------------------------------------------------------------------*/


  /*---------------------------------------------FUNÇÕES QUE CRIAM  E REMOVEM OS OBSTACULOS-----------------------------------------*/

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

  //gera cachorros aleatorios
  function geraCachorro() {
    var random = Math.floor(Math.random() * 7000);
    if (random < PROB_OBSTACULOS * 5) {
      cachorro = new criaObstaculos('cachorro', 25, 19);
      cachorro.element.style.top = 250 + 'px';
      cachorro.element.style.left = 0 + 'px';
      vetorObstaculosCachorro.push(cachorro);
    }
  }

  //Função que cria os obstaculos aleatoriamente, pega cada obstaculo e joga em um vetor 
  function geraObstaculos() {
    var random = Math.floor(Math.random() * 1000);
    if (random <= PROB_OBSTACULOS * 10) {
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

  /*Após o skier colidir com algum obstaculo, essa função é chamada para remover o obstaculo. Decidimos criar para 
  Evitar alguns bugs*/
  function removeObstaculosDaMontanha(a) {
    montanha.element.removeChild(a.element);
    a.element = null;
    var index = vetorObstaculos.indexOf(a);
    vetorObstaculos.splice(index, 1);
  }

  //remove do vetor de cachorros
  function removeCachorro(a) {
    montanha.element.removeChild(a.element);
    a.element = null;
    var index = vetorObstaculosCachorro.indexOf(a);
    vetorObstaculosCachorro.splice(index, 1);
    this.clearInterval(gameLoop);
    gameLoop = setInterval(run, parseInt(1000 / FPS));
  }

  /*--------------------------------------------------------------------------------------------------------------------------------*/


  /*--------------------------------------------FUNÇÕES QUE MOVIMENTAM OS OBSTACULOS------------------------------------------------*/

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

  function andaCachorro() {
    vetorObstaculosCachorro.forEach(function (a) {
      if (parseInt(a.element.style.left) < 400) {
        a.element.style.left = (parseInt(a.element.style.left) + 1) + "px";
        a.element.style.top = (parseInt(a.element.style.top) - 1) + "px";
      } else {
        montanha.element.removeChild(a.element);
        a.element = null;
        vetorObstaculosCachorro.shift();
      }
    });
  }

  /*------------------------------------------------------------------------------------------------------------------------------*/

  /*----------------------------------------------FUNÇÕES QUE VERIFICAM A COLISÃO-------------------------------------------------*/


  //Função que verifica se houve uma colisão com os obstaculos
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
            vidas -= 1;
            skier.element.className = 'colisao';
            setTimeout(function () { skier.element.className = 'para-frente'; }, 200);
            removeObstaculosDaMontanha(a);
            verificaVida();
          }
        }
      }
    });

    //verifica se houve colisao com o cachorro
    vetorObstaculosCachorro.forEach(function (a) {
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
          vidas -= 1;
          skier.element.className = 'colisao';
          setTimeout(function () { skier.element.className = 'para-frente'; }, 500);
          removeCachorro(a);
          verificaVida();
        }
      }
    });

  }
  //verifica se houve colisao com o monstro
  function colisaoMonstro() {
    var topArv = parseInt(monstro.element.style.top);
    var leftArv = parseInt(monstro.element.style.left);
    var topSkier = parseInt(skier.element.style.top);
    var leftSkier = parseInt(skier.element.style.left);

    var widthArv = parseInt(monstro.element.style.width);
    var heightArv = parseInt(monstro.element.style.height);
    var widthSkier = 15;
    var heightSkier = 32;
    if ((topArv + widthArv) > topSkier) {
      if ((leftArv < (leftSkier + widthSkier)) && ((leftArv + widthArv) > leftSkier)) {
        vidas = 0;
        verificaComeu = true;
        verificaVida();

      }
    }

    if (parseInt(monstro.element.style.top) < 85) {
      monstro.element.style.top = (parseInt(monstro.element.style.top) + 1) + 'px';
    }

  }

  /*--------------------------------------------------------------------------------------------------------------------------------*/


  /*----------------------------------------------------FUNÇÃO QUE MOVIMENTA O JOGO-------------------------------------------------*/

  function run() {
    geraObstaculos();
    geraCachorro();
    ganhaVida();
    andaObstaculo();
    andaCachorro();
    repeteplacar(metros);
    skier.andar();
    colisao();
    metros = Metros()(parseInt(gameLoop));
    if ((metros % 2000) == 0) controlaMonstro = true;
    if (controlaMonstro) {
      if (parseInt(skier.element.style.left) == parseInt(monstro.element.style.left)) {
        monstro.element.className = perseguir[1];
      } else if (parseInt(skier.element.style.left) > parseInt(monstro.element.style.left)) {
        monstro.mudarDirecaoDoMonstro(1);
        monstro.andarMonstro();
      } else if (parseInt(skier.element.style.left) < parseInt(monstro.element.style.left)) {
        monstro.mudarDirecaoDoMonstro(-1);
        monstro.andarMonstro();
      }
      botaoPressionado = true;
      if (botao) colisaoMonstro();

    } else if (parseInt(monstro.element.style.top) > -60) {
      monstro.element.style.top = (parseInt(monstro.element.style.top) - 5) + 'px';
    }
  }
  init();
  Placar(metros);

})();

