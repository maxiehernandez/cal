$( document ).ready(function() {
  var sessionKeys = Object.keys(sessionStorage).sort().reverse()
  for (var i = 0; i < sessionKeys.length; i++) {
    if (i > 9) {
      break;
    }
    var key = sessionKeys[i];
    $('.last-calculations').append('<p>' + sessionStorage.getItem(key) + '</p>')
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
          var sessionKeys = Object.keys(sessionStorage);
          if (sessionKeys.length === 10 ) {
            sessionKeys.pop();
          }
          if (sessionKeys.length < 10 ) {
            sessionStorage.setItem(Date.now(), $('.display-calculation').text());
          }
          $(".final-answer").html(data.result);
          $('.display-calculation').empty();
        });
        break;
    }
  })

});
