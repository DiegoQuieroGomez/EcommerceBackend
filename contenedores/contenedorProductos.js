import mongoose from "mongoose";

const productosCollection = 'productos'

const ProductosSchema = new mongoose.Schema({
    id: {type: Number, require: true},
    timeStamp: {type: Date, require: true},
    nombre: {type: String, require: true, max: 40},
    descripcion: {type: String, require: true, max: 200},
    codigo: {type: String, require: true, max: 30},
    foto: {type: String, require: false, max: 600},
    precio: {type: Number, require:true},
    stock: { type: Number, require: true}

})

export const productos = mongoose.model(productosCollection, ProductosSchema)
