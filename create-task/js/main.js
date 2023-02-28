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
};

function displayitems(item) {
  DOMSelectors.items.insertAdjacentHTML(
    "beforeend",
    `<h2>${totalitems} ${item.name}</h2>
    `
  );
  DOMSelectors.totalprice.insertAdjacentHTML(
    "beforeend",
    `<h2>$${priceCalc(randomitem,totalitems)}</h2>
    `
  );
}

const totalitems = Math.floor(Math.random() * 5 + 1);
console.log(totalitems);

const randomitem = products[Math.floor(Math.random() * products.length)];
console.log(randomitem);

function priceCalc(item, total) {
  const price = item.price * total;
  return price;
}
console.log(priceCalc(randomitem, totalitems));
displayitems(randomitem);

//random payment amount
const payment = priceCalc(randomitem, totalitems)

const change = Math.floor(Math.random()*27) ;
console.log(change)

const given = change+payment
console.log(given)