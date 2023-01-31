import mongoose from "mongoose";



const carritosCollection = 'carritos'

const CarritosSchema = new mongoose.Schema({
    id: {type: Number, require: true},
    timeStamp: {type: String, require: true, max: 60},
    productos: []
})

export const carritos = mongoose.model(carritosCollection, CarritosSchema)