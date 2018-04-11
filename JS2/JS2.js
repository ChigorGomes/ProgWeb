function mostraJogada(jogadaAle){
  var valor= "";
  if(jogadaAle==1)valor="Papel";
  else if(jogadaAle==2)valor="Pedra";
  else if(jogadaAle==3)valor="Tesoura";

  return valor;
}
  

var palavra= "Escolha sua jogada:\n 1 - Papel\n 2 - Pedra\n 3 - Tesoura";
function jogada(){
  var pontos=0;
  var status=true;
  while(status==true){
    var valor= parseInt(prompt());
    var  jogadaAle=Math.floor((Math.random() * 3)+1);
    var str="";
    console.log(palavra);
    switch(valor){
      case 1:
        if(jogadaAle ==1){
          status=true;
          str="A rodada empatou!"; 
        }else
        if(jogadaAle ==2){
          pontos+=1;
          status=true;
          str="Você ganhou!";  
        }else
        if(jogadaAle ==3)status=false;
      break;
      case 2:
        if(jogadaAle ==1) status=false;
        else if(jogadaAle ==2){
          status=true;
          str="A rodada empatou!"; 
        }else
        if(jogadaAle==3){
          pontos+=1;
          status=true;
          str="Você ganhou!"; 
        }
      break;
      case 3:
        if(jogadaAle ==1){
          pontos+=1;
          status=true;
          str="Você ganhou!"; 
        }else if(jogadaAle ==2)status=false;
        else if( jogadaAle==3){
          status=true;
          str="A rodada empatou!"; 
        }
        
    }
    console.log("O computador jogou " + mostraJogada(jogadaAle));
    console.log(str);
}
console.log("O computador jogou " + mostraJogada(jogadaAle));
console.log("Você perdeu! A sua pontuação foi de "+pontos);
}

  jogada();



