//////////////////////////////////////////////////////////////////////////////////
Levantar el servidor con "node server.js MEM" o "node server.js FILE"
//////////////////////////////////////////////////////////////////////////////////

Queries para pegar en graphiql (en navegador "localhost:8080/graphql")


mutation crearProd { createProducto(datos: {
    title: "Adidas Minnie",
    price: 22500,
    thumbnail: "https://www.dexter.com.ar/on/demandware.static/-/Sites-365-dabra-catalog/default/dwa4f0b969/products/AD_GY6629/AD_GY6629-1.JPG",
    category: "rosa"}) 
    { id title price category} 
}

mutation updateOne { updateProducto(id: 1,  datos:  {
        title: "poner newTitle",
        price: 10,
        thumbnail:"poner newThumbnail",
        category: "poner newCategory"
        }) 
    { id title price } 
}

query getUnProd { getProducto(id: 2) 
{ id title price category } 
}

query gettodosProd { getProductos { id title price category } }

query getFiltroCategory { getProductos(campo: "category", valor: "rosa") {id title  price category } }

mutation deleteProd {
    deleteProducto(id: 1) {id}
}