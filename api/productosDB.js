class contenedor{
    constructor(dbMariadb, tableName){
        try{
            this.dbMariadb = dbMariadb
            this.tableName=tableName
            this.createTable();

        }catch(err){
            console.log('error constructor',err)

        }
        
    }
    createTable = async () => {
        try {
          const exists = await this.dbMariadb.schema.hasTable(this.tableName)
          if (!exists) {
              await this.dbMariadb.schema.createTable(this.tableName, (table) => {
              table.increments("id").primary();
              table.string("title", 50).notNullable();
              table.integer("price");
              table.string("thumbnail");
            });
          console.log(`Tabla ${this.tableName} creada`);
        } else{
          console.log(`La tabla ${this.tableName} ya existe`)
        }          
      } catch (error) {
          console.log(error);
          this.dbMariadb.destroy();
        }
      };
   
    async getById(id_prod){
        try{
        const elemento = await this.dbMariadb.from(this.tableName).where('id','=',id_prod)
        if(elemento <=0){
            console.log("el producto no existe")
        }
        else{
           console.log(elemento) 
        }
        return elemento       
        }
        catch(error){
            console.log(error)
            database.destroy()
        }  
        
    }
    async getAll(){
        try{
        let rows= await this.dbMariadb.from(this.tableName).select("*")
        rows.forEach((article)=>{ console.log(`${article['id']}`) })
        return rows    
        }
        catch(error){
            console.log(error)
            database.destroy()
        }  
        
    }

    async deleteById(id_prod){
        try{
            await this.dbMariadb.from(this.tableName).select("*").where('id' ,'=',id_prod).del()
            console.log(`El producto ${id_prod} ha sido eliminado`)   
        }
        catch(error){
            console.log(error)
            database.destroy()
        }  
    }
    
    async update(producto, id_prod){
        try{
            await this.dbMariadb.from(this.tableName).where('id' ,'=', Number(id_prod)).update(producto)
            console.log('Producto actualizado')
        }
        catch(error){
            console.log(error)
            database.destroy()
        }   
    }

    async newProduct(producto){
        try{
            const result = await this.dbMariadb(this.tableName).insert(producto)
            console.log('Producto insertado en la tabla')
            return result
        }
        catch(error){
            console.log(error)
            database.destroy()
        }   
    }   
}

module.exports= contenedor