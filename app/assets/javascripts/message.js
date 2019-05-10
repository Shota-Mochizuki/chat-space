$(function(){
  function buildHTML(message){
    var html;
    if( message.image == null) {
      html = `<div class='message'>
                  <div class='upper-info'>
                    <p class='upper-info__user'>
                      ${message.user_name}
                    </p>
                    <p class='upper-info__date'>
                      ${message.created_at}
                    </p>
                  </div>
                  <p class='message__text'>
                    ${message.body}
                  </p>
                </div>`
    } else {
      html = `<div class='message'>
                  <div class='upper-info'>
                    <p class='upper-info__user'>
                      ${message.user_name}
                    </p>
                    <p class='upper-info__date'>
                      ${message.created_at}
                    </p>
                  </div>
                  <p class='message__text'>
                    ${message.body}
                  </p>
                  <img class="lower-message__image" src="${message.image}" />
                </div>`
    }
    return html;
  }
  $(document).on('submit','#new_message', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('#new_message')[0].reset();
      $(".new-message__submit-btn").attr('disabled', false);
      $('.messages').animate({scrollTop: $('.messages').get(0).scrollHeight});
      $('.messages').append(html)
    })
    .fail(function(){
      alert('error');
    })
  })
})