const routes =[
    {
        method:'GET',
        path:'/',
        handler: (request,h) => {
            return 'Homepage';
        },        
    },
    {
        method:'*',
        path:'/',
        handler: (request,h) => {
            return 'Halaman tidak dapat diakses dengan method tersebut';
        },        
    },
    {
        method:'GET',
        path:'/about',
        handler: (request,h) => {
            return 'About Page';
        },          
    },
    {
        method:'*',
        path:'/about',
        handler: (request,h) => {
            return 'Halaman tidak dapat diakses dengan method tersebut';
        },          
    },
    {
        method:'GET',
        path:'/hello/{username?}',
        handler: (request,h) => {
            const {username='Stranger'} = 
            request.params;

            // query parameter dengan menambahkan '?'diakhir parameter formatnya key=value contoh : localhost:5000?name=harry&location=bali
            const { lang } =request.query;

            if (lang ==='id'){
                return `Hai  ${username} !`;
            }
            return `Hello  ${username} !`;
        },          
    },
    {   
        // payload/ body request
        method:'POST',
        path:'/login',
        handler:(request , h) => {
            const {username,password} = request.payload;
            return `Welcome ${username}`;
        }
    },
    {
        // untuk membuat route dinamis pakai yg dibawah  tapi route dinamis akan kalah prioritas dengan route spesifik
        method:'*',
        path:'/{any*}', // untuk menambahka parameter pada routing tambahkan {parameter pada path} misalnya path : '/users/{username}, parameter opstional tammbahkan ? setelah nama parameternya 
        handler: (request,h) => {

            // untuk menyimpan parameter yg di parsing gunakan request.params
            // contoh
            // const {username} = request.params, optional const {username='Dadan'} = request.params 
            //  return `hello, ${username}!`;
            return 'Halaman Tidak ditemukan';
        },          
    },
];

module.exports =routes;