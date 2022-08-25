function generateRandomNumber() {
    return Math.floor(Math.random() * (1000 - 1 + 1) + 1);
  }
  
  process.on('message', msg => {
    console.log(msg)
    const numeros = [];
    const cantidad = msg
    for(i=0; cantidad>i; i++){
      numeros.push(generateRandomNumber())
    }
    let contadores = {}
    for(j=0; j < numeros.length ;j++){
    const num = numeros[j] 
    contadores[num] = (contadores[num] || 0) + 1 
  }
  process.send(contadores);
    });
  
    