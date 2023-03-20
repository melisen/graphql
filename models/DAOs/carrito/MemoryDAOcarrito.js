const logger = require("../../../logger/winston-logger")

class MemoryDAOcarrito{
    constructor(){
        this.arrMem = [];
    }

     saveNew(){        
        try{
            const objs =  this.getAll();
            console.log("saveNew objs", objs)
            let _id;
            if (!objs || !objs.length){
                _id =1
            }else{
                objs.forEach( ob =>{
                    _id  = ob._id
                });
                _id = _id+1
            }      
            const nuevoCarrito = {
                productos:[],
                 _id: _id
                };
            const guardar = objs.length ? objs.push(nuevoCarrito) :[nuevoCarrito];
            this.arrMem = guardar;
            logger.log("info", `guardado  ${nuevoCarrito._id}`)
            return _id
        }
        catch(error){
            logger.log("error", "no se pudo guardar")
        }
    }

    getAll(){
        try{
            const objetos = this.arrMem;
            
            if(!objetos.length){
            return []
            }else{
                const res = objetos;
                console.log("getAll res", res)
                return res
            }           
        }
        catch(err){
            logger.log("error", "no se pudo obtener")
        }
    }

     findById(_id){
        const todos = this.getAll()
        const buscado = todos.find(ob => ob._id == _id);
            if(buscado){
                console.log("findById", buscado)
                return buscado  
                
            }else{
                logger.log("error", "no encontrado")
            }
    }

    deleteById(id){
        try{
            const objs = this.getAll();
            const obj = objs.find((item)=> item._id == id)
            if (!obj){
                logger.log("error", 'No se encontró qué borrar')
            } else{
                const newArr = objs.filter(ob => ob._id != id);
                this.arrMem = newArr;
                return "eliminado"
            }
        }
        catch(err){
            logger.log("error", "no se pudo eliminar")
        }
    }

        getProductList(id){
        const carrito =  this.findById(id);
        if(carrito){
          const productos = carrito.productos;
          return productos 
        }else{
          return false
        }
    }    

     AddProdToCart(objetoProd, id){
        try{ 
            const carrito = this.findById(id)
            console.log("AddProdToCart carrito", carrito)
            const arrProd = carrito.productos;
            arrProd.push(objetoProd);
            carrito.productos = arrProd;
            const carritos = this.getAll();
            const quitarObj = carritos.filter((item)=> item._id != id)
            const newArr = [...quitarObj, carrito];
            console.log( "addProdToCart newArr", newArr)
            this.arrMem = newArr;
            return carrito
        } 
        catch (error) {
            logger.log("error", error)
        }            
    }    

    findProdInCart(idcarrito, idProd){
        const carrito = this.findById(idcarrito);
        const productos = carrito.productos;
        const producto = productos.find((item)=> item._id == idProd)
        return producto;
    }

    addRepeatedProd(idProd, cantPrevia, cantSumar, idcarrito){
        const nuevaCant = cantPrevia + cantSumar;
        const carrito = this.findById(idcarrito);
        const arrProductos = carrito.productos;   
        arrProductos.find(element => element._id == idProd).quantity = nuevaCant
        carrito.productos = arrProductos
        const todosCarritos = this.getAll();
        const quitarCArrito = todosCarritos.filter((item)=> item._id != idcarrito)
        const newArrCarritos = [...quitarCArrito, carrito];
        logger.log("info", `addRepeatedProd newArrCarritos ${newArrCarritos}`);
        this.arrMem = newArrCarritos;
    }

    deleteProd(id, idprod){
        const carrito = this.findById(id);
        const arrProductos = carrito.productos; 
        const quitarProd = arrProductos.filter((item)=> item._id != idprod)
        carrito.productos = quitarProd;
        const todosCarritos = this.getAll();
        const quitarCArrito = todosCarritos.filter((item)=> item._id != id)
        const newArrCarritos = [...quitarCArrito, carrito];
        this.arrMem = newArrCarritos;
    }

}

module.exports = MemoryDAOcarrito