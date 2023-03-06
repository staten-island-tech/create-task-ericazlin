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
function displayitems(item, totalitems, given) {
  DOMSelectors.numAndItem.insertAdjacentHTML(
    "beforeend",
    `<h2>${totalitems} ${item.name}</h2>
    `
  );
  DOMSelectors.cost.insertAdjacentHTML(
    "beforeend",
    `<h2 id="costAmount">$${priceCalc(item,totalitems)}</h2>
    `
  );
  DOMSelectors.given.insertAdjacentHTML(
    "beforeend", 
    `<h2 id="givenAmount">$${given}</h2>
    `
  )
}

let currentChange = null;

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

  const randomitem = products[Math.floor(Math.random() * products.length)];

  //random payment amount
  const payment = priceCalc(randomitem, totalitems);

  const change = Math.floor(Math.random() * 27);
  console.log(change);

  const given = change + payment;

  currentChange = change;

  return { randomitem, totalitems, given};
}

function checkChange() {
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
  else {
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
}

DOMSelectors.btn.addEventListener("click", function () {
  clear();
  checkChange();
  const {randomitem, totalitems, given} = randomize();
  displayitems(randomitem, totalitems, given);
  DOMSelectors.input.value = ''
})

const {randomitem, totalitems, given} = randomize();
displayitems(randomitem, totalitems, given);