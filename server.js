const express = require('express')
const app = express()

const administrador = true

let carritos = []


let productos = [
    {
        id: 1,
        nombre: "xola",
        precio: 2000
    },
    {
        id: 2,
        nombre: "copo",
        precio: 1000
    }
]

class Carrito{
    constructor(id, timeStamp){
        this.id = id
        this.timeStamp = timeStamp
        this.Producto = Producto
    }

}

class Producto{
    constructor(id,timeStamp, nombre, descripcion, codigo, foto, precio, stock){
        this.id = id
        this.timeStamp = timeStamp
        this.nombre = nombre
        this.descripcion = descripcion
        this.codigo = codigo
        this.foto = foto
        this.precio = precio
        this.stock = stock

    }
}

app.use(express.static('public'))
const routerProductos = express.Router()
const routerCarritos = express.Router()

app.use('/api/productos', routerProductos)
routerProductos.use(express.json())
app.use('api/carritos', routerCarritos)
routerCarritos.use(express.json())

//FUNCIONALIDAD PRODUCTOS---------------------------------------------------------------------------------------
//Lista por id y sin id
routerProductos.get('/:id?', (req, res) => {
    let id = req.params.id
    let productosID = productos.find(producto => producto.id == id)
    if (productosID != null) {
        res.json(productosID)
    } else {
        res.json(productos)
    }
})

//Añade un registo por ID
routerProductos.post('/', (req, res) => {
    let count = 1
    if (administrador = true) {
        productos.push(req.body)
        productos.forEach(producto => {
            producto.id = count++
        })
        let ultimo = productos.at(-1)
        res.send(ultimo)
    } else {
        res.send("No tienes permisos para realizar esta tarea")
    }

})

//Modifica producto por ID
routerProductos.put('/:id', (req, res) => {
    let id = req.params.id
    let productoActualizado = req.body
    productoActualizado.id = id
    let productoID = productos.find(producto => producto.id == id)

    if (administrador = true) {
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

//Elimina un objeto por ID
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

//FUNCIONALIDAD CARRITO -------------------------------------------------------------------------------------------

//Crea un nuevo carrito
routerCarritos.post('/', (req, res) => {
    let count = 1
    let nuevoCarrito = new Carrito(carritos.length + 1, Date.now())
    carritos.push(nuevoCarrito)
    res.send(`Carrito creado correctamente ${nuevoCarrito.id}`)

})

//Borra carrito
routerCarritos.delete('/:id', (req, res) =>{
    let id = req.params.id
    let carritoID = carritos.find(carro => carro.id == id)
    if (carritoID != null) {
        let indice = carritoID.id
        productos.splice(indice - 1, 1)
        res.send(productos)

    } else {
        res.send(`No existe un producto con id: ${id}`)
    }

})

//Lista productos del carro
routerCarritos.get('/:id/productos', (req,res) => {
    let id = req.params.id
    let productosCarro = carritos.find(carro => carro.id == id)
    productosCarro.forEach(producto => console.log(producto))
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



//Servidor --------------------------------------------------------------------------------------------------------
const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en el servidor ${error}`))