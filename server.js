/* eslint-disable no-console */
const express = require('express');
const next = require('next');
const { createServer } = require('https');
const fs = require('fs');

const devProxy = {
  '/api': {
    target: 'https://bixindex-backend-local.herokuapp.com/',
    pathRewrite: { '^/api': '' },
    changeOrigin: true,
  },
};

const host = '0.0.0.0';
const port = parseInt(process.env.PORT, 10) || 3002;
const env = process.env.NODE_ENV;
const dev = env !== 'production';
const app = next({
  dir: '.', // base directory where everything is, could move to src later
  dev,
});

const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync('./certificates/localhost.key'),
  cert: fs.readFileSync('./certificates/localhost.crt'),
};

let server;
app
  .prepare()
  .then(() => {
    server = express();

    // Set up the proxy.
    if (dev && devProxy) {
      const { createProxyMiddleware } = require('http-proxy-middleware');
      Object.keys(devProxy).forEach(function (context) {
        server.use(context, createProxyMiddleware(devProxy[context]));
      });
    }

    // Default catch-all handler to allow Next.js to handle all other routes
    server.all('*', (req, res) => handle(req, res));

    createServer(httpsOptions, server).listen(port, host, (err) => {
      if (err) {
        throw err;
      }
      console.log(`> Ready on port ${port} [${env}]`);
    });
  })
  .catch((err) => {
    console.log('An error occurred, unable to start the server');
    console.log(err);
  });
