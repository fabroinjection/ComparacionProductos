export const errorHandler = (err, req, res, next) => {
    console.error(`[ERROR] ${err.name}: ${err.message} ${err.details}`); // se muestra el error en consola, evitando que se muestre la respuesta por defecto (puede contener información sensible)
    const statusCode = err.statusCode || 500; // se asigna el status code enviado
    const message = err.message || 'Internal Server Error'; // se asigna el mensaje enviado
    const details = err.details || null; // se asigna el detalle enviado
    const response = { // se arma la respuesta a enviar al cliente con la información del error base (mensaje de error y detalles que se consideren necesarios)
        error: message,
        details: details,
    };
    
    if(process.env.NODE_ENV === 'development') { // se agrega la pila de errores solo para el entorno de desarrollo
        response.stack = err.stack;
    }
    
    return res.status(statusCode).json(response);
};