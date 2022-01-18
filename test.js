const obj = [
  {
    name: "rahul",
    roll: 4,
  },
  {
    name: "Raj",
    roll: 2,
  },
  {
    name: "ron",
    roll: 42,
  },
  {
    name: "ramesh",
    roll: 44,
  },
  {
    name: "raul",
    roll: 32,
  },
];

obj.map((item) => console.log(item));
/* 
let newobj = obj.filter((item) => item.roll < 44) ; */

/* console.log(newobj); */

let changeValue = "Mani";

obj.map((item) =>
  item.name === "ron" ? (item.name = changeValue) : item.name
);

console.log(obj);
obj.map((item) => (item["quantity"] = 1));

console.log(obj);

let arr = [];

const addThis = (val) => {
  if (arr.length < 10) {
    arr.push(val);
    console.log(arr.join(" "));
  }
  if (arr.length > 10) {
    console.log("Limit exceeded");
  }
};

const revThis = (val) => {
  if (arr.length < 10) {
    arr = arr.filter((item) => item !== val);
    console.log(arr.join(" "));
  }
  if (arr.length === 0) {
    console.log("Array is Empty");
  }
};

addThis("First");
addThis("second");

arr.splice(1, 1);
console.log(arr);

let values = [1, 213, 12, 32, 14, 14, 55, 55, 56, 66, 44, 212, 3, 3, 11, 33, 4];

console.log(values.sort((a, b) => a - b));
