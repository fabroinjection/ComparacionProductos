import { getAllProducts, getProductById, createProduct, updateProductById, deleteProductById } from "../models/productos.models.mjs";
import { BadRequestError, NotFoundError } from "../utils/errors.mjs";

export async function getAllProductsController(req, res, next) {
    try {
        const { nombre, precioMin, precioMax, calificacionMin, calificacionMax, orderBy, orden } = req.query; // para leer los query params

        let products = await getAllProducts();

        if (nombre) {
            products = products.filter(product => product.nombre.toLowerCase().includes(nombre.toLowerCase())); // para buscar por nombre
        }

        if (precioMin) {
            products = products.filter(product => product.precio >= parseFloat(precioMin)); // para buscar por precio minimo
        }

        if (precioMax) {
            products = products.filter(product => product.precio <= parseFloat(precioMax)); // para buscar por precio maximo
        }

        if (calificacionMin) {
            products = products.filter(product => product.calificacion >= parseFloat(calificacionMin)); // para buscar por calificacion minima
        }

        if (calificacionMax) {
            products = products.filter(product => product.calificacion <= parseFloat(calificacionMax)); // para buscar por calificacion maxima
        }

        if (orderBy && products.length > 0) {
            if (!Object.prototype.hasOwnProperty.call(products[0], orderBy)) {
                throw new BadRequestError('Propiedad no válida para ordenar.', `Propiedad ingresada: ${orderBy}`); // para ordenamiento
            }

            products = products.sort((a, b) => { // se pasa una función a sort para que ordene ascendente o descendente de forma correcta
                const aValue = a[orderBy];
                const bValue = b[orderBy];
                
                if (typeof aValue === 'string') {
                    return orden === 'desc'
                    ? bValue.localeCompare(aValue)
                    : aValue.localeCompare(bValue); // para ordenamiento de strings
                } else if (typeof aValue === 'number' || typeof aValue === 'bigint') {
                    return orden === 'desc'
                    ? bValue - aValue
                    : aValue - bValue; // para ordenamiento de numeros
                }

                return 0;
            });
        }

        res.json(products);
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        next(error);
    }
}

export async function getProductByIdController(req, res, next) {
    try {
        const product = await getProductById(req.params.id); // para leer los url params
        if (!product) {
            throw new NotFoundError('Producto no encontrado.', `ID: ${req.params.id}`);
        }
        res.json(product);
    } catch (error) {
        console.error('Error al obtener el producto por ID:', error);
        next(error);
    }
}

export async function createProductController(req, res, next) {
    try {
        const product = await createProduct(req.body); // para crear un producto
        res.status(201).json(product);
    } catch (error) {
        console.error('Error al crear el producto:', error);
        next(error);
    }
}

export async function updateProductByIdController(req, res, next) {
    try {
        const product = await updateProductById(req.params.id, req.body);
        if (!product) {
            throw new NotFoundError('Producto no encontrado.', `ID: ${req.params.id}`);
        }
        res.json(product);
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        next(error);
    }
}

export async function deleteProductByIdController(req, res, next) {
    try {
        const product = await deleteProductById(req.params.id);
        if (!product) {
            throw new NotFoundError('Producto no encontrado.', `ID: ${req.params.id}`);
        }
        res.json(product);
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        next(error);
    }
}