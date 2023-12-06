const socket = io();


const contenedorProductos = document.querySelector("#contenedorProductos")

socket.on("mostrarProductos", (data) => {
    console.log(data);
  
    // Verifica si data.products es un array antes de usar map
    if (Array.isArray(data.products)) {
      contenedorProductos.innerHTML = " ";
  
      var productosHTML = data.products.map((producto) => {
        // Accede a las propiedades específicas del objeto producto
        const precioFormateado = typeof producto.price === 'number' ? producto.price.toFixed(2) : 'N/A';
  
        return `
          <div class="producto" id=${producto.id}>
            <h3>${producto.title}</h3>
            <p>Precio: $${precioFormateado}</p>
          </div>
        `;
      });
  
      contenedorProductos.innerHTML = productosHTML.join("");
    } else {
      console.error("Los datos recibidos no contienen un array de productos:", data);
    }
  });

const formulario = document.querySelector("#formulario")
const nombreProd = document.querySelector("#nombreProd")
const codeProd = document.querySelector("#codeProd")
const precioProd = document.querySelector("#precioProd")
const stockProd = document.querySelector("#stockProd")
const descProd = document.querySelector("#descProd")

formulario.addEventListener("submit",(e)=>{
    console.log("hace algo")
    e.preventDefault()
    if(nombreProd.value == "" || precioProd.value == "" || descProd.value == "" || stockProd.value == "" || codeProd.value == ""){
        alert("complete todos los campos")
    }else{
        const product = {
            title: nombreProd.value,
            price: parseInt(precioProd.value),
            description: descProd.value,
            thumbnail: "1.img",
            code: parseInt(codeProd.value),
            stock: parseInt(stockProd.value) 
        }
        socket.emit("actualizarProductos",product)
        console.log("tambien")
    }
})
