const logger = require("../../../logger/winston-logger")
const fs = require("fs") ;

class FileDAOcarrito {
    constructor(ruta){
        this.ruta = ruta;        
    }    

    async saveNew(){        
        try{
            const objs = await this.getAll();
            console.log("saveNew objs", objs)
            let _id;
            if (!objs || !objs.length){
                _id =1
            }else{
                objs.forEach( ob =>{ _id  = ob._id });
                _id = _id+1
            }      
            const nuevoCarrito = {
                productos:[],
                 _id: _id
                };
            objs.push(nuevoCarrito)
            const guardar = objs;
            const guardado = await fs.promises.writeFile(this.ruta, JSON.stringify(guardar), {encoding:'utf-8'})
            logger.log("info", `guardado  ${nuevoCarrito._id}`)
            return _id
        }
        catch(error){
            logger.log("error", "no se pudo guardar")
        }
    }

    async getAll(){
        try{
            const objetos = await fs.promises.readFile(this.ruta, 'utf-8');            

                const res = await JSON.parse(objetos);
                console.log("getAll res", res)
                return res        
        }
        catch(err){
            logger.log("error", "no se pudo obtener")
        }
    }

    async findById(_id){
        const todos = await this.getAll()
        console.log("todos en findById", todos)
        const buscado = todos.find(ob => ob._id == _id);
            if(buscado){
                console.log("findById", buscado)
                return buscado               
                
            }else{
                logger.log("error", "no encontrado")
            }
    }

    async deleteById(id){
        try{
            const objs = await this.getAll();
            const obj = objs.find((item)=> item._id == id)
            if (!obj){
                logger.log("error", 'No se encontró qué borrar')
            } else{
                const newArr = objs.filter(ob => ob._id != id);
                const eliminar = await fs.promises.writeFile(this.ruta, JSON.stringify(newArr), {encoding:'utf-8'})
                return "eliminado"
            }
        }
        catch(err){
            logger.log("error", "no se pudo eliminar")
        }
    }

        async getProductList(id){
        const carrito = await this.findById(id);
        if(carrito){
          const productos = carrito.productos;
          const productosMap = productos.map( (item) => (
            {
              _id: item._id,
              title:item.title,
              price:item.price,
              thumbnail:item.thumbnail,
              quantity:item.quantity,
            }
          ))
          return productosMap 
        }else{
          return false
        }
    }

    

    async AddProdToCart(objetoProd, id){
        try{ 
            const carrito = await this.findById(id)
            console.log("AddProdToCart carrito", carrito)
            const arrProd = carrito.productos;
            arrProd.push(objetoProd);
            carrito.productos = arrProd;
            const carritos = await this.getAll();
            const quitarObj = carritos.filter((item)=> item._id != id)
            const newArr = [...quitarObj, carrito];
            console.log( "addProdToCart newArr", newArr)
            await fs.promises.writeFile(this.ruta, JSON.stringify(newArr), { encoding: 'utf-8'})
            return carrito
        } 
        catch (error) {
            logger.log("error", error)
        }
            
    }

    

    async findProdInCart(idcarrito, idProd){
        const carrito = await this.findById(idcarrito);
        const productos = carrito.productos;
        const producto = productos.find((item)=> item._id == idProd)
        return producto;
    }

    async addRepeatedProd(idProd, cantPrevia, cantSumar, idcarrito){
        const nuevaCant = cantPrevia + cantSumar;
        const carrito = await this.findById(idcarrito);
        const arrProductos = carrito.productos;   
        arrProductos.find(element => element._id == idProd).quantity = nuevaCant
        carrito.productos = arrProductos
        const todosCarritos = await this.getAll();
        const quitarCArrito = todosCarritos.filter((item)=> item._id != idcarrito)
        const newArrCarritos = [...quitarCArrito, carrito];
        logger.log("info", `addRepeatedProd newArrCarritos ${newArrCarritos}`)
        await fs.promises.writeFile(this.ruta, JSON.stringify(newArrCarritos), { encoding: 'utf-8'})
    }

    async deleteProd(id, idprod){
        const carrito = await this.findById(id);
        const arrProductos = carrito.productos; 
        const quitarProd = arrProductos.filter((item)=> item._id != idprod)
        carrito.productos = quitarProd;
        const todosCarritos = await this.getAll();
        const quitarCArrito = todosCarritos.filter((item)=> item._id != id)
        const newArrCarritos = [...quitarCArrito, carrito];
        await fs.promises.writeFile(this.ruta, JSON.stringify(newArrCarritos), { encoding: 'utf-8'})

    }


}

module.exports = FileDAOcarrito;