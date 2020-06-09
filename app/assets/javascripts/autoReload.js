$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="message-content__box" data-message-id=${message.id}>
          <div class="message-content__box__field>
            <div class="message-content__box__field__user-name">
              ${message.user_name}
            </div>
            <div class="message-content__box__field__date">
              ${message.created_at}
            </div>
          </div>
          <div class="message-box">
            <p class="Message__content">
              ${message.content}
            </p>
            <img class="message-box__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="message-content__box" data-message-id=${message.id}>
        <div class="message-content__box__field">
          <div class="message-content__box__field__user-name">
            ${message.user_name}
          </div>
          <div class="message-content__box__field__date">
            ${message.created_at}
          </div>
        </div>
        <div class="message-box">
          <p class="Message__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  let reloadMessages = function() {
    let last_message_id = $('.message-content__box:last').data("message-id");
    console.log(last_message_id)
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.Chat-main__message-list').append(insertHTML);
        $('.Chat-main__message-list').animate({ scrollTop: $('.Chat-main__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});