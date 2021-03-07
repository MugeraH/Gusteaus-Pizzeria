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
Pizza.prototype.getToppingPrice = function (pizzaSize) {
  switch (pizzaSize) {
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
                alert("Please fill out your order");
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
Pizza.prototype.getPizzaSizePrice = function (pizzaSize) {
  switch (pizzaSize) {
  
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
                alert("Please fill out your order");
        return null;
};
};

//Get total pizza price
Pizza.prototype.getPizzaPrice = function () {
  return (this.getCrustPrice() + this.getToppingPrice() + this.getPizzaSizePrice())* pizzaAmount;
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
$("form").submit(function(event) {
  event.preventDefault();
  let pizzaName = $("#pizzaOption option:selected").val();
  let pizzaSize = $("#pizzaSize option:selected").val();
  let pizzaCrust = $("#crust option:selected").val();
  let pizzaTopping = $("#topping option:selected").val();
  let pizzaAmount = $("#amount").val();




  newPizzaOrder = new Pizza(pizzaName,pizzaSize,pizzaCrust,pizzaTopping,pizzaAmount)
  pizzaOrders.push(newPizzaOrder)

if(pizzaOrders.length >= 1 ){
  $('.cart').fadeIn()
  $('#cart').text(`${pizzaOrders.length}`)
}

// for (let i = 0; i < pizzasOrders.length; i++) {
//   totalCost += pizzasOrders[i].getPizzaPrice();
// }





});





$('#myBtn').click(()=>{
  myModal.show()

})

$('.checkoutBtn').click(()=>{
  myModal.hide()
  checkoutModal.show()

})

$('#deliveryBtn').click(()=>{
 $('#collectOption > button').fadeOut(200)
 $('.delivery-form > form').fadeIn(500)
 console.log('hm');

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

