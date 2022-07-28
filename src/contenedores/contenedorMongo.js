import config from "./config.js";
import mongoose from "mongoose";

await mongoose.connect(config.mongodb.connectionString);

class ContenedorMongo {
  constructor(nombreColeccion, esquema) {
    this.coleccion = mongoose.model(nombreColeccion, esquema);
  }

  async listar(id) {
    const doc = await this.coleccion.find({ _id: id }, { __V: 0 });
    return doc;
  }

  async listarAll() {
    try {
        const doc = await this.coleccion.find();
        return JSON.parse(doc);
    } catch (error) {
        console.log(error);
    }
  }

  async guardar(obj) {
    try {
       const newObj = await this.coleccion.insertOne(obj);
        return newObj;
    } catch (error) {
        console.log(error);
    }
  }
/*
  async actualizar(elem) {
    const objs = await this.listarAll();
    const index = objs.findIndex((o) => o.id == elem.id);
    if (index == -1) {
      throw new Error(`Error al actualizar: no se encontró el id ${id}`);
    } else {
      objs[index] = elem;
      try {
        await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2));
      } catch (error) {
        throw new Error(`Error al actualizar: ${error}`);
      }
    }
  }

  async borrar(id) {
    const objs = await this.listarAll();
    const index = objs.findIndex((o) => o.id == id);
    if (index == -1) {
      throw new Error(`Error al borrar: no se encontró el id ${id}`);
    }

    objs.splice(index, 1);
    try {
      await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2));
    } catch (error) {
      throw new Error(`Error al borrar: ${error}`);
    }
  }

  async borrarAll() {
    try {
      await fs.writeFile(this.ruta, JSON.stringify([], null, 2));
    } catch (error) {
      throw new Error(`Error al borrar todo: ${error}`);
    }
  }*/
}

export default ContenedorMongo;