$(function(){
  var searchUser = $('.user-search-result') 
  function appendUser(user){
    var html =`<div class="chat-group-user clearfix">
                   <p class="chat-group-user__name">${user.name}</p>
                   <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                 </div>
               </div>`
    searchUser.append(html);
  }
  function appendNoUser(){
    var html =`<div class="chat-group-user clearfix">
                 <div class='chat-group-form__field--right'>
                   <p class="chat-group-user__name">一致するユーザーが見つかりません</p>
                 </div>
               </div>`
    searchUser.append(html);
  }
  function addUserList(id,user){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${id}'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                    <p class='chat-group-user__name'>${user}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn' data-user-id="${id}">削除</div>
                  </div>
                </div>`
   return html;
  }
  $('#user-search-field').on('keyup', function(e){
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users/search',
      data: { name: input},
      dataType: 'json',
    })
    .done(function(users){
      $('.user-search-result').empty();
      if (users.length !== 0 && input.length !== 0) {
      users.forEach(function(user){
        appendUser(user);
      })
    } else {
      appendNoUser();
      }
    })
    .fail(function() {
      alert('ユーザの検索に失敗しました');
    })
  })
   $(document).on('click', '.user-search-add',function(){
      var id = $(this).attr('data-user-id')
      var user = $(this).attr('data-user-name')
      var html = addUserList(id,user);
      $(".chat-group-users").append(html)
      $(this).parent().remove();
  });
    $(document).on('click','.user-search-remove', function(){
      $(this).parent().remove()
    })
});