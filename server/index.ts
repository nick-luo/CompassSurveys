import { create, defaults, router } from 'json-server';
const server = create();

// Set default middlewares (logger, static, cors and no-cache)
server.use(defaults());

server.use(function(req, res, next) {
  setTimeout(next, 1000);
});

// Use default router
server.use(router(require('./db.json')));

server.listen(5000, () => {
  console.log('JSON Server is running');
});
