import './src/config/env.mjs';
import app from './app.mjs';

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
