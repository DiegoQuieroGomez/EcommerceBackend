import express, {json, urlencoded} from 'express'
import Carrito from '../class/carritos.js'
import administrador from '../server.js' 
import {productos} from './routesProductos.js'
import * as indecar from '../index.js'


const routerCarritos = express.Router()
routerCarritos.use(express.json())
routerCarritos.use(express.urlencoded({extended: true}))

let instanciaCarro = new Carrito()

let carritos = []

//Crea un nuevo carrito
routerCarritos.post('/', (req, res) => {
    let id
    instanciaCarro.save(id)
    indecar.crearCarro(id)
    indecar.listarCarros()
    
    res.send(`Carrito creado correctamente`)
})

//Borra carrito
routerCarritos.delete('/:id', (req, res) =>{
    let instanciaCarro = new Carrito()
    let id = req.params.id
    let carritoID = carritos.find(carro => carro.id == id)
    console.log(carritos)
    if (carritoID != null) {
        let indice = carritoID.id
        carritos.splice(indice - 1, 1)
        res.send(carritos)
        instanciaCarro.create(carritos)
        indecar.borrarCarro(id)
        
    } else {
        res.send(`No existe un carrito con id: ${id}`)
    }

})

//Lista productos del carro
routerCarritos.get('/:id/productos', (req,res) => {
    let id = req.params.id
    let carros = []
    instanciaCarro.read(carros)
    console.log(carros)
    let carroElegido = carros.find(carro => carro.id == id)
    carroElegido.forEach(producto => console.log(producto))
})

//Ingresa Productos por ID 
routerCarritos.post('/:id/productos', (req, res) =>{
    let idCarro = req.params.id
    let idProducto = req.body
    let carritoID = carritos.find(carro => carro.id == idCarro)
    let productoID = productos.find(producto => producto.id == idProducto)

    if (carritoID != null && productoID != null) {
        carritoID.push(productoID)
        let indice = carritoID.id
        carritos[indice - 1] = carritoID
        
    } else {
        res.send(`Producto o carrito inexistentes`)
    }   

})

//Elimina Producto por id de producto e id de carrito
routerCarritos.delete('/:id/producto/:id_prod', (req, res)=>{
    let idCarro = req.params.id
    let idProd = req.params.id_prod
    let carritoID = carritos.find(carro => carro.id == idCarro)
    let productoID = productos.find(producto => producto.id == idProd)

    if (administrador = true) {
        if (carritoID != null && productoID != null) {
            let indice = productoID.id
            productos.splice(indice - 1, 1)
            res.send(productos)

        } else {
            res.send(`No existe un producto con id: ${id}`)
        }

    } else {
        res.send("No tienes permisos para realizar esta tarea")
    }

})

export default routerCarritos