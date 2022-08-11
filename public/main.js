const socket = io();

const form = document.getElementById('form');
const inputName = document.getElementById('inputName');
const inputPrice = document.getElementById('inputPrice');
const inputEmail = document.getElementById('inputEmail');

let welcome = document.querySelector("#welcome").innerHTML = "hola";//`Hasta luego ${value}`;

const logout = document.querySelector("#desloguear")

logout.addEventListener('click', ()=>{
    console.log("hola")
    location.href = '/logout'
});



function sendProducts (){
    try {
        const title = inputName.value;
        const price = inputPrice.value;
        const thumbnail = inputEmail.value;
        
        socket.emit('client:price:thumbnail', { title, price, thumbnail })
    } catch(error) {
        console.log(`Hubo un error ${error}`)
    }
};

async function renderProducts (productsArray) {
    try {
        const response = await fetch('./plantilla.hbs') //traemos la plantilla
        
        const plantilla = await response.text() //obtenemos el texto de la misma
        
        if (productsArray.length>0) {
            document.querySelector('#noProducts').innerHTML=""  
            document.querySelector('#productosTabla').innerHTML = ""
            productsArray.forEach(product => {
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
}


form.addEventListener('submit', event => {
    event.preventDefault()
    sendProducts()
});


socket.on('client:price:thumbnail', productos=>{
    renderProducts(productos)
});

const formMessage = document.querySelector('#formMessage')
const usernameInput = document.querySelector('#usernameInput')
const nameInput = document.querySelector('#nameInput')
const lastNameInput = document.querySelector('#lastNameInput')
const ageInput = document.querySelector('#ageInput') 
const nickInput = document.querySelector('#nickInput')
const avatarInput = document.querySelector('#avatarInput')

const messageInput = document.querySelector('#messageInput')
const messagesPool = document.querySelector('#messagesPool')

const tiempoTranscurrido = Date.now()
const hoy = new Date(tiempoTranscurrido)
const fecha= hoy.toLocaleDateString()
const tiempo = new Date()
const VenHora=tiempo.toLocaleTimeString('it-IT')

function sendMessage() {
    try {
        
        const email = usernameInput.value
        const message = messageInput.value
        const nombre = nameInput.value
        const apellido = lastNameInput.value 
        const edad = ageInput.value
        const alias = nickInput.value
        const avatar = avatarInput.value


        mensajitos = { 
            author: {
                id: email, 
                nombre: nombre, 
                apellido: apellido, 
                edad: edad, 
                alias: alias,
                avatar: avatar
            },
            text: message,
        }
        
        socket.emit('client:message', {mensajitos})
    } catch(error) {
        console.log(`Hubo un error ${error}`)
    }
}

function renderMessages(messagesArray) {
    try {
        const html = messagesArray.map(messageInfo => {
            return(`<div>
            <strong style="color: blue;" >${messageInfo.mensajitos.author.id}</strong>
            [<span style="color: brown;">${fecha}, ${VenHora}</span>]:
            <em style="color: green;font-style: italic;">${messageInfo.mensajitos.text}</em> </div>`)
        }).join(" ");

        messagesPool.innerHTML = html
    } catch(error) {
        console.log(`Hubo un error ${error}`)
    }
}

formMessage.addEventListener('submit', event => {
    event.preventDefault()
    sendMessage()
    messageInput.value = "" 
})

socket.on('server:message', renderMessages);

