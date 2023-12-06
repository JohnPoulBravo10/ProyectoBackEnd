import { cartsRouter } from "./routes/carts.router.js";
import express from 'express';
import {ProductManager} from './managers/productsManager.js';
import { productsRouter } from './routes/products.router.js';
import { CartManager } from './managers/cartManager.js';
import { engine } from "express-handlebars";
import * as path from "path"; 
import { Server } from "socket.io";
import viewRouter from "./routes/views.router.js";
import __dirname from "./utils.js";
const PORT = 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const HTTPServer = app.listen(PORT, ()=>{
    console.log(`Servidor funcionando en el puerto: ${PORT}`);
})

const socketServer = new Server(HTTPServer)

app.engine("handlebars",engine())
app.set("view engine", "handlebars")
app.set("views",__dirname + "/views")



app.use(express.static(__dirname + "/public"))

app.use("/",viewRouter)

export const productManager = new ProductManager("products.json")

export const cartManager = new CartManager("carts.json")



app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);


socketServer.on('connection', async (socket) => {
    try {
      console.log('Nuevo cliente conectado');
  
      const products = await productManager.getProducts();
      socket.emit('mostrarProductos', { products });
      
      socket.on("actualizarProductos", async (producto)=>{
        const productos = await productManager.addProduct(producto.title,producto.description, producto.price, producto.thumbnail, producto.code, producto.stock);
        socketServer.emit("mostrarProductos", { productos });
      })

    } catch (error) {
      console.error('Error en la conexión de socket:', error.message);
    }
  });