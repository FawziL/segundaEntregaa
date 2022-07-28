import ContenedorFirebase from "../../contenedores/contenedorFirebase.js";

class ProductoDaosFirebase extends ContenedorFirebase {
  constructor() {
    super("productos");
  }
}

export default ProductoDaosFirebase;