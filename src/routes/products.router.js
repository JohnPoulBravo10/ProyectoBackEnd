import {Router} from "express"
import  { productManager } from "../index.js"


const productsRouter = Router()


productsRouter.get('/', async(req,res)=>{
    try {
    const productos = await productManager.getProducts();

    const limite = req.query.limit;

    if(!limite){
        return res.json({productos})
    }

    const productosFiltrados = productos.slice(0,limite)
 

    res.json({
        productos: productosFiltrados
    })
    } catch (error) {
        console.log(error)
        res.send("Error al cargar los productos")
    }
})

productsRouter.get('/:idProducts', async (req, res) => {
    try {
        const idProducts = parseInt(req.params.idProducts, 10); // Convierte a número

        const productos = await productManager.getProducts();

        const producto = productos.find(prod => {
            return prod.id === idProducts;
        });

        if (!producto) {
            return res.send({
                error: 'Producto no encontrado.'
            });
        }

        res.json({ producto });
    } catch (error) {
        console.log(error);
        res.send("Error al cargar el producto");
    }
});


productsRouter.post('/', async (req, res) => {
    try {
        const { title, description, price, thumbnail, code, stock } = req.body;
        const response = await productManager.addProduct({ title, description, price, thumbnail, code, stock });
        res.json(response);  // Cambiado a res.json(response) en lugar de res.json(response)
    } catch (error) {
        console.log(error);
        res.send("Error al cargar el producto");
    }
});


productsRouter.put('/:pid',async(req,res)=>{
    const {pid} = req.params
    try {
        const { title, description, price, thumbnail, code, stock } = req.body;
        const response = await productManager.updateProduct(pid,{title, description, price, thumbnail, code, stock })
        res.json(response)

    } catch (error) {
        console.log(error)
        res.send("Error al cargar el producto")
    }
})

productsRouter.delete('/:pid',async(req,res)=>{
    const {pid} = req.params

    try {
        await productManager.deleteProduct(pid)
        res.send("Produto eliminado exitosamente")
    } catch (error) {
        console.log(error)
        res.send("Error al intentar eliminar el producto")
    }


})
export {productsRouter}