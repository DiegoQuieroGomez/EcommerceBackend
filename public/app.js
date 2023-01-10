
const productContainer = document.querySelector("#contentContainer")
const btn = document.querySelector('#btn')

let productoss = [{
    nombre: "cosa",
    imagen: "weasd",
    precio: 900,
    sku: 134853
}]
let mix = []

const productosApi = async () => {
    const response = await fetch ("dataProductos.json")
    const data = await response.json()
    mix = data
    console.log(mix)
    
    listarProductosPorTipo(mix)
}

productosApi()


function listarProductosPorTipo(array){
    productContainer.innerHTML =""
    array.forEach((producto) => {
        
        const item = document.createElement("div")
        item.className = "product"
        item.innerHTML =`         
        <img src="${producto.foto}" class="productImg">
        <h2 class="productName"> ${producto.nombre} </h2>
        <span class="productName"> $ ${producto.descripcion} </span>
        <span class="productPrice"> $ ${producto.precio} </span>
        <span class="productName"> SKU: ${producto.codigo} </span>
        <span class="productPrice"> Disponibles ${producto.stock} </span>
        <span class="productName"> id:"${producto.id}" </span>
         `
        productContainer.append(item)

    
    })
    
}


/*
function listarProductosPorTipo(array){
    console.log("evento escuchado")
    productContainer.innerHTML = ""
    array.forEach((producto) => {
        
        const item = document.createElement("div")
        item.className = "product"
        item.innerHTML =`hola que tal`` 
                      
        
         `
        productContainer.append(item)
    })
    
}
listarProductosPorTipo(mix)
*/
//btn.addEventListener("click", listarProductosPorTipo(mix))
