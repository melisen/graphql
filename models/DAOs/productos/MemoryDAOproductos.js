const logger = require("../../../logger/winston-logger")

class MemoryDAOproductos{
    constructor(){
        this.arrMem = [];
    }

    
    getAll(){
        try{
            const productos = this.arrMem;
            return productos
        }
        catch(err){
            return []
        }
    }

    async findById(id){
        const prod = this.arrMem.find((item)=> item.id == id)
        return prod
    }

    saveNew(objProd){
            const newObj = {
                title:objProd.title,
                price:objProd.price,
                thumbnail:objProd.thumbnail,
                category:objProd.category,
                id:1
            }
           
            try{
                const objs = this.getAll();
                if (!objs || !objs.length){
                    newObj.id =1
                }else{
                    objs.forEach( ob =>{
                        newObj.id  = parseInt(ob.id)
                    });
                    newObj.id +=1
                }         
            const guardar = objs.length ? [...objs, newObj] : [newObj];
            this.arrMem = guardar;
            logger.log("info", "nuevo producto guardado")
            return newObj
        }
        catch(error){
            logger.log("error", "no se pudo guardar")
        }
    }
    async deleteById(idprod){
        try{
            const objs =  this.getAll();
            const obj = objs.find((item)=> item.id == idprod)
            if (!obj){
                logger.log("error", 'No se encontró qué borrar')
            } else{
                const newArr = objs.filter(ob => ob.id != idprod);
                this.arrMem = newArr;
                const respuesta =  obj.id
                return respuesta
            }
        }
        catch(err){
            logger.log("error", "no se pudo eliminar")
        }    
    }

    listCategory(categorySelect){
        const categoryProductos = this.arrMem.filter((item)=> item.category == categorySelect)
        return categoryProductos
    } 

    

    findProdUpdate(idprod, title, price, thumbnail, category){
        const newObj = {
            id:idprod,
            title,
            price,
            thumbnail,
            category
        }
        try{ 
            const objs = this.getAll();
            const quitarObj = objs.filter((item)=> item.id != idprod);
            const newArr = [...quitarObj, newObj];
            this.arrMem = newArr;
            const newObjGuardado = this.findById(idprod)
            return newObjGuardado
        }
        catch(err){
            logger.log("error", err)
        }
    }

    

}

module.exports = MemoryDAOproductos