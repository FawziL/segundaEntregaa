class productos {
    constructor() {
        this.productos = []
        this.id = 0
    }

    getById(id) {
        const foundProduct = this.productos.find(prod => prod.id === Number(id))
        return foundProduct || { error: 'producto no encontrado' }
    }

    getProducts() {
        return [...this.productos]
    }

    postProducts(prod) {
        const postProduct = { ...prod, id: ++this.id }
        this.productos.push(postProduct)
        return postProduct
    }

    putProducts(prod, id) {
        const newProd = { id: Number(id), ...prod }
        const index = this.productos.findIndex(p => p.id == id)
        if (index !== -1) {
            this.productos[index] = newProd
            return newProd
        } else {
            return { error: 'producto no encontrado' }
        }
    }

    deleteProducts(id) {
        const index = this.productos.findIndex(prod => prod.id == id)
        if (index !== 0) {
            return this.productos.splice(index, 1)
        } else {
            return { error: 'producto no encontrado' }
        }
    }
}

module.exports =  productos




