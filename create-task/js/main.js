import "../css/style.css";
import { products } from "./products";

const DOMSelectors = {
  boom: document.querySelector(".boom"),
  mobs: document.querySelector("#mobs"),
  money: document.querySelector("#money"),
  change: document.querySelector("#change"),
  items: document.querySelector("#items"),
  customer: document.querySelector("#customer"),
  totalprice: document.querySelector("#totalprice"),
  btn: document.querySelector("#bttn"),
  given: document.querySelector("#given"),
  numAndItem: document.querySelector("#numAndItem"),
  cost: document.querySelector("#cost"),
  input: document.querySelector("#input"),
  reaction: document.querySelector("#reaction"),
  image: document.querySelector("#image"),
};
//scanned item
function displayitems(item, item2, totalitems, payment, given) {
  DOMSelectors.numAndItem.insertAdjacentHTML(
    "beforeend",
    `<h2>${totalitems} ${item.name}</h2>
    <h2>${totalitems} ${item2.name}</h2>
    `
  );
  DOMSelectors.cost.insertAdjacentHTML(
    "beforeend",
    `<h2 id="costAmount">$${payment}</h2>
    `
  );
  DOMSelectors.given.insertAdjacentHTML(
    "beforeend", 
    `<h2 id="givenAmount">$${given}</h2>
    `
  )
}

let currentChange = null;
let currentTotal = null;

function clear() {
  DOMSelectors.numAndItem.innerHTML = ''
  DOMSelectors.cost.innerHTML = ''
  DOMSelectors.given.innerHTML = ''
}

function priceCalc(item, total) {
  const price = item.price * total;
  return price;
}

function randomize() {
  const totalitems = Math.floor(Math.random() * 5 + 1);

  const index = Math.floor(Math.random() * products.length)

  const randomitem = products[index];
  const randomitem2 = products[products.length - index];


  //random payment amount
  const payment = (priceCalc(randomitem, totalitems) + priceCalc(randomitem2, totalitems));

  const change = Math.floor(Math.random() * 27);

  const given = change + payment;

  currentChange = change;
  currentTotal = totalitems

  return { randomitem, randomitem2, totalitems, payment, given };
}

function checkChange(currentTotal) {

    let prices = []
    for (let index = 0; index < products.length; index++) {
      const item = products[index];
      let potential = priceCalc(item, currentTotal)

      prices.push(potential)
    }

    const otherItems = prices.filter(price => price == DOMSelectors.input.value).length

  if (DOMSelectors.input.value == currentChange) {
    DOMSelectors.reaction.innerHTML=''
    DOMSelectors.image.innerHTML = ''

    DOMSelectors.reaction.insertAdjacentHTML("beforeend",
    `
    <h1>Correct change, the customer is satisfied!</h1>
    `
    )
    DOMSelectors.image.insertAdjacentHTML("beforeend", 
    `
    <img src="happycustomer.png" alt="the customer is happy" />
    `
    )
  }
  else if(otherItems == 0){
    DOMSelectors.reaction.innerHTML= ''
    DOMSelectors.image.innerHTML = ''

    DOMSelectors.reaction.insertAdjacentHTML("beforeend",
    `
    <h1>Incorrect change, the customer is dissatisfied.</h1>
    `
    )
    DOMSelectors.image.insertAdjacentHTML("beforeend", 
    `
    <img src="angrycustomer.png" alt="the customer is angry" />
    `
    )
  }
  else{
    DOMSelectors.reaction.innerHTML= ''
    DOMSelectors.image.innerHTML = ''

    DOMSelectors.reaction.insertAdjacentHTML("beforeend",
    `
    <h1>Incorrect change, the customer is dissatisfied.</h1>
    <h1>However, you would've been right if it was one of ${otherItems} other items!</h1>
    `
    )
    DOMSelectors.image.insertAdjacentHTML("beforeend", 
    `
    <img src="angrycustomer.png" alt="the customer is angry" />
    `
    )
  }
}

DOMSelectors.btn.addEventListener("click", function () {
  clear();
  checkChange(currentTotal);
  const {randomitem, randomitem2, totalitems, payment, given} = randomize();
  displayitems(randomitem, randomitem2, totalitems, payment, given);
  DOMSelectors.input.value = ''
})

const {randomitem, randomitem2, totalitems, payment, given} = randomize();
displayitems(randomitem, randomitem2, totalitems, payment, given);