var myModal = new bootstrap.Modal(document.getElementById('myModal'))





$(document).ready(function() {




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
  

        
      // $close.on('click',function(){
      //   $close.hide();
      //   $name.empty();
      //   stapel.closePile();
      // });  
  })



  $('#myBtn').click(()=>{
    myModal.show()

  })
})

