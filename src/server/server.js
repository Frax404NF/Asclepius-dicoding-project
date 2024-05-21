require('dotenv').config();

const Hapi = require('@hapi/hapi');
const routes = require('../server/routes');
const loadModel = require('../services/loadModel');
const InputError = require('../exceptions/InputError');

(async () => {
    const server = Hapi.server({
        port: 3000,
        host: '0.0.0.0',
        routes: {
            cors: {
              origin: ['*'],
            },
        },
    });

    const model = await loadModel();
    server.app.model = model;

    server.route(routes);

    server.ext('onPreResponse', function (request, h) {
        const response = request.response;

        if (response.isBoom) {
          const statusCode = response instanceof InputError ? response.statusCode : response.output.statusCode;
          const newMessage = statusCode === 413
            ? 'Payload content length greater than maximum allowed: 1000000'
            : 'Terjadi kesalahan dalam melakukan prediksi';

          const newResponse = h.response({
            status: 'fail',
            message: newMessage,
          });

          newResponse.code(statusCode);

          return newResponse;
        }

        return h.continue;
      });


    await server.start();
    console.log(`Server start at: ${server.info.uri}`);
})();