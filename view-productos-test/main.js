//const { faker } =  require("@faker-js/faker");
const boton = document.getElementById("boton")
boton.addEventListener("click", escuchar)

function escuchar(){
    console.log("seeschucod")
}
console.log("HOLA")
/*
const productosRamdon = [];
console.log("hasta aca funciona");
async function generarProductos(){

    try {
        console.log("hasta aca funciona");
        const response = await fetch('./plantilla.hbs') //traemos la plantilla

        for (let i = 1; i <= 5; i++) {
            productosRamdon.push({
              id: i,
              nombre: faker.name.firstName(),
              apellido: faker.name.lastName(),
              color: faker.color.human(),
            });
          }
        
        const plantilla = await response.text() 
        
        if (productosRamdon.length>0) {
            document.querySelector('#noProducts').innerHTML=""  
            document.querySelector('#productosTabla').innerHTML = ""
            console.log("hola, no hay productos")
            productosRamdon.forEach(product => {
                const template = Handlebars.compile(plantilla)
                const filled = template(product) 
                document.querySelector('#productosTabla').innerHTML += filled 
            }); 
            
        }else{
            document.querySelector('#noProducts').innerHTML = ("<h4>No hay productos :(</h4>")
        }
        
    } catch(error) {
        console.log(`Hubo un error ${error}`)
    }
      console.log(productosRamdon)
}




*/