const donutList = [
    {
        id:1,
        name:"Plum-Filled Ponchiki",
        description:"Soft, round donut filled with a fresh plum jelly and dusted with cake sugar.",
        image:"donut1.jpg"
    },
    {
        id:2,
        name:"Lemon Meringue Doughnut",
        description:"A delightfully zesty, lemon-flavoured donut with a lemon meringue topping.",
        image:"donut2.jpg"
    },
    {
        id:3,
        name:"D'Ohnut",
        description:"A classic vanilla donut with pink icing and colourful sprinkles. Every kid's favourite!",
        image:"donut3.jpg"
    },
    {
        id:4,
        name:"S'mores Doughnut",
        description:"Filled with house-made marshmallow cream and sprinkled with graham cracker crumbs.",
        image:"donut4.jpg"
    }
]

let donutsInCartList = new Array()
let donutsQuantity = 0

const donutPrice = 4.50
const discountPer = 0.1
const salesTax = 0.13
const discountDonuts = 6

class dountOrdered {
    constructor(name, quantity){
        this.name = name
        this.quantity = quantity
    }
    toString(){
        return `Name : ${this.name} Quantity : ${this.quantity} `;
    }
}

const getOrderByName = (name) => {

    for (let i = 0; i < donutsInCartList.length; i++) {
        if (donutsInCartList[i].name === name) {
            return donutsInCartList[i]
        }
    }
    return null
}

const getDonutById = (id) => {

    for(let i=0; i < donutList.length; i++){
        if(donutList[i].id === id){
            return donutList[i]
        }
    }
    return null
}

const displayDonuts = () => {

    
    for(let i=0; i < donutList.length; i++){

        document.querySelector("#donutList").innerHTML += `
        <div class="donutCard">
            <img class="image" src="assets/${donutList[i].image}"/>
            <p class="paraName">${donutList[i].name}</p>
            <p class="paraDesc">${donutList[i].description}</p>
            <button id="${donutList[i].id}" class="button">ADD TO CART</button> 
        </div>
        `
    }
}

const displayOrderDetails = () => {

   document.querySelector("#billLayout").innerHTML = `
   <h1>Your Items </h1>
   <p class="para">Here is summary of your order:</p>
   <hr>
       <div id ="orderedDonutList"> </div> 
   <hr>
       <div id = "donutPrice"></div>
   <p></p>
   `
}

const updateDonutInCart = () => {

    for (let i = 0; i < donutsInCartList.length; i++) {
        const currDonut = donutsInCartList[i];

        document.querySelector("#orderedDonutList").innerHTML += `
        <p>${currDonut.name}</p>
        <p class="paraQuan">QUANTITY: ${currDonut.quantity}</p
        `
     }
}


const displayDonutPrice = () => {

    results = [...calculatePrice(donutsQuantity)]

    if(results[3] !== 0 ){
        document.querySelector("#donutPrice").innerHTML += `
        <p class="redText">Discount Applied: -$${results[3]}</p>
        `
    }  

    document.querySelector("#donutPrice").innerHTML += `
    <div class="grid">
        <p>Subtotal: </p>
        <p class="blueText">$${results[0]}</p>
    </div>

    <div class="grid">
        <p>Tax: </p>
        <p class="blueText">$${results[1]}</p>
    </div>

    <div class="grid">
        <p>Total: </p>
        <p class="blueText">$${results[2]}</p>
    </div>
    
    `
          
}

const calculatePrice = (quantity) => {

    let results = []

    let subTotal = quantity * donutPrice

    let discount = 0

    if(quantity>discountDonuts){
        discount = subTotal * discountPer
        subTotal = subTotal - discount
    }

    let tax =  (subTotal) * salesTax
    let total = tax + subTotal

    results.push(parseFloat(subTotal.toFixed(2)))
    results.push(parseFloat(tax.toFixed(2)))
    results.push(parseFloat(total.toFixed(2)))
    results.push(parseFloat(discount.toFixed(2)))
    
    return results 
   
}



const containerClicked = (evt) => {

    const btnClicked = evt.target
    donutsQuantity++

    if(btnClicked.tagName === "BUTTON"){

        const id = parseInt(btnClicked.getAttribute("id"))
        console.log(id)

        const dountsInCart = getDonutById(id)
        console.log(dountsInCart.name)

        const orderName = getOrderByName(dountsInCart.name)
        console.log(orderName)

        if(orderName === null){

            donutsInCartList.push(new dountOrdered(dountsInCart.name, 1))


        }else {

            orderName.quantity += 1
        }

        displayOrderDetails()
        updateDonutInCart()
        displayDonutPrice()

    }
}


document.addEventListener("DOMContentLoaded", displayDonuts)
document.querySelector("#donutList").addEventListener("click", containerClicked)