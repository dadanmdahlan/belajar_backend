// file system tipe async

const fs =require ('fs');

const fileReadCallback =(error,data) =>{
    if(error){
        console.log('Gagal membaca berkas');
        return;
    }
    console.log(data);
};
fs.readFile('todo.txt','UTF-8',fileReadCallback);


// versi synchronous fs.readFileSync()

/*const fs =require('fs');
    const data =fs.readFileSync('Todo.txt','UTF-8');
    console.log(data);
*/