import "../css/style.css";
import { products } from "./products";

const DOMSelectors = {
  boom: document.querySelector(".boom"),
  mobs: document.querySelector("#mobs"),
  money: document.querySelector("#money"),
  change: document.querySelector("#change"),
  items: document.querySelector("#items"),
  customer: document.querySelector("#customer"),
  totalprice: document.querySelector("#totalPrice"),
  btn: document.querySelector("#bttn"),
  given: document.querySelector("#given"),
  numAndItem: document.querySelector("#numAndItem"),
  cost: document.querySelector("#cost"),
  input: document.querySelector("#input"),
  reaction: document.querySelector("#reaction"),
  image: document.querySelector("#image"),
  list: document.querySelector("#list"),
  response: document.querySelector("#response"),
};
//scanned item
function displayItems(item, totalItems, payment, given) {
  DOMSelectors.numAndItem.insertAdjacentHTML(
    "beforeend",
    `<p class="displayed">${totalItems} ${item.name}</p>
    `
  );
  DOMSelectors.cost.insertAdjacentHTML(
    "beforeend",
    `<p class="displayed" id="costAmount">$${payment}</p>
    `
  );
  DOMSelectors.given.insertAdjacentHTML(
    "beforeend",
    `<p class="displayed" id="givenAmount">$${given}</p>
    `
  );
}

let currentChange = null;
let currentTotal = null;

function clear() {
  DOMSelectors.numAndItem.innerHTML = "";
  DOMSelectors.cost.innerHTML = "";
  DOMSelectors.given.innerHTML = "";
}

function priceCalc(item, total) {
  const price = item.price * total;
  return price;
}

function randomize() {
  const totalItems = Math.floor(Math.random() * 10 + 1);

  const index = Math.floor(Math.random() * products.length);

  const randomItem = products[index];

  //random payment amount
  const payment =
    priceCalc(randomItem, totalItems);

  const change = Math.floor(Math.random() * 27);

  const given = change + payment;

  currentChange = change;
  currentTotal = totalItems;

  return { randomItem, totalItems, payment, given };
}

function checkChange(currentChange) {
  let otherItems = []

  let overshoot = DOMSelectors.input.value - currentChange
  for (let index = 0; index < products.length; index++) {
    const item = products[index];
    if (item.price == overshoot) {
      otherItems.push(item)
    }
  }


  let otherItemNames = otherItems.map(item => item.name)
  console.log(otherItems, otherItemNames)

  if (DOMSelectors.input.value == currentChange) {
    DOMSelectors.response.innerHTML = "";
    DOMSelectors.list.innerHTML = "";
    DOMSelectors.image.innerHTML = "";

    DOMSelectors.response.insertAdjacentHTML(
      "beforeend",
      `
    <p class="response">Correct change, the customer is satisfied!</p>
    `
    );
    DOMSelectors.image.insertAdjacentHTML(
      "beforeend",
      `
    <img src="happycustomer.png" alt="the customer is happy" />
    `
    );
  } 
   else if (overshoot > 0 && otherItems.length > 0){
    DOMSelectors.response.innerHTML = "";
    DOMSelectors.list.innerHTML = "";
    DOMSelectors.image.innerHTML = "";

    DOMSelectors.response.insertAdjacentHTML(
      "beforeend",
      `
    <p class="response">Incorrect change, the customer is angry.</p>
    <p class="response" id="dependancies">You were up by $${Math.abs(overshoot)}.</p>
    <p class="response" id="dependancies">Now the customer can buy an extra of these items with the extra money:</p>
    `
    );
    otherItemNames.forEach(name => {
      DOMSelectors.list.insertAdjacentHTML(
        "beforeend",
        `
      <li>${name}</li>
      `
      );
    })
    DOMSelectors.image.insertAdjacentHTML(
      "beforeend",
      `
    <img src="angrycustomer.png" alt="the customer is angry" />
    `
    );
  }
  else if (otherItems.length == 0){
    DOMSelectors.response.innerHTML = "";
    DOMSelectors.list.innerHTML = "";
    DOMSelectors.image.innerHTML = "";

    DOMSelectors.response.insertAdjacentHTML(
      "beforeend",
      `
    <p class="response">Incorrect change, the customer is angry.</p>
    <p class="response" id="dependancies">You were off by $${Math.abs(overshoot)}.</p>
    `
    );
    otherItemNames.forEach(name => {
      DOMSelectors.list.insertAdjacentHTML(
        "beforeend",
        `
      <li>${name}</li>
      `
      );
    })
    DOMSelectors.image.insertAdjacentHTML(
      "beforeend",
      `
    <img src="angrycustomer.png" alt="the customer is angry" />
    `
    );
  }
  else if (overshoot < 0){
    DOMSelectors.response.innerHTML = "";
    DOMSelectors.list.innerHTML = "";
    DOMSelectors.image.innerHTML = "";

    DOMSelectors.response.insertAdjacentHTML(
      "beforeend",
      `
    <p class="response" id="dependancies">Incorrect change, the customer is dissatisfied.</p>
    <p class="response" id="dependancies">You were down by $${Math.abs(overshoot)}.</p>
    `
    );
    DOMSelectors.image.insertAdjacentHTML(
      "beforeend",
      `
    <img src="angrycustomer.png" alt="the customer is angry" />
    `
    );
  }
}

//credit to https://stackoverflow.com/questions/14542062/eventlistener-enter-key
DOMSelectors.input.addEventListener("keypress", function (e) {
  if (e.key == "Enter") {
    //end of credit
    clear();
    checkChange(currentChange);
    const { randomItem, totalItems, payment, given } =
      randomize();
    displayItems(
      randomItem,
      totalItems,
      payment,
      given
    );
    DOMSelectors.input.value = "";
  }
});

DOMSelectors.btn.addEventListener("click", function () {
  clear();
  checkChange(currentChange);
  const { randomItem, totalItems, payment, given } =
    randomize();
  displayItems(
    randomItem,
    totalItems,
    payment,
    given
  );
  DOMSelectors.input.value = "";
});

const { randomItem, totalItems, payment, given } =
  randomize();
displayItems(randomItem, totalItems, payment, given);