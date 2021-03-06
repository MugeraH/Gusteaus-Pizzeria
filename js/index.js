$(document).ready(function() {


  $(function(){
    let $grid = $("#tp-grid"),
        $name = $('#name'),
        $close = $('#close'),
        $loader = $('').insertBefore($grid),
        stapel = $grid.stapel({
          randomAngle: true,
          delay:50,
          gutter: 80,
          pileAngles : 1,
          onLoad: function(){
            $loader.remove();
          },
          onBeforeOpen : function(pileName){
             $name.html(pileName);
          },
          onAfterOpen : function (pileName){
            $close.show(500);
          }
        });
  
      $close.on('click',function(){
        $close.hide();
        $name.empty();
        stapel.closePile();
      });  
  })
  
  // $('#order').click(()=>{
  //       $('.aside-section').toggleClass('aside-section_active')
  // })


})

