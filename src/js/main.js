import {pi,Foo,power} from './lib';
import bookService from './bookService';

console.log(bookService.getBook());
console.log(pi);
console.log(power(pi,pi));

const f = new Foo();
console.log(f.foo());
console.log(f.bar);