/* eslint-disable linebreak-style */
const routes = (handler) => [
  {
    method: 'POST',
    path: '/songs',
    handler: handler.postSongHandler,
    // postSongsHadler hanya menerima dan menyimpan "satu" lagu
  },
  {
    method: 'GET',
    path: '/songs',
    handler: handler.getSongsHandler,
    // getSongsHandler mengembalikan "banyak" lagu
  },
  {
    method: 'GET',
    path: '/songs/{songId}',
    handler: handler.getSongByIdHandler,
    // getSongByIdHandler mengembalikan "satu" lagu
  },
  {
    method: 'PUT',
    path: '/songs/{songId}',
    handler: handler.putSongByIdHandler,
    // putSongByIdHandler hanya menerima dan mengubah "satu"lagu
  },
  {
    method: 'DELETE',
    path: '/songs/{songId}',
    handler: handler.deleteSongByIdHandler,
    // deleteSongByIdHandler untuk menghapus satu song
  },
];
module.exports = routes;
