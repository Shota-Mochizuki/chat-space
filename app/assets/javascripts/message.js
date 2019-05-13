$(function(){
  function buildHTML(message){
    var img = message.image ? `<img class="lower-message__image" src="${message.image}" />` : '' ;
    var html = `<div class='message' data-message-id='${message.id}'>
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
                  ${img}
                </div>`
    return html;
  }
  var reloadMessages = function() {
    var last_message_id = $('.message').length ? $('.message:last').data('messageId') : 0 ;
    var current_group_id = $('.current-group__name').data('groupId');
    var url = `/groups/${current_group_id}/api/messages`;
    $.ajax({
      url: url,
      type: 'GET',
      data: {id: last_message_id},
      dataType: 'json',
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function(message){
        if($('.message').length == 0){
          $('.messages').append(buildHTML(message))
        } else{
          $(buildHTML(message)).insertAfter('.message:last');
        }
        $('.messages').animate({scrollTop: $('.messages').get(0).scrollHeight});
      });
    })
    .fail(function() {
      alert('メッセージの自動更新に失敗しました');
    });
  };
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
  setInterval(reloadMessages, 5000);
})
