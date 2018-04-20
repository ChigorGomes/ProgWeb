
var botao= document.getElementById('desenhar');
var a1= document.getElementById('altura1');
var a2= document.getElementById('altura2');
var a3= document.getElementById('altura3');
var a4= document.getElementById('altura4');
var a5= document.getElementById('altura5');
var la= document.getElementById("largura");
var g1= document.getElementById("g1");
var g2= document.getElementById("g2");
var g3= document.getElementById("g3");
var g4= document.getElementById("g4");
var g5= document.getElementById("g5");
botao.onclick =function(){
	g1.style.setProperty("width",la.value+"px");
	g1.style.setProperty("height",a1.value+"px");


	g2.style.setProperty("width",la.value+"px");
	g2.style.setProperty("height",a2.value+"px");

	g3.style.setProperty("width",la.value+"px");
	g3.style.setProperty("height",a3.value+"px");

	g4.style.setProperty("width",la.value+"px");
	g4.style.setProperty("height",a4.value+"px");

	g5.style.setProperty("width",la.value+"px");
	g5.style.setProperty("height",a5.value+"px");

}