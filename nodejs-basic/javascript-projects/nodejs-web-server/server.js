const { ok } = require('assert');
const http = require('http');
/**
 * Logika untuk menangani dan menanggapi request dituliskan pada fungsi ini
 * 
 * @param request: objek yang berisikan informasi terkait permintaan
 * @param response: objek yang digunakan untuk menanggapi permintaan
 */
// body request
// const requestListener = (request , response) => {
//     response.setHeader('Content-Type','text/html');
//     response.statusCode=200;

//     const {method} = request;

//     if(method === 'GET'){
//         response.end('<h1>Hello!</h1>');

//     }
//     if(method === 'POST'){
//         let body = [];
//         request.on('data' ,(chunk) => {
//             body.push(chunk);
//         });
//         request.on('end',() => {
//             body = Buffer.concat(body).toString();
//             const {name} = JSON.parse(body);
//             response.end(`<h1>Hai ,${name} !</h1>`);
//         });
        
//     }
//     if(method === 'PUT'){
//         response.end('<h1>Bounjour!</h1>');
//     }
//     if(method === 'DELETE'){
//         response.end('<h1>Salam!</h1>');
        
//     }

// };

// routing request
const requestListener = (request, response) =>{
    response.setHeader('Content-Type','application/json');
    response.setHeader('X-Powered-By','NodeJS');

    const {url,method} = request;

  if(url === '/'){
      if(method === 'GET'){
          response.statusCode =200;
          response.end(JSON.stringify({
              status:response.statusCode,
              message:'ini adalah homepage',})
              );
      } else{
        response.statusCode =400;
          response.end(JSON.stringify({
              message: `Halaman tidak dapat diakses dengan ${method} request`,})
            );
      }
  } else if(url === '/about'){
      if (method === 'GET'){
          response.statusCode =200;
          response.end(JSON.stringify({
              message:'Halo ini adalah halaman about',})
              );
      } else if( method === 'POST'){
          let body =[];
          request.on('data',(chunk) =>{
              body.push(chunk);
          });
          request.on('end',()=>{
            body=Buffer.concat(body).toString();
            const {name} = JSON.parse(body);
            response.statusCode =200;
            response.end(JSON.stringify({
                message:`Halo, ${name} ! ini adalah halaman about`,
            }));
          });
      } else{
          response.statusCode =400;
          response.end(JSON.stringify({
              message: `Halaman tidak dapat diakses menggunakan ${method} request`,
          }));
      }
  } else{
    response.statusCode =404;
    response.end(JSON.stringify({
        message:`Halaman tidak ditemukan `,
    }));
  }
};

const server = http.createServer(requestListener);


const port =5000;
const host ='localhost';

server.listen(port,host,()=>{
    console.log(`Server berjalan pada http://${host}:${port}`);
});
