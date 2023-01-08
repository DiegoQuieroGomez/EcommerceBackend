const { create } = require('domain')
const express = require('express')
const app = express()
const fs = require('fs')
let administrador = true

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
    constructor(id){
        this.id = id
        this.timeStamp = Date().toLocaleString()
        this.Producto = Producto
    }

    async create(array){
        await fs.promises.writeFile('dataCarritos.txt', JSON.stringify(array, null, 2))
        .then(console.log('Archivo creado exitosamente'))
        .catch(error => console.log(error))
    }   

    async save(array){

        let productos = []
        const data = await fs.promises.readFile('dataCarritos.txt', 'utf-8')
        .then(console.log(`Archivo leido correctamente`))
        .catch(error => console.log(error))
        let mix = JSON.parse(data)
        if (mix.length > 0) {
            productos.push(...mix)
        }else{
            productos.push(mix)
        }
        productos.push(...array)
        fs.promises.writeFile('dataCarritos.thx', JSON.stringify(productos, null, 2))
        .then('sobreescritura correcta')
        .catch(error => console.log(error)) 
    }
}

class Producto{
    constructor(id, timeStamp, nombre, descripcion, codigo, foto, precio, stock){
        this.id = id
        this.timeStamp = timeStamp
        this.nombre = nombre
        this.descripcion = descripcion
        this.codigo = codigo
        this.foto = foto
        this.precio = precio
        this.stock = stock

    }

    async create(array){
        await fs.promises.writeFile('dataProductos.txt', JSON.stringify(array, null, 2))
        .then(console.log('Archivo creado exitosamente'))
        .catch(error => console.log(error))
    }

}

app.use(express.static('public'))
const routerProductos = express.Router()
const routerCarritos = express.Router()


app.use('/api/productos', routerProductos)
routerProductos.use(express.json())
routerProductos.use(express.urlencoded({extended: true}))
app.use('/api/carritos', routerCarritos)
routerCarritos.use(express.json())
routerCarritos.use(express.urlencoded({extended: true}))

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
    
    if (administrador == true) {
        //let { detalle } = req.body
        //console.log(detalle)
        let prod = new Producto(req.body)
        productos.push(prod)
        let ultimo = productos.at(-1)
        res.send(ultimo)
        prod.create(productos)
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

//FUNCIONALIDAD CARRITO -------------------------------------------------------------------------------------------

//Crea un nuevo carrito
routerCarritos.post('/', (req, res) => {
    let nuevoCarrito = new Carrito(carritos.length + 1)
    console.log(nuevoCarrito)
    carritos.push(nuevoCarrito)
    console.log(carritos)
    nuevoCarrito.create(carritos)
    res.send(`Carrito creado correctamente ${nuevoCarrito.id}`)
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
        
    } else {
        res.send(`No existe un carrito con id: ${id}`)
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


//Servidor --------------------------------------------------------------------------------------------------------
const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en el servidor ${error}`))