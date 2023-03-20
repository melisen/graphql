const logger = require("../../../logger/winston-logger")
const fs = require("fs") ;

class FileDAOproductos {
    constructor(ruta){
        this.ruta=ruta  
    }

    async saveNew(objProd){
        const newObj = {
            title:objProd.title,
            price:objProd.price,
            thumbnail:objProd.thumbnail,
            category:objProd.category,
            id:1
        }
        try{
            const objs = await this.getAll();

            if (!objs || !objs.length){
                newObj.id =1
            }else{
                objs.forEach( ob =>{
                    newObj.id  = parseInt(ob.id)
                });
                newObj.id +=1
            }         
            const guardar = objs.length>0 ? [newObj, ...objs] :[newObj]
            logger.log("info", guardar)
            const guardado = await fs.promises.writeFile(this.ruta, JSON.stringify(guardar), {encoding:'utf-8'})
            logger.log("info", "guardado")
            return newObj
        }
        catch(error){
            logger.log("error", "no se pudo guardar")
        }
    }

    async getAll(){
        try{
            const objetos = await fs.promises.readFile(this.ruta, 'utf-8');
            if(!objetos.length){
            return []
            }else{
                const res = await JSON.parse(objetos);
                return res
                
            }           
        }
        catch(err){
            logger.log("error", "no se pudo obtener")
        }
    }

    async findById(id){
        try{
            const todos = await this.getAll()
            const buscado = todos.find(ob => ob.id == id);
                if(buscado){
                    return buscado
                }else{
                    logger.log("error", "no existe")
                }
        }
        catch(err){
            logger.log("error", "no se pudo buscar por id")
        }            
    }

    async deleteById(id){            
        try{     
            const objs = await this.getAll();
            const obj = objs.find((item)=> item.id == id)
            if (!obj){
                logger.log("error", 'No se encontró qué borrar')
            } else{
                const newArr = objs.filter(ob => ob.id != id);
                const eliminar = await fs.promises.writeFile(this.ruta, JSON.stringify(newArr), {encoding:'utf-8'})
                const respuesta =  obj.id
                return respuesta
            }
        }
        catch(err){
            logger.log("error", "no se pudo eliminar")
        }
    }
    

    async listCategory(categorySelect){
        const todosProd = await this.getAll()
        const categoryProductos = todosProd.filter((item)=> item.category == categorySelect)
        return categoryProductos
    }

    async findProdUpdate(idprod, title, price, thumbnail, category){
        try{ 
            const newObj = {
                id:idprod,
                title,
                price,
                thumbnail,
                category
            }
            const objs = await this.getAll();
            const quitarObj = objs.filter((item)=> item.id != idprod)
            const newArr = [...quitarObj, newObj];
            const guardar = await fs.promises.writeFile(this.ruta, JSON.stringify(newArr), { encoding: 'utf-8'})
            const newObjGuardado = await this.findById(idprod)
            return newObjGuardado
        } 
        catch (error) {
            logger.log("error", "error en Update")
        }

        
    }

}

module.exports = FileDAOproductos