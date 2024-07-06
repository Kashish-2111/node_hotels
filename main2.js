var fs = require('fs');
var os = require('os');

const notes = require('./notes.js')
var age= notes.age;
var name=notes.name;
console.log(`Hello! I am ${name} my age is ${age}`);
var result = notes.addNumber(age,18)
console.log(result);

var user = os.userInfo();
console.log(user); 
console.log(user.username);


fs.appendFile('greeting.txt','hi '+user.username+"!\n",()=>{
    console.log('file was written');
})  

console.log(os);
console.log(fs);


//using lodash library
var _ = require('lodash')
 
var data = ['person','person',1,2,1,2,'name','age','2'];
  var result = _.uniq(data);
  console.log(result)
  console.log(_.isString()) 