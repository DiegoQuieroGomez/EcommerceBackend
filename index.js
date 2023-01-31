import mongoose from "mongoose";
import * as model from './contenedores/contenedorCarritos.js'

const URL = 'mongodb+srv://coder:coder123456@cluster0.x6oicff.mongodb.net/ecommerce?retryWrites=true&w=majority'
mongoose.connect( URL, {}, error =>{
    if(error) throw new Error(`Error en la conexion de la base de datos ${error}`)
    console.log('Base de datos conectada')
})

export async function listarCarros(){
    
    const carros = await model.carritos.find({})
    console.log(carros)
}

export async function crearCarro(id){
    await model.carritos.create({
    id: id, timestamp: Date.now()
}).then(() => console.log('El carro fue cargado correctamente'))

}

export async function borrarCarro(id){
    await model.carritos.deleteOne({id: id})
}
