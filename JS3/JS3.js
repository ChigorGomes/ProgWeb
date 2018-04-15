function someFn(x) {
  var soma=0;
  return function(y){
      soma+=y;  
    return soma+x;
  }
}
var adicionar = someFn(1);
console.log('Primeira chamada', adicionar(3));
console.log('Segunda chamada', adicionar(1));
console.log('Terceira chamada', adicionar(5));
