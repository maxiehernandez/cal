$( document ).ready(function() {
  var count = 0;
  for (var key in sessionStorage){
    count += 1;
    if (count >= 11) {
      break;
    }
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
      if ($(".display-calculation").text().includes("√")) {
        calculation = $('.display-calculation').text().replace('√', 'sqrt(' + $('.display-calculation').text().replace('√', "") + ')').split(")")[0] + ")"
      }else {
        calculation = $('.display-calculation').text().replace("x", "*")
      }
        $.ajax({
          method: "GET",
          url: "/calculation",
          dataType: "json",
          data: {
            values: calculation
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
