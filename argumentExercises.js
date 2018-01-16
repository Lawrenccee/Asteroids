// function sum() {
//   const args = Array.from(arguments);
//   let total = 0;
//
//   args.forEach((el) =>  {
//     total += el;
//   });
//
//   return total;
// }
//
// function sum2(...args) {
//   let total = 0;
//
//   args.forEach((el) =>  {
//     total += el;
//   });
//
//   return total;
// }
//
// console.log(sum(1, 2, 3, 4) === 10);
// console.log(sum(1, 2, 3, 4, 5) === 15);
// console.log(sum2(1, 2, 3, 4) === 10);
// console.log(sum2(1, 2, 3, 4, 5) === 15);

// Function.prototype.myBind = function(context, ...bindArgs) {
//   return (...callArgs) => {
//     this.apply(context, bindArgs.concat(callArgs));
//   };
// };
//
//
// Function.prototype.myBind2 = function(context) {
//   const that = this;
//   const bindArgs = Array.from(arguments).slice(1);
//
//   return function() {
//     const callArgs = Array.from(arguments);
//     that.apply(context, bindArgs.concat(callArgs));
//   };
// };
//
//
// function curriedSum(numArgs) {
//   const numbers = [];
//
//   function _curriedSum(num) {
//     numbers.push(num);
//
//     if (numbers.length === numArgs) {
//       let result = 0;
//       numbers.forEach((el) => {
//         result += el;
//       });
//
//       return result;
//     }
//       return _curriedSum;
//   }
//
//   return _curriedSum;
// }
//
// const sum = curriedSum(4);
// console.log(sum(5)); // => 56
// console.log(sum(30)(20)(1)); // => 56

Function.prototype.curry = function(numArgs) {
  const args = [];

  const _curry = (arg) => {
    args.push(arg);

    if (args.length === numArgs) {
      return this.apply(null, args);
    } else {
      return _curry;
    }
  };

  return _curry;
};

Function.prototype.curry2 = function(numArgs) {
  const args = [];

  const _curry = (arg) => {
    args.push(arg);

    if (args.length === numArgs) {
      return this.call(null, ...args);
    } else {
      return _curry;
    }
  };

  return _curry;
};

function sumThree(num1, num2, num3) {
  return num1 + num2 + num3;
}

console.log(sumThree.curry(3)(4)(20)(6)); // == 30);
