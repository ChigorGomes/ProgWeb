var botao= document.getElementById("enviar");

botao.onclick= function (){
    var raio= document.getElementById("raio").value;
    var circuferencia= (2*Math.PI*raio);
    var area= Math.PI*(Math.pow(raio,2));
    document.getElementById("area").value= area.toFixed(2);
    document.getElementById("circun").value= circuferencia.toFixed(2);
    return false;
}