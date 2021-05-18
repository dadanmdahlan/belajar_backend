const { addBookHandler, getBooksHandler } = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },
  {
    method: 'GET',
    path: '/books/{bookId?}',
    handler: getBooksHandler,
  },

];
module.exports = routes;
