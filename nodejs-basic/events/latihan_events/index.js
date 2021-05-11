const {EventEmitter} = require('events');
const myEventEmitter = new EventEmitter();

// fungsi yang akan dijalankan ketika event coffee-order terjadi

const makeCoffee =(name)=>{
   console.log(`kopi ${name} telah dibuat!`); 
}

const makeBill =(price)=>{
    console.log(`Bill sebesar ${price} telah dibuat!`);
}

// mendaftarkan fungsi makeCoffee sebagai listener event coffee-order

// myEventEmitter.on('coffee-order',makeCoffee);
// myEventEmitter.on('coffee-order',makeBill);

// satu fungsi untuk menangani beberapa event biasa fungsi ini memliki nama handler atau listener pada akhir penamaanya
// const onCoffeeOrderedListener =({name,price})=>{
//     makeCoffee(name);
//     makeBill(price);
// }
// myEventEmitter.on('coffee-order',onCoffeeOrderedListener);
// //memicu event 'coffee-order' terjadi

// myEventEmitter.emit('coffee-order',{name:'Tubruk',price:150000});

const onCoffeeOrderedListener = ({ name, price }) => {
    makeCoffee(name);
    makeBill(price);
}
 
myEventEmitter.on('coffee-order', onCoffeeOrderedListener);
 
myEventEmitter.emit('coffee-order', { name: 'Tubruk', price: 15000 });