/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
/* eslint-disable linebreak-style */
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/Invariant');
const NotFoundError = require('../../exceptions/NotFoundError');

class SongsService {
  constructor() {
    this._song = [];
  }

  addSong({
    title, year, performer, genre, duration,
  }) {
    const id = `song-${nanoid(16)}`;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const newSong = {
      title,
      year,
      performer,
      genre,
      duration,
      id,
      insertedAt,
      updatedAt,
    };
    this._song.push(newSong);
    const isSuccess = this._song.filter((song) => song.id === id).length > 0;
    if (!isSuccess) {
      throw new InvariantError('Lagu gagal ditambahkan');
    }
    return id;
  }

  getSongs() {
    const songs = this._song.map((b) => ({
      id: b.id,
      title: b.title,
      performer: b.performer,
    }));
    return songs;
  }

  getSongById(songId) {
    const song = this_song.filter((n) => n.id === songId)[0];

    if (!song) {
      throw new NotFoundError('Lagu tidak ditemukan ');
    }
    return song;
  }

  editSongById(songId, {
    title, year, performer, genre, duration,
  }) {
    const index = this._song.findIndex((song) => song.id === songId);

    if (index === -1) {
      throw new NotFoundError('Gagal memperbarui lagu,Id tidak ditemukan');
    }

    const updatedAt = new Date().toISOString();
    this._song[index] = {
      ...this.song[index],
      title,
      year,
      performer,
      genre,
      duration,
      updatedAt,
    };
  }

  deleteSongById(songId) {
    const index = this._song.findIndex((song) => song.id === songId);

    if (index === -1) {
      throw new NotFoundError('Lagu gagal dihapus, Id tidak ditemukan');
    }
    this._song.splice(index, 1);
  }
}

module.exports = SongsService;
