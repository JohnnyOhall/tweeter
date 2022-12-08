$(document).ready(function () {
  const $newTweet = $('#new-tweet');
  const $revealTweet = $('#tweet-reveal');
  const $topScroll = $('.fa-circle-up');

  loadTweets();
  $newTweet.on('submit', tweetSubmitted); // on submit prevents page refresh completes AJAX req.
  $revealTweet.on('click', unhideMsgBox); // Reveals the 
  $topScroll.on('click', scrollToTop);  // Scroll to top of page on button press
});

// Escape code to prevent XSS attacks
const escape = (str) => {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const scrollToTop = () => {
  window.scrollTo(0, 0);
}

const unhideMsgBox = () => {

  if ($('.new-tweet').css('display') == 'none') {
    $('.new-tweet').slideDown("slow", () => { });
    $('#tweet-text').focus()
    return 
  } else {
    return $('.new-tweet').slideUp();
  }

}

//Takes tweet submitted and loads to server without page
const tweetSubmitted = (e) => {
  e.preventDefault();

  if (!$('#tweet-text').val()) { // shows error message if falsey input ('', null etc.)
    $('#error-msg-null').slideDown("slow", () => { });
    return setTimeout(() => $('.errors').slideUp(), 4000);
  }

  if ($('#tweet-text').val().length > 140) { // shows error message if over 140 characters
    $('#error-msg-length').slideDown("slow", () => { });
    return setTimeout(() => $('.errors').slideUp(), 4000);
  }

  const data = $('#new-tweet').serialize();

  $.post('/tweets', data, () => { // Posts submitted tweet to db
    $("#tweet-text").val('');
    $('#tweet-counter').text(140);
    loadTweets();
  });
};

const loadTweets = () => {
  $.get('/tweets', (data) => {
    renderTweets(data);
  });
};

//Loops through array of tweet objects and appends each to index.html
const renderTweets = function (tweets) {
  $('.tweet-spot').empty();

  for (const tweet of tweets) { // loops through tweets
    let $tweet = createTweetElement(tweet); // calls createTweetElement for each tweet
    $('.tweet-spot').prepend($tweet); // takes return value and appends it to the tweets container
  }

};

//Takes tweet object and builds html template to pass to renderTweets
const createTweetElement = function (tweet) {

  let $tweet = `
    <article>
      <header class="tweet-head">
        <div>
          <img src="${tweet.user.avatars}">
          <i>${tweet.user.name}</i>
        </div>
        <div><i><strong>${tweet.user.handle}</strong></i></div>
      </header>
      <p>${escape(tweet.content.text)}</p>
      <footer>
        <hr>
        <div>
          <i>${timeago.format(tweet.created_at)}</i>
          <div>
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
            <i class="likes">1</i>
          </div>
        </div>
      </footer>
    </article>
  `;

  return $tweet;

};


