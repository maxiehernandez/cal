$( document ).ready(function() {
  for (var key in sessionStorage){
   $('.last-calculations').append(
    '<p>' +
      sessionStorage.getItem(key) +
    '</p>')
  }
  $(document).on('click', ".box", function(){
    $(".final-answer").empty()
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
          sessionStorage.setItem(generateRandomString(), $('.display-calculation').text());
          $(".final-answer").html(data.result);
          $('.display-calculation').empty();
        })
        break;
    }
  })
});

function generateRandomString(){
  return Math.random().toString(36).substring(8);
}
