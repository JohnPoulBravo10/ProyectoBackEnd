import {promises as fs} from 'fs'
import path from "path";
import __dirname from "../utils.js";

export class CartManager{
    constructor(filePath) {
        this.path = path.join(__dirname,`/files/${filePath}`);
        this.carts = [];
      }

      getCart = async ()=>{
        const response = await fs.readFile(this.path,'utf8')
        const responseJSON = JSON.parse(response)
        return responseJSON
      }

      getCartProducts = async (id) => {
        const carts = await this.getCart();

        const cart = carts.find(cart => cart.id == id)

        if(cart){
            return cart.products
        }else{
            console.log("Carrito no encontrado")
        }

      }
newCart = async () => {
       this.carts = await this.getCart();
       let id;
       if (this.carts.length == 0) {
        id = 1;
    } else {
        id = this.carts[this.carts.length - 1].id + 1;
    }
    const newCart = {id, products: []}

    this.carts.push(newCart)

    await fs.writeFile(this.path,JSON.stringify(this.carts))
    return newCart
}
    

addProductsToCart = async (cartId, productId) => {
    const cart = await this.getCart();

    const index = this.carts.findIndex(cart => cart.id == cartId); 

    if (index !== -1) {
        const cartProducts = await this.getCartProducts(cartId);
        const existeProductoIndex = cartProducts.findIndex(product => product.productId == productId); 

        if (existeProductoIndex !== -1) {
            cartProducts[existeProductoIndex].quantity = cartProducts[existeProductoIndex].quantity + 1;
        } else {
            cartProducts.push({ productId, quantity: 1 });
        }

        this.carts[index].products = cartProducts;

        await fs.writeFile(this.path, JSON.stringify(this.carts)); 

        console.log("Producto agregado con éxito");
    } else {
        console.log("Carrito no encontrado");
    }
}



}