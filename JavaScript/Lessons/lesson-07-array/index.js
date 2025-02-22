// let arr = [1,2,3,4,5,6];

// console.log(arr);
// console.log(arr.length);
// console.log(arr[0]);
// console.log(arr[3]);
// console.log(arr[5]);

// console.log(arr.toString());
// console.log(arr.join(" and "));
// console.log(arr.pop());
// console.log(arr);
// console.log(arr.push(100));
// console.log(arr);
// console.log(arr.shift());
// console.log(arr);
// console.log(arr.unshift(23));
// console.log(arr);

// delete arr[5];

// console.log(arr);
// console.log(arr.length);

// let a1 = [1,2,3];
// let a2 = [4,5,6];
// let a3 = [7,8,9];

// console.log(a1.concat(a2, a3));


// let num = [9,5,7];

// console.log(num.sort());


// let num = [1,2,3,4];

// console.log(num.splice(1,2));
// console.log(num);

// for(let i = 0; i < num.length; i++) {
//     console.log(num[i]);
// }

// num.forEach((value, index, arr) => {
//     console.log(value, index, arr);
// })


// let arr = [1, 13, 5 ,7, 11];
// let newArr = []
// for (let index = 0; index < arr.length; index++) {
//     const element = arr[index];
//     newArr.push(element**2)
// }

// let newArr = arr.map((e, index, array)=>{
//     return e**2
// })

// console.log(newArr)
// const greaterThanSeven = (e)=>{
//     if(e>7){
//         return true
//     }
//     return false
// }
// console.log(arr.filter(greaterThanSeven))

let arr2 = [1,2,3,4,5,6]

const red = (a, b)=>{
    return a+b
}

console.log(arr2.reduce(red))