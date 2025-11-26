import { Router } from "express";
import { getAllProductsController, getProductByIdController, createProductController, updateProductByIdController, deleteProductByIdController } from "../controllers/productos.controller.mjs";
import { validateProduct } from "../middlewares/validate.mjs";
import { productoSchema } from "../schemas/productos.joi.mjs";

const router = Router();

router.get('/', getAllProductsController);
router.get('/:id', getProductByIdController);
router.post('/', validateProduct(productoSchema), createProductController);
router.put('/:id', validateProduct(productoSchema), updateProductByIdController);
router.delete('/:id', deleteProductByIdController);

export default router;