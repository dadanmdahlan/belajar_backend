const fs = require('fs');
const {resolve} = require('path');
const writableStream = fs.createWriteStream(resolve(__dirname,'output.txt'));
writableStream.write('ini merupakan text baris pertama !\n');
writableStream.write('ini merupakan text baris kedua !\n');
writableStream.write('ini merupakan text baris keiga !\n');
writableStream.end('akhir dari writable stream');

