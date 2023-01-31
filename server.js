import express, {json, Router, urlencoded} from 'express'
import * as path from 'path'
import routerProductos from './routes/routesProductos.js'
import routerCarritos from './routes/routesCarritos.js'
import mongoose from "mongoose"
import admin from 'firebase-admin'
import fs from 'fs'


let administrador = true

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.static('public'))
app.use('/productos', routerProductos)
routerProductos.use(express.json())
routerProductos.use(express.urlencoded({extended: true}))

app.use('/carritos', routerCarritos)
routerCarritos.use(express.json())
routerCarritos.use(express.urlencoded({extended: true}))

const srv = app.listen(PORT , () =>{ console.log(`Conexion exitosa al puerto ${srv.address().port}`)})
srv.on('error', error => console.log(`Error en el servidor ${error}`))

const serviceAccount = JSON.parse(fs.readFileSync("ecommerce-b9a31-firebase-adminsdk-p30nv-29031d1ca8.json"))

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ecommerce-b9a31.firebaseio.com"
});

console.log('Base de datos fire conectada')

export default administrador