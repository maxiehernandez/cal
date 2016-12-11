$( document ).ready(function() {
  $(document).on('click', ".box", function(){
    var type = $(this).data().type
    if (type !== "=") {
      $('.display-calculation').append(type)
    }
    switch (type) {
      case 'C':
        $('.display-calculation').empty();
        $(".final-answer").empty()
        break;
      case '=':
        $.ajax({
          method: "GET",
          url: "/calculation",
          dataType: "json",
          data: {
            values: $('.display-calculation').text().replace("x", "*")
          }
        })
        .done(function(data){
          $(".final-answer").html(data.result);
        })
        break;
    }
  })
});
