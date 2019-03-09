$(function(){
function buildSendMessageHTML(message){

  if (message.image) {
    var image = `<img src ="${message.image}">`;
  } else {
    var image = '';
  }

var html = `<div class="message" data-message-id="${message.id}">
              <div class="upper-message">
                <div class="upper-message__user-name">
                  ${ message.user_name }
                </div>
                <div class="upper-message__date">
                  ${ message.time }
                </div>
              </div>
              <div class="lower-message">
                <p class="lower-message__content">
                  ${ message.content }
                </p>
                  ${ image }
              </div>
            </div>`;
  return html;
}


  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildSendMessageHTML(message);
      $('.messages').append(html);
      $('.form__message').val('');
      $('.form__submit').prop('disabled', false);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function(){
      alert('メッセージを入力してください');
    })
  })

  var interval = setInterval(function(){
    var last_id = $('.message:last').data('message-id');
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      $.ajax({
        url: location.href,
        type: 'GET',
        data: {id: last_id},
        dataType: 'json'
      })
      .done(function(data){
        data.forEach(function(message){
        var html = buildSendMessageHTML(message);
        $('.messages').append(html);
        });
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
      })
      .fail(function(data){
        alert('自動更新できません。');
      });
  } else {
      clearInterval(interval);
    }
    }, 5000);
});
