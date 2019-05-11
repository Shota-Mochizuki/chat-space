$(function(){
  function addResult(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    return html;
  }
  function addMember(name,id){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    return html;
  }
  $(document).on('keyup','#user-search-field', function(e) {
    e.preventDefault();
    var input = $("#user-search-field").val();
    $.ajax({
      url: '/users',
      type: "GET",
      data: { keyword: input },
      dataType: 'json',
    })
    .done(function(users){
      $(".user-search-result").empty();
      if ((input !== '') && (users.length !== 0)) {
        users.forEach(function(user){
          $('.user-search-result').append(addResult(user));
        });
      }
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました');
    })
  })
  $(document).on('click','.chat-group-user__btn--add', function(e) {
    var user_name = $(this).attr('data-user-name');
    var user_id = $(this).attr('data-user-id');
    $(this).closest('.chat-group-user').remove();
    $(addMember(user_name,user_id)).insertAfter('.js-chat-member:last');
  })
  $(document).on('click','.chat-group-user__btn--remove', function(e) {
    $(this).closest('.chat-group-user').remove();
  })
})