$(function(){
  $('.button-more').on('mouseover',()=>{
    $('.button-more').animate({
      opacity:0.5,
      marginLeft:20,
    },100);
  });
  $('.button-more').on('mouseout',()=>{
  $('.button-more').animate({
    opacity: 1,
    marginLeft: 0,
  },100);
 });

 $('.carousel').slick({
  autoplay: true,
  dots: true,
  infinite: true,
  autoplaySpeed: 5000,
  arrows: false,
});

$('#submit').on('click',function(event){
  event.preventDefault();
  let result = inputCheck();
  // エラー判定とメッセージを取得
  let error = result.error;
  let message = result.message;
  // エラーがなかったらフォームを送信する
  if(error == false){
    $.ajax({
      url: 'https://api.staticforms.xyz/submit',
      type: 'POST',
      dataType: 'json',
      data: $('#form').serialize(),
      success: function (result) {
        alert('お問い合わせを送信しました。')
      },
      error: function (xhr, resp, text) {
        alert('お問い合わせを送信できませんでした。')
      }
    })
  } else {
    alert(message);
  }
});

$('#name').blur(function(){
  inputCheck();
});
$('#furigana').blur(function(){
  inputCheck();
});
$('#email').blur(function(){
  inputCheck();
});
$('#tel').blur(function(){
  inputCheck();
});
$('#message').blur(function(){
  inputCheck();
});
$('#agree').click(function(){
  inputCheck();
});

// 問い合わせフォームの入力チェック
function inputCheck(){
  // エラーのチェック結果
 let result;
 let message = '';
 let error = false;

//  名前のチェック
if($('#name').val() == ''){
  $('#name').css('background-color','#f79999');
  // 送信ボタンを押せなくする
  error = true;
  // 変数messageに代入
  message += 'お名前を入力してください\n';
}else{
  $('#name').css('background-color','#fafafa');
}
if($('#furigana').val() =='') {
  $('#furigana').css('background-color','#f79999');
  error = true;
  message += 'フリガナを入力してください\n';
}else {
  $('furigana').css('background-color','#fafafa');
}
 if ($('#message').val() == '') { 
  $('#message').css('background-color', '#f79999');
  error = true;
  message += 'お問い合わせ内容を入力してください。\n';
  } else {
  $('#message').css('background-color', '#fafafa');
   }

   if ($('#email').val() == '' || $('#email').val().indexOf('@') == -1 || $('#email').val().indexOf('.') == -1) {
    // エラーあり
    $('#email').css('background-color', '#f79999');
    error = true;
    message += 'メールアドレスが未記入、または「@」「.」が含まれていません。\n';
  } else {
    // エラーなし
    $('#email').css('background-color', '#fafafa');
  }
  if ($('#tel').val() != '' && $('#tel').val().indexOf('-') == -1) {
    // エラーあり
    $('#tel').css('background-color', '#f79999');
    error = true;
    message += '電話番号に「-」が含まれていません。\n';
  } else {
    // エラーなし
    $('#tel').css('background-color', '#fafafa');
  }
  if ($('#agree').prop('checked') == false) {
    error = true;
    message += '個人情報の取り扱いについてご同意いただける場合は、チェックボックスにチェックしてください。\n';
  }
  // エラーの有無で送信ボタンを切り替え
  if (error == true) {
    $('#submit').attr('src', 'images/button-submit.png');
  } else {
    $('#submit').attr('src', 'images/button-submit-blue.png');
  }
  // オブジェクトでエラー判定とメッセージを返す
  result = {
    error: error,
    message: message
  }
  return result;
  }
});