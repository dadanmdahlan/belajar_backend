/* eslint-disable no-const-assign */
/* eslint-disable linebreak-style */
/* eslint-disable no-shadow */
/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
/* eslint-disable object-curly-newline */
/* eslint-disable comma-spacing */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;

  if (!name) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    }).code(400);
  }
  if (pageCount < readPage) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
  }

  const newBook = {
    name, year, author, summary, publisher, pageCount, readPage, reading, id, insertedAt, updatedAt, finished,
  };

  books.push(newBook);
  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    return h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    }).code(201);
  }
  return h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  }).code(500);
};

const getBooksHandler = (request, h) => {
  /* cari data detail buku
  ==================================== */
  const { bookId } = request.params;
  if (bookId !== undefined) {
    const book = books.filter((b) => b.id === bookId)[0];
    if (book === undefined) {
      return h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
      }).code(404);
    }
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }
  /* query berdasarkan nilai parameter name, reading ,finished */
  const { name, reading, finished } = request.query;
  if (name) {
    return {
      status: 'success',
      data: {
        books: books
          .filter((b) => b.name.toLowerCase().includes(name.toLowerCase()))
          .map((b) => ({
          id: b.id,
          name: b.name,
          publisher: b.publisher,
        })),
      },
    };
  }
  if (reading) {
      return {
      status: 'success',
      data: {
        books: books
          .filter((b) => b.reading === (reading === '1'))
          .map((b) => ({
          id: b.id,
          name: b.name,
          publisher: b.publisher,
        })),
      },
    };
  }
  if (finished) {
    return {
      status: 'success',
      data: {
        books: books
        .filter((b) => b.finished === (finished === '1'))
        .map((b) => ({
          id: b.id,
          name: b.name,
          publisher: b.publisher,
        })),
      },
    };
  }

  // query all data buku

  return {
    status: 'success',
    data: {
      books: books.map((b) => ({
        id: b.id,
        name: b.name,
        publisher: b.publisher,
      })),
    },
  };
};
// update data buku
const updateBookHandler = (request, h) => {
  const { bookId } = request.params;
  // eslint-disable-next-line linebreak-style
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;
  const updatedAt = new Date().toISOString();
  if (!name) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    }).code(400);
  }
  if (pageCount < readPage) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
  }
  const index = books.findIndex((b) => b.id === bookId);
  if (index === -1) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    }).code(404);
  }
  books[index] = {
    ...books[index],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    updatedAt,
  };
  return h.response({
    status: 'success',
    message: 'Buku berhasil diperbarui',
  }).code(200);
};
// delete data buku
const deleteBookHandler = (request, h) => {
  const {bookId} = request.params;
  const index = books.findIndex((b) => b.id === bookId);
  if (index === -1) {
    return h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    }).code(404);
  }
  books.splice(index, 1);
  return h.response({
    status: 'success',
    message: 'Buku berhasil dihapus',
  }).code(200);
};
module.exports = { addBookHandler, getBooksHandler, updateBookHandler,deleteBookHandler};
