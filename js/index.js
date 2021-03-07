//business logic

function Pizza(pizza, size, crust, toppings) {
  this.pizza = pizza;
  this.size = size;
  this.crust = crust;
  this.toppings = toppings;
  this.amount = amount;
}

var priceSize, priceCrust, priceTopping,pizzaAmount;
var myModal = new bootstrap.Modal(document.getElementById('myModal'))
var checkoutModal = new bootstrap.Modal(document.getElementById('checkoutModal'))

//calculate pizza price
Pizza.prototype.price = function(pizzaSize, pizzaCrust, pizzaTopping,pizzaAmount) {
  switch (pizzaSize) {
      case "":
          priceSize = 0;
          break;
      case "large":
          priceSize = 1000;
          break;
      case "medium":
          priceSize = 800;
          break;
      case "small":
          priceSize = 550;
          break;
      default:
          
          alert("Please fill out your order");
          return null;
  };

  switch (pizzaCrust) {
      case "":
          priceCrust = 0;
          break;
      case "crispy":
          priceCrust = 100;
          break;
      case "stuffed":
          priceCrust = 200;
          break;
      case "gluten":
          priceCrust = 150;
          break;
      default:
        alert("Please fill out your order");
        return null;
  };

  if (pizzaSize == 'large') {
      priceTopping = pizzaTopping.length * 150;
  } else if (pizzaSize == 'medium') {
      priceTopping = pizzaTopping.length * 100;
  } else if (pizzaSize == 'small') {
      priceTopping = pizzaTopping.length * 50;
  }

  var pizzaTotal = (priceSize + priceCrust + priceTopping) * pizzaAmount;
  return pizzaTotal;
}



//user logic
$(document).ready(function() {

  // $("#order-summary").append(
  //   "<tr>" +
  //     '<th scope="row">' +
  //     newPizza.type +
  //     " (" +
  //     newPizza.size +
  //     ") - " +
  //     newPizza.getTypePrice() +
  //     "</th>" +
  //     "<td>" +
  //     newPizza.topping +
  //     " - " +
  //     newPizza.getToppingPrice() +
  //     "</td>" +
  //     "<td>" +
  //     newPizza.crust +
  //     " - " +
  //     newPizza.getCrustPrice() +
  //     "</td>" +
  //     "<td>" +
  //     newPizza.getPizzaPrice() +
  //     "</td>" +
  //     "</tr>"
  // );

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


$("form").submit(function(event) {
  event.preventDefault();


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

