let a = prompt("Enter a First Number")
let b = prompt("Enter a Second Number")

if(isNaN(a) || isNaN(b)){
    throw SyntaxError("Sorry it is not Allowed")
}

let sum = parseInt(a) + parseInt(b)


try {
    console.log("The Sum is", sum * x)

}catch(error){
    console.log("There is an Error")
}
