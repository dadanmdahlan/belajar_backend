const {EventEmitter} = require('events');
const myEmitter = new EventEmitter();

const namaSaya = (name)=>{
    console.log(`Happy birthday ${name}!`);
}
const umurSaya =(age) => {
    console.log(`my age is ${age}!`);
}

const birthdayEventListener = ({name,age}) => {
    namaSaya(name);
    umurSaya(age);
}

myEmitter.on('birthday',birthdayEventListener);
myEmitter.emit('birthday',{name:"Dadan Muhammad Dahlan", age:28});
