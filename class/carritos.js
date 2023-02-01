import Producto from "./productos.js"
import fs from 'fs'

class Carrito {
    constructor(id) {
        this.id = id
        this.timeStamp = Date().toLocaleString()
        this.Producto = Producto
    }

    async create(array) {
        await fs.promises.writeFile('dataCarritos.txt', JSON.stringify(array, null, 2))
            .then(console.log('Archivo creado exitosamente'))
            .catch(error => console.log(error))

    }

    async save() {
        let mix = []
        const data = await fs.promises.readFile('dataCarritos.txt', 'utf-8')
            .then(console.log(`Archivo leido correctamente`))
            .catch(error => console.log(error))
            mix = JSON.parse(data)
            console.log(mix)
            const carro = new Carrito(mix.length + 1)
            mix.push(carro)

        await fs.promises.writeFile('dataCarritos.txt', JSON.stringify(mix, null, 2))
            .then('sobreescritura correcta')
            .catch(error => console.log(error))
    }

    async read() {
        
        const data = await fs.promises.readFile('dataCarritos.txt', 'utf-8')
            .then(console.log("Leido"))
            .catch(error => console.log(error))
        let mix = await JSON.parse(data)
        console.log(mix)
        return data

        
        
        //variable.push()
        //console.log(variable)
    }

}

export default Carrito 