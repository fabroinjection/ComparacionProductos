import app from "../../app.mjs";
import request from "supertest";

describe('productos', () => {
    describe('GET /api/productos', () => {
        it('debe obtener todos los productos', async () => {
            const response = await request(app).get('/api/productos');
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        });

        it('debe obtener los productos filtrados por nombre', async () => {
            const response = await request(app).get('/api/productos?nombre=auriculares');
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        });

        it('debe obtener los productos filtrados y ordenados por precio', async () => {
            const response = await request(app).get('/api/productos?precioMin=10000&precioMax=50000&orderBy=precio&orden=desc');
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        });

        it('debe obtener los productos filtrados y ordenados por calificacion', async () => {
            const response = await request(app).get('/api/productos?calificacionMin=4&calificacionMax=5&orderBy=calificacion&orden=desc');
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        });

        it('debe devolver que no existe la propiedad para ordenar', async () => {
            const response = await request(app).get('/api/productos?calificacionMin=4&calificacionMax=5&orderBy=testPropNoExistente&orden=desc');
            expect(response.status).toBe(400);
        });

        it('debe obtener un producto por ID', async () => {
            const response = await request(app).get('/api/productos/1');
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
        });

        it('debe devolver un error al obtener un producto por ID', async () => {
            const response = await request(app).get('/api/productos/9999');
            expect(response.status).toBe(404);
        });        
    });

    describe('POST /api/productos', () => {
        const newProduct = {
            nombre: 'Auriculares Bluetooth JBL Tune 510BT',
            url: 'https://example.com/productos/jbl-tune-510bt',
            descripcion: 'Auriculares inalámbricos con sonido potente y batería de hasta 40 horas.',
            precio: 19999,
            calificacion: 4.6,
            especificaciones: {
                conectividad: 'Bluetooth 5.0',
                duracion_bateria: '40 horas',
                color: 'Negro',
                peso: '160 g'
            }
        };

        it('debe crear un nuevo producto', async () => {
            const response = await request(app)
                .post('/api/productos')
                .send(newProduct);
            
            expect(response.status).toBe(201);
            expect(response.body).toMatchObject({
                nombre: newProduct.nombre,
                descripcion: newProduct.descripcion,
                precio: newProduct.precio,
                calificacion: newProduct.calificacion
            });
            expect(response.body.id).toBeDefined();
        });

        it('debe devolver un error al crear un producto sin nombre', async () => {
            const invalidProduct = { ...newProduct };
            delete invalidProduct.nombre;
            
            const response = await request(app)
                .post('/api/productos')
                .send(invalidProduct);
            
            expect(response.status).toBe(400);
            expect(response.body.error).toBeDefined();
        });
    });

    describe('PUT /api/productos/:id', () => {
        const updatedProduct = {
            nombre: 'Auriculares Bluetooth JBL Tune 510BT Actualizado',
            url: 'https://example.com/productos/jbl-tune-510bt',
            descripcion: 'Auriculares inalámbricos con sonido potente y batería de hasta 40 horas.',
            precio: 20999, // Precio actualizado
            calificacion: 4.7, // Calificación actualizada
            especificaciones: {
                conectividad: 'Bluetooth 5.0',
                duracion_bateria: '40 horas',
                color: 'Negro',
                peso: '160 g'
            }
        };

        it('debe actualizar un producto existente', async () => {
            // Primero obtenemos un ID válido
            const getResponse = await request(app).get('/api/productos');
            const productId = getResponse.body[0]?.id;

            const product = {
                nombre: 'Producto Temporal',
                descripcion: 'Producto temporal para pruebas',
                precio: 10000,
                calificacion: 4.0
            }
            
            if (!productId) {
                // Si no hay productos, creamos uno
                const createResponse = await request(app)
                    .post('/api/productos')
                    .send(product);
                productId = createResponse.body.id;
            }

            const response = await request(app)
                .put(`/api/productos/${productId}`)
                .send(updatedProduct);
            
            expect(response.status).toBe(200);
        });

        it('debe devolver un error al actualizar un producto que no existe', async () => {
            const response = await request(app)
                .put('/api/productos/9999')
                .send(updatedProduct);
            
            expect(response.status).toBe(404);
            expect(response.body.error).toBeDefined();
        });
    });

    describe('DELETE /api/productos/:id', () => {
        it('debe eliminar un producto existente', async () => {
            // Creamos un producto específico para esta prueba
            const productToDelete = {
                nombre: 'Producto para eliminar en test',
                url: 'https://example.com/productos/para-eliminar-test',
                descripcion: 'Producto temporal creado solo para la prueba de delete',
                precio: 12345,
                calificacion: 4.1,
                especificaciones: {
                    conectividad: 'Bluetooth 5.0',
                    duracion_bateria: '10 horas',
                    color: 'Rojo',
                    peso: '150 g'
                }
            };

            const createResponse = await request(app)
                .post('/api/productos')
                .send(productToDelete);

            expect(createResponse.status).toBe(201);
            const productId = createResponse.body.id;

            const deleteResponse = await request(app)
                .delete(`/api/productos/${productId}`);
            
            expect(deleteResponse.status).toBe(200);
            const getResponse = await request(app)
                .get(`/api/productos/${productId}`);
            
            expect(getResponse.status).toBe(404);
        });

        it('debe devolver un error al intentar eliminar un producto que no existe', async () => {
            const response = await request(app)
                .delete('/api/productos/999999');
            
            expect(response.status).toBe(404);
            expect(response.body.error).toBeDefined();
        });
    });
});