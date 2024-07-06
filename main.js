let a =10;
console.log(a);


function add1(a,b){
    return a+b;
}
let result = add1(2,4)
console.log(result)

// (function(){
//     console.log("hello world")
// })();   //running func without calling it


// callback func 

function callback(){
    console.log("adding is successfully completed")
}
const add= function(a,b,callback){
    var result = a+b;
    console.log('result:' + result)
    callback();
}

add(2,3,callback);

// or 

const add2= function(a,b,func){
    var result = a+b;
    console.log('result:' + result)
    func();
}
add2(2,3,function(){
    console.log("adding is successfully completed")
});

//add3(2,3,()=>console.log('addition successful'))