(function () {

    var metros=0;
    var vidas =3;
   const FPS = 50;
   const FPS2=100;
   const TAMX = 300;
   const TAMY = 400;
   const PROB_ARVORE = 2;
   var gameLoop;
   var montanha;
   var skier;
   var direcoes = ['para-esquerda','para-frente','para-direita']
   var arvores = [];

   function init () {
      montanha = new Montanha();
      skier = new Skier();
      gameLoop = setInterval(run, 1000/FPS);
      velocidade();
      painel();
   }

   function painel(){
     var life=document.getElementById("vidas");  
        life.element.style.td ="1";
   } 

   function velocidade(){
        window.addEventListener('keydown', function (e) {
            if (e.keyCode == 70){
                this.clearInterval(gameLoop);
                gameLoop = setInterval(run, parseInt( 1000/FPS2));
            }
        });

   }
   
   window.addEventListener('keydown', function (e) {
      if (e.keyCode == 37) skier.mudarDirecao(-1);
      else if (e.keyCode == 39) skier.mudarDirecao(1);

   });

   function Montanha () {
      this.element = document.getElementById("montanha");
      this.element.style.width = TAMX + "px";
      this.element.style.height = TAMY + "px";

   }

   function Skier() {

      this.element = document.getElementById("skier");
      this.direcao = 1; //0-esquerda;1-frente;2-direita
      this.element.className = 'para-frente';
      this.element.style.top = '30px';
      this.element.style.left = parseInt(TAMX/2)-7 + 'px';

        
      this.mudarDirecao = function (giro) {
         if (this.direcao + giro >=0 && this.direcao + giro <=2) {
            this.direcao += giro;
            this.element.className = direcoes[this.direcao];
         }
      }

      this.andar = function () {
         if (parseInt(this.element.style.left)>0 && this.direcao == 0) {
            this.element.style.left = (parseInt(this.element.style.left)-1) + "px";
         }if(parseInt(this.element.style.left)<285 && this.direcao ==2){
            this.element.style.left = (parseInt(this.element.style.left)+1) + "px";
         }         
      }
   }

   function Arvore() {
      this.element = document.createElement('div');
      montanha.element.appendChild(this.element);
      this.element.className = 'arvore';
      this.element.style.top = TAMY + "px";
      this.element.style.left = Math.floor(Math.random() * TAMX) + "px";
   }

   function run () {
       
      var random = Math.floor(Math.random() * 1000);
      if (random <= PROB_ARVORE*10) {
         var arvore = new Arvore();
         arvores.push(arvore);
      }
      arvores.forEach(function (a) {
          if(parseInt (a.element.style.top) > -34)
            a.element.style.top = (parseInt(a.element.style.top)-1) + "px";
          else {
            montanha.element.removeChild(a.element);
            a.element = null;
            arvores.shift();
          }
        });
      skier.andar();
   }

   init();

})();