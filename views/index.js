const socket = io.connect()
  
function enviarMensaje(event){
    const fecha = new Date().toLocaleDateString()+ new Date().toTimeString();
    const email = document.getElementById('email').value;
    const text = document.getElementById('chat_mensaje').value;
    if(email){
        socket.emit('new_msg', {
            fecha: fecha,   
            text: text,
        })
        document.getElementById('chat_mensaje').value = '';
        return false
    }else{
        alert("Debe ingresar su email")
    }
}

function renderChat(data){
    const html = data.map( msg =>
        `
        <li style="display: flex; flex-direction:row; ">
            <div id="autor" style="font-weight: bold; color:blue;" >
                ${msg.email} <span style="color: brown; font-weight:normal; margin-left:5px;">  ${msg.fecha}  :</span> 
            </div>
            <div id="msj"  style="color: green; font-style: italic; margin-left:15px;">
               ${msg.text}
            </div>
        </li>
      `).join(" ");
      document.getElementById('chatCompleto').innerHTML = html; 
}

socket.on('mensajes', data =>{
    renderChat(data)
})




let listaProductos = [];
function crearProductosRandom(){
    for(let i=0; i<5; i++){
        listaProductos.push( 
            {
                title: faker.commerce.product().toString(),
                price: faker.commerce.price(100, 200, 0, '$').toString(),
                thumbnail: faker.image.imageUrl(100, 100).toString()
            } 
        )
    }
    return listaProductos;
}

function renderProdTest(){
    const data = crearProductosRandom()
    const html = data.map( msg =>
        `
        <tr>
            <td rowspan="1" colspan="10" style=" font-weight:normal;  padding:5px; ">
            ${msg.title}
            </td >
            <td rowspan="1" colspan="20" style=" font-weight:normal;  padding:5px;">
            $ ${msg.price}
            </td>
            <td rowspan="1" colspan="10" style=" font-weight:normal; padding:5px;">
              <img src="${msg.thumbnail}" height="100px">
            </td>
        </tr>
      `).join(" ");
      document.getElementById('productos-random').innerHTML = html; 
}
















