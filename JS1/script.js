var titulo= document.getElementById('titulo');
var coluna= document.getElementById('coluna');
var tabela=  document.getElementById('tabela');
function geratabelas (){
    var i,j; 
    var num;
    for(i=1;i<=10;i++){
        if(i<6){
            num=1;
        }else if(i>=6) num=2;
        document.write("<div class='tabela"+num+"'>");
        document.write("<table>"); 
        titulo= document.write("<th colspan='2' id='linha'>"+"Produtos de "+i+"</th>");
        for(j=1;j<=10;j++){
            document.write("<tr>");
            document.write("<td>"+i+"x"+j+"</td>");
            document.write("<td>"+(i*j)+"</td>"); 
            document.write("</tr>");
           
        }
        document.write("</table>");
        document.write("</div>");  
    }
 
}
