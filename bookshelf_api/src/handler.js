const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  let finished = false;
  if (pageCount === readPage) {
    finished = true;
  }

  if (name === '') {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    }).code(400);
    return response;
  }
  if (pageCount < readPage) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
    return response;
  }

  const newBook = {
    name, year, author, summary, publisher, pageCount, readPage, reading, id, insertedAt, updatedAt, finished,
  };

  books.push(newBook);
  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    }).code(201);
    return response;
  }
  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  }).code(500);
  return response;
};

const getBooksHandler = (request, h) => {
  const { bookId } = request.params;
  if (bookId !== undefined) {
    const book = books.filter((b) => b.id === bookId)[0];
    if (book === undefined) {
      const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
      }).code(404);
      return response;
    }
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }
  const { name, reading, finished } = request.query;

  if (name !== undefined) {
    const getBookByQuery = books.filter((b) => b.name.toLowerCase() === name.toLowerCase())[0];
    if (getBookByQuery !== undefined) {
      return {
        status: 'success',
        data: {
          getBookByQuery,
        },
      };
    }
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    }).code(404);
    return response;
  }

  if (reading !== undefined) {
    const getBookByQuery = books.filter((b) => b.reading === (reading === 1))[0];
    return {
      status: 'success',
      data: {
        getBookByQuery,
      },
    };
  }

  if (finished !== undefined) {
    const getBookByQuery = books.filter((b) => b.finished === (finished === 1))[0];
    return {
      status: 'success',
      data: {
        getBookByQuery,
      },
    };
  }
  return {
    status: 'success',
    data: {
      books,
    },
  };
};
module.exports = { addBookHandler, getBooksHandler };
