import'./src/config/env.mjs';
import express from 'express';
import cors from 'cors';
import productosRouter  from './src/routes/productos.router.mjs';
import { errorHandler } from './src/middlewares/errorHandler.mjs';

const app = express(); // se inicializa app

app.use(cors()); // se usa cors para permitir todos los origenes
app.use(express.json()); // se usa express.json para parsear el body de las peticiones

const PORT = process.env.PORT;

// Rutas y punto final de escucha
app.get('/api/health', (req, res) => { res.send(`OK!`); });
app.use('/api/productos', productosRouter);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

export default app;
