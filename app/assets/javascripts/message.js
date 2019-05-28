$(function() {
  function buildHTML(message){
    image = (message.image) ? `<img src=${message.image} class="image">` : "";
    var html = 
     `<div class="message" data-id=${message.id}>
        <div class="upper-message">
          <div class="upper-message__user-name">
            ${message.user_name}
          </div>
          <div class="upper-message__date">
            ${message.date}
          </div>
        </div>
        <div class="lower-message">
          <p class="lower-message__content">
            ${message.content}
          </p>
          <div class=""lower-message__image">
          ${image}
        </div>
      </div>`
    return html;
  }

  $('.new_message').on('submit', function(e){
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
      $('.messages').append(html);
      $(".form__submit").prop('disabled', false);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $('form')[0].reset();
    })
    .fail(function(){
      alert('error');
    })
  })


  var reloadMessages = function() {
    var last_message_id = $('.message:last').data('id');
    var current_group_id = $('.left-header__title').data('group-id')
    var url = `/groups/${current_group_id}/api/messages`
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id, group_id: current_group_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function(message){
        insertHTML = buildHTML(message)
        $('.messages').append(insertHTML);
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      })
    })
    .fail(function() {
      alert.log('error');
    });
  };
  setInterval(reloadMessages, 5000);
});




  // var reloadMessages = function() {
  //   //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
  //   last_message_id = ※※※
  //   $.ajax({
  //     //ルーティングで設定した通りのURLを指定
  //     url: ※※※,
  //     //ルーティングで設定した通りhttpメソッドをgetに指定
  //     type: 'get',
  //     dataType: 'json',
  //     //dataオプションでリクエストに値を含める
  //     data: {id: last_message_id}
  //   })
  //   .done(function(messages) {
  //     console.log('success');
  //   })
  //   .fail(function() {
  //     console.log('error');
  //   });
  // };