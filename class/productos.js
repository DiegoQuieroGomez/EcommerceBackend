import fs from 'fs'


class Producto {
    constructor(id, nombre, descripcion, codigo, foto, precio, stock) {
        this.id = id
        this.timeStamp = Date().toLocaleString()
        this.nombre = nombre
        this.descripcion = descripcion
        this.codigo = codigo
        this.foto = foto
        this.precio = precio
        this.stock = stock

    }

    async create() {
        await fs.promises.writeFile('dataProductos.txt', JSON.stringify(array, null, 2))
            .then(console.log('Archivo creado exitosamente'))
            .catch(error => console.log(error))

    }

    async save(array) {
        let mix = []
        const data = await fs.promises.readFile('dataProductos.txt', 'utf8')
            .then(console.log('File readed'))
            .catch(error => console.log(error))
            
            mix = JSON.parse(data)
            console.log(mix)
            if(mix.length == null){
                mix.push(array)
            }else{
                mix.push(...array)
            }            
            
        await fs.promises.writeFile('dataProductos.txt', JSON.stringify(mix, null, 2))
            .then('sobreescritura correcta')
            .catch(error => console.log(error))

        await fs.promises.writeFile('public/dataProductos.json', JSON.stringify(mix, null, 2))
            .then(console.log('Archivo creado exitosamente'))
            .catch(error => console.log(error))

    }

    async read(array){
        let mix = []
        const data = await fs.promises.readFile('dataProductos.txt', 'utf-8')
            .then(console.log("Leido"))
            .catch(error => console.log(error))
        
            mix = JSON.parse(data)
            console.log(mix)
            if(mix.length == null){
                mix.push(array)
            }else{
                mix.push(...array)
            }  
        
    }
}

export default Producto    
