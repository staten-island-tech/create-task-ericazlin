import '../css/style.css'
import { products } from './products';

const DOMSelectors = {
    boom:document.querySelector(".boom"),
    mobs:document.querySelector("#mobs"),
    money:document.querySelector("#money"),
    change:document.querySelector("#change"),
    items:document.querySelector("#items"),
    customer:document.querySelector("#customer")
}

function displayitems(item){
    DOMSelectors.items.insertAdjacentHTML("beforeend",
    `<h1>${totalitems} ${item.name} -</h1> 
     <h1>$${priceCalc(randomitem,totalitems)}</h1>
    `);
}


const totalitems = Math.floor(Math.random()*5+1)

console.log(totalitems)

const randomitem = products[Math.floor(Math.random()*products.length)]

console.log(randomitem)

function priceCalc(item,total){
    const price = item.price*total
    return price

}
console.log(priceCalc(randomitem,totalitems))

displayitems(randomitem)