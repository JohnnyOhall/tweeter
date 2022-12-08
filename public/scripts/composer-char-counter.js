$(document).ready(function() {
  $("#tweet-text").on('input', changeFunc)
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