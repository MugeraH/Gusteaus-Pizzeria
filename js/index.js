//business logic

function Pizza(pizza, size, crust, topping,amount) {
  this.pizza = pizza;
  this.size = size;
  this.crust = crust;
  this.topping = topping;
  this.amount = amount;

}

var priceSize, priceCrust, priceTopping,pizzaAmount;
var myModal = new bootstrap.Modal(document.getElementById('myModal'))
var checkoutModal = new bootstrap.Modal(document.getElementById('checkoutModal'))


//Get topping price
Pizza.prototype.getToppingPrice = function () {
  switch (this.size) {
      case "large":
      return 200
        break;
    case "medium":
      return 150
        break;
    case "small":
      return 100
        break;
    default:
              
        return null;
};
};

//Get Crust price
Pizza.prototype.getCrustPrice = function () {
  if (this.crust === "crispy") {
    return 100;
  } else if (this.crust === "stuffed") {
    return 200;
  } else if (this.crust === "glutten-free") {
    return 150;
  }
  else {
    return 0;
  }
};

//Get pizza size price
Pizza.prototype.getPizzaSizePrice = function () {
  switch (this.size) {
  
    case "large":
      return 1500
        break;
    case "medium":
      return 1000
        break;
    case "small":
      return 800
        break;
    default:
              
        return null;
};
};

//Get total pizza price
Pizza.prototype.getPizzaPrice = function () {
   return (this.getCrustPrice() + this.getToppingPrice() + this.getPizzaSizePrice())* this.amount;
};





//user logic
$(document).ready(function() {

  $(function($) {
    var Options = {
        'meatarian': ['...','Chicken sumbreno','Pork Delight','Steakhouse pizza','Art-Chicken-Pesto pizza','Bbq-chicken pizza' , 'Chicken-fajita pizza','Bacon-chicken club pizza','Buffalo chicken pizza'],
        'vegetarian': ['...','Stuffed spinach Pizza','Tomato Pizza',' Mushroom Broccoli Pizza','Garlic Crust Veggie Pizza','Wild Mushroom Pizza','Cauliflower Pizza Crust','Kale ricotta'],
          }

    var $Options = $('#pizzaOption');
    $('#pizzaCategory').change(function () {
        var pizzaCategory = $(this).val(), pizzas = Options[pizzaCategory] || [];

        var html = $.map(pizzas, function(pizza){
            return '<option value="' + pizza + '">' + pizza + '</option>'
        }).join('');
        $Options.html(html)
    });
});

let pizzaOrders = []
let pizzaOrderPrices = []

$("form").submit(function(event) {
  event.preventDefault();
  let pizzaName = $("#pizzaOption option:selected").val();
  let pizzaSize = $("#pizzaSize option:selected").val();
  let pizzaCrust = $("#crust option:selected").val();
  let pizzaTopping = $("#topping option:selected").val();
  let pizzaAmount = parseInt($("#amount").val());



newPizzaOrder = new Pizza(pizzaName,pizzaSize,pizzaCrust,pizzaTopping,pizzaAmount)
pizzaOrders.push(newPizzaOrder)
pizzaOrderPrices.push(newPizzaOrder.getPizzaPrice())



  $("#pizzaCategory ").val('');
 $("#pizzaOption ").val('...');
 $("#pizzaSize ").val('');
   $("#crust ").val('');
   $("#topping ").val('');
   $("#amount").val( '');

if(pizzaOrders.length >= 1 ){
  $('.cart').fadeIn()
  $('#cart-count').text(`${pizzaOrders.length}`)
  $('#card').click(()=>{
    newPizzaOrder.getPizzaPrice()
  })
}

var resetOrders = ()=>{
pizzaOrders = []
  $("#order-summary").empty()
}



$("#order-summary").append(
  "<tr>" +
    '<th scope="row">' +
      newPizzaOrder.pizza +
    " (" +
      newPizzaOrder.size +
    ") - Ksh." +
  newPizzaOrder.getPizzaSizePrice() +
    "</th>" +
    "<td>" +
    newPizzaOrder.topping +
    " - Ksh." +
  newPizzaOrder.getToppingPrice() +
    "</td>" +
    "<td>" +
      newPizzaOrder.crust +
    " - Ksh." +
  newPizzaOrder.getCrustPrice() +
    "</td>" +
    "<td>" +
  newPizzaOrder.amount +
    "</td>" +
    "<td>" + 'Ksh.'+
    newPizzaOrder.getPizzaPrice() +
        "</td>" +
    "</tr>"
);



totalCost = pizzaOrderPrices.reduce((a,b)=>a+b,0);

let costWithDelivery = totalCost + 300
console.log(costWithDelivery);

$("#total-amount").text(totalCost);



var collect = true;



$("form#deliveryForm").submit(function(event) {
  resetOrders()
  event.preventDefault();
  collect = false;
var customerName = $('#fullName').val();
var customerLocation = $('#location').val()

if(!collect){

  $('#checkoutText').text(`  Dear ${customerName} your order will be delivered to ${customerLocation} within
  two hours! Your order total is Ksh.${costWithDelivery} Our rider will call
  you on arrival or you can reach us at 0721000000 if you do not recieve any communication within the specific time period`)

$('.cart').fadeOut()
setTimeout(function(){location.reload(); }, 6000);
}

});


$('#myBtn').click(()=>{
  myModal.show()
})

$('#deliveryBtn').click(()=>{
  $('#collectOption > button').fadeOut(200)
  $('.delivery-form > form').fadeIn(500)
   })


$('.checkoutBtn').click(()=>{
resetOrders()
  myModal.hide()
  checkoutModal.show()
  if(collect){
    $('#checkoutText').text(`Dear Customer your order will be ready within the hour! Your order total is Ksh.${totalCost}.For any inquries you can reach us at 0721000000`);
  
     $('.cart').fadeOut()

     setTimeout(function(){location.reload(); }, 6000);
  }
})


});


















})







