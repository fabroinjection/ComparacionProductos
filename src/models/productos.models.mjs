import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url); // toma la url del archivo actual
const __dirname = path.dirname(__filename); // toma el directorio del archivo actual

const productosFilePath = path.join(__dirname, '../utils/productos.json'); // armado correcto de la ruta del archivo, evitando que según el OS la separación sea con barras / o backslashes \.

export async function getAllProducts() {
    try {
        const data = await fs.promises.readFile(productosFilePath, 'utf-8'); // lectura del archivo
        return JSON.parse(data);
    } catch (error) {
        console.error('Error al leer el archivo de productos:', error);
        return [];
    }
}

export async function getProductById(id) {
    try {
        const products = await getAllProducts();
        return products.find(product => product.id == id); // se retorna el producto 
    } catch (error) {
        console.error('Error al obtener el producto por ID:', error);
        return null;
    }
}

export async function createProduct(product) {
    try {
        const products = await getAllProducts();
        const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1; // para la creación de un nuevo ID se toma el último ID y se le suma 1
        const newProduct = { id: newId, ...product }; // se crea el nuevo producto con el nuevo id
        products.push(newProduct); // se agrega el nuevo producto al array
        await fs.promises.writeFile(productosFilePath, JSON.stringify(products, null, 2)); // se escribe el archivo en la misma ruta, pasando el array de productos y un indentador de 2 espacios. Se ingresa null en el segundo parámetro, ya que este es el replacer para filtrar (no se filtra ningún archivo, se guardan todos)
        return newProduct;
    } catch (error) {
        console.error('Error al crear el producto:', error);
        return null;
    }
}

export async function updateProductById(id, product) {
    try {
        const products = await getAllProducts();
        const index = products.findIndex(product => product.id == id); // se busca si existe o no el producto
        if (index === -1) { // si no existe el producto se retorna undefined para que el error sea manejado en el controlador
            return undefined;
        }
        products[index] = { id, ...product };
        await fs.promises.writeFile(productosFilePath, JSON.stringify(products, null, 2)); // se escribe el archivo en la misma ruta, pasando el array de productos y un indentador de 2 espacios. Se ingresa null en el segundo parámetro, ya que este es el replacer para filtrar (no se filtra ningún archivo, se guardan todos)
        return products[index];
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        return null;
    }
}

export async function deleteProductById(id) {
    try {
        const products = await getAllProducts();
        const index = products.findIndex(product => product.id == id); // se busca si existe o no el producto
        if (index === -1) { // si no existe el producto se retorna undefined para que el error sea manejado en el controlador
            return undefined;
        }
        products.splice(index, 1); // se elimina el producto del array
        await fs.promises.writeFile(productosFilePath, JSON.stringify(products, null, 2)); // se escribe el archivo en la misma ruta, pasando el array de productos y un indentador de 2 espacios. Se ingresa null en el segundo parámetro, ya que este es el replacer para filtrar (no se filtra ningún archivo, se guardan todos)
        return true;
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        return false;
    }
}