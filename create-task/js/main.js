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
    `<h2>$${priceCalc(item,totalitems)}</h2>
    `
  );
  DOMSelectors.given.insertAdjacentHTML(
    "beforeend", 
    `<h2>$${given}</h2>
    `
  )
}

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
  const payment = priceCalc(randomitem, totalitems)

  const change = Math.floor(Math.random()*27) ;

  const given = change+payment
  console.log(given)

  displayitems(randomitem, totalitems, given);
}


DOMSelectors.btn.addEventListener("click", function () {
  clear();
  randomize();
})

randomize()