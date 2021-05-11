const fs = require('fs');
const {resolve} =require('path');
const readbleStream = fs.createReadStream(resolve(__dirname,'article.txt'),{
    highWaterMark:100
}
);

readbleStream.on('readable',()=>{
    try{
        process.stdout.write(`[${readbleStream.read()}]`);
    } catch(error){
        //catch the error when the chunk cannot be read
    }
});

readbleStream.on('end',()=>{
    console.log('Done');
});


// const fs = require('fs');
 
// const readableStream = fs.createReadStream('./article.txt', {
//     highWaterMark: 10
// });
 
// readableStream.on('readable', () => {
//     try {
//         process.stdout.write(`[${readableStream.read()}]`);
//     } catch(error) {
//         // catch the error when the chunk cannot be read.
//     }
// });
 
// readableStream.on('end', () => {
//     console.log('Done');
// });