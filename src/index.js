import { cartsRouter } from "./routes/carts.router.js";
import express from 'express';
import {ProductManager} from './managers/productsManager.js';
import { productsRouter } from './routes/products.router.js';
import { CartManager } from './managers/cartManager.js';
const PORT = 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.listen(PORT, ()=>{
    console.log(`Servidor funcionando en el puerto: ${PORT}`);
})

export const productManager = new ProductManager("products.json")

export const cartManager = new CartManager("carts.json")


app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
