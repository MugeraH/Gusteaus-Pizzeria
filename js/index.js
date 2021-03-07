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
  if (this.crust === "thick") {
    return 100;
  } else {
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
        'meatarian': ['Option1','Option2','Option3','Option4','Option5'],
        'vegetarian': ['select1','select2','select3','select4','select5'],
      
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
console.log(pizzaOrderPrices.reduce((a,b)=>a+b,0));
  $("#pizzaCategory ").val('');
 $("#pizzaOption ").val('');
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

totalCost = 0;


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



$("#total-amount").append(pizzaOrderPrices.reduce((a,b)=>a+b,0));



var collect = true;



$("form#deliveryForm").submit(function(event) {
  resetOrders()
  event.preventDefault();
  collect = false;
var customerName = $('#fullName').val();
var customerLocation = $('#location').val()

if(!collect){
  $('#checkoutText').text(`  Dear ${customerName} your order will be delivered to ${customerLocation} within
  two hours! Your order total is Ksh.${totalCost + 300} Our rider will call
  you on arrival or you can reach us at 0721000000 if you do not recieve any communication within the specific time period`)

$('.cart').fadeOut()
setTimeout(function(){location.reload(); }, 6000);
}

});

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





$('#myBtn').click(()=>{
  myModal.show()
})





  $(function(){
      var $grid = $("#tp-grid"),
        $name = $('#name'),
        $close = $('#close'),
        $loader = $('').insertBefore($grid),
        stapel = $grid.stapel({
          randomAngle: false,
          delay:50,
          gutter: 70,
          pileAngles : 1,
          onLoad: function(){
            $loader.remove();
          },
          onBeforeOpen : function(pileName){
             $name.html(pileName);
          },
          onAfterOpen : function (pileName){
            $close.show(500);
            $('#back').show()
          }
        });

        $('#back').click(()=>{
          $close.hide();
         $name.empty();
         stapel.closePile();
         $('#back').hide()
        })
  
  })






})

