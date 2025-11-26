import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';


const __filename = fileURLToPath(import.meta.url); // toma la url del archivo actual
const __dirname = path.dirname(__filename); // toma el directorio del archivo actual

// Determinar el entorno (por defecto: development)
const env = process.env.NODE_ENV || 'development';

// Ruta al archivo .env correspondiente
const envPath = path.resolve(__dirname, `../../.env.${env}`); // se usa resolve para que no se tenga que preocupar por la ruta relativa

// Cargar el archivo
dotenv.config({ path: envPath }); // se carga el archivo .env

export const { PORT } = process.env; // se expone solo el puerto para ser utilizado en app.mjs