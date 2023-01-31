import express, { json , urlencoded} from 'express'
import Producto from '../class/productos.js'
import administrador from '../server.js' 
import fs from 'fs'


const routerProductos = express.Router()
routerProductos.use(express.json())
routerProductos.use(express.urlencoded({extended: true}))

const instanciaProducto = new Producto()

export let productos = [
   
    
]
//arreglar
routerProductos.get('/:id?', (req, res) => {
    let id = req.params.id
    let info = []
    instanciaProducto.read(info)
    console.log(info)
})

//Añade un registo por ID
routerProductos.post('/', (req, res) => {
    if (administrador == true) {
        let prod = req.body
        const producto = new Producto(prod.id, prod.nombre, prod.descripcion, prod.codigo, prod.foto, prod.precio, prod.stock)
        console.log(producto)
        productos.push(producto)
        console.log(productos)
        res.send(productos)
        producto.save(productos)
    } else {
        res.send("No tienes permitido realizar esta operacion")
    }

})
//arreglar
//Modifica producto por ID
routerProductos.put('/:id', (req, res) => {
    let id = req.params.id
    let productoActualizado = req.body
    productoActualizado.id = id
    let productoID = productos.find(producto => producto.id == id)

    if (administrador == true) {
        if (productoID != null) {
            let indice = productoID.id
            productos[indice - 1] = nuevoProducto
            res.send(productos[indice - 1])

        } else {
            res.send(`No existe un producto con id: ${id}`)
        }

    } else {
        res.send("No tienes permisos para realizar esta tarea")
    }

})

//Elimina un Producto por ID
routerProductos.delete('/:id', (req, res) => {
    let id = req.params.id
    let productoID = productos.find(producto => producto.id == id)
    if (administrador = true) {

        if (productoID != null) {
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

export default routerProductos
