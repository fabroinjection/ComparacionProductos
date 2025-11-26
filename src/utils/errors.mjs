class HttpError extends Error { // se extiende de la clase Error y se crea una clase custom HttpError para la utilización en la app
    constructor(statusCode, message, details = null) {
        super(message);
        this.name = 'HttpError';
        this.statusCode = statusCode;
        this.details = details;
    }

}

export class NotFoundError extends HttpError { // Error 404 Not Found para manejo centralizado de errores en clases
    constructor(message, details = null) {
        super(404, message, details);
        this.name = 'NotFoundError';
    }
}

export class BadRequestError extends HttpError { // Error 400 Bad Request para manejo centralizado de errores en clases
    constructor(message, details = null) {
        super(400, message, details);
        this.name = 'BadRequestError';
    }
}
