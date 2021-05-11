const fs = require ('fs');
const {resolve} = require ('path');
const fileReadCallback =(error, data) =>{
    if(error){
        console.log("gagal memuat data");
        return;
    }
    console.log(data);
};
 fs.readFile(resolve(__dirname,'note.txt'),'UTF-8',fileReadCallback);
