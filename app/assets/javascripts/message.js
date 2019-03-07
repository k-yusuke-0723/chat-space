$(function(){
function buildSendMessageHTML(message){

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
              </div>
            </div>`;
  return html;
}

  var interval = setInterval(function(){
    var id = $('.message:last').data('id');
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      $.ajax({
        url: location.href,
        type: 'GET',
        data: {id: id},
        dataType: 'json',
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

  $('#new_message').on('submit', function(e){
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
});
