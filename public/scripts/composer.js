$(document).ready(function() {
  $("#tweet-text").on('input', changeFunc)
  $(document).on('scroll', scrollFunc)
});

const changeFunc = function(e) {
  const textBox     = $('#tweet-text');
  const output      = $('#tweet-counter');
  const textCount   = textBox.val().length;
  let remainder     = 140 - textCount;

  output.text(remainder);
    
  if(remainder < 0) {
    output.addClass('red');
  } else {
    output.removeClass('red');
  }
}

const scrollFunc = () => {
  let page = $(document).scrollTop();

  if (page > 400) {
    $('.fa-circle-up').fadeIn();
  } else {
    $('.fa-circle-up').fadeOut();
  }
}