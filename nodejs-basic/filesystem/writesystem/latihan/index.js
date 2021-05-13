const fs = require('fs');
const {resolve} = require('path');
const readbleStream = fs.createReadStream(resolve(__dirname,'input.txt'),{
    highWaterMark:15
});
const writableStream = fs.createWriteStream(resolve(__dirname,'output.txt'));
readbleStream.on('readable',()=>{
    try{
        writableStream.write(`[${readbleStream.read()}]`);
        
    }catch(error){

    }
});
readbleStream.on('end',()=>{
    writableStream.end('akhir dari writable stream');
});