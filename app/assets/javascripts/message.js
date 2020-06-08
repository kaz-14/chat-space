$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="message-content">
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
      `<div class="MessageBox">
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

  $('.form-contents__test').on('submit', function(e){
    e.preventDefault();
    let formData =new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.Chat-main__message-list').append(html);
      $('.Chat-main__message-list').animate({ scrollTop: $('.Chat-main__message-list')[0].scrollHeight});
      $('.form-contents__btn').prop('disabled', false);
      $('.form-contents__test')[0].reset();
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
});

