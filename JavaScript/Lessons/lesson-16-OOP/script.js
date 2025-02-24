// let obj = {
//     a: 1,
//     b: "Harry"
// }

// console.log(obj)

// let animal = {
//     eats: true
// };

// let rabbit = {
//     jumps: true
// };

// rabbit.__proto__ = animal; // sets rabbit.[[Prototype]] = animal


// class Animals {
//     constructor(name) {
//         this.name = name
//         console.log("Object is creating...")
//     }

//     eats(){
//         console.log("I am Eating..")
//     }

//     jumps(){
//         console.log("I am Jumping..")
//     }
// }


// class Lion extends Animals {
//     constructor(name) {
//         super(name)
//         console.log("Object is creating and it is Lion")
//     }

//     eats(){
//         super.eats()
//         console.log("I am Eating with Roaring ...")
//     }
// }

// let a = new Animals("Bunny");
// console.log(a)

// let l = new Lion("Tiger")
// console.log(l)


class User {

    constructor(name) {
      // invokes the setter
      this.name = name;
    }
  
    get name() {
      return this._name;
    }
  
    set name(value) {
      if (value.length < 4) {
        console.log("Name is too short.");
        return;
      }
      this._name = value;
    }
  
  }
  
  let user = new User("John");
  console.log(user.name); // John
  
  user.name = "" // Name is too short.
  console.log(user.name)