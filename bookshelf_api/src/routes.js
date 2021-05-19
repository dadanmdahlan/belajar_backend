/* eslint-disable linebreak-style */
/* eslint-disable object-curly-newline */
/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable comma-spacing */
/* eslint-disable linebreak-style */
const { addBookHandler, getBooksHandler ,updateBookHandler,deleteBookHandler} = require('./handler');

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
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: updateBookHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookHandler,
  },

];
module.exports = routes;
