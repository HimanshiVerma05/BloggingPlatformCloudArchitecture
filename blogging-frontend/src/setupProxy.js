/*const { createProxyMiddleware } = require('http-proxy-middleware');
import config from './config';

module.exports = function (app) {
  // Proxy for authentication endpoints
  app.use(
    createProxyMiddleware('api/auth/login', {
      target: config.REACT_APP_API_URL,
      changeOrigin: true,
    })
  );

    // Proxy for authentication endpoints
    app.use(
      createProxyMiddleware('api/auth/register', {
        target: config.REACT_APP_API_URL,
        changeOrigin: true,
      })
    );
  
};*/
