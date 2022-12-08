//  * Client-side JS logic goes here
//  * jQuery is already loaded
//  * Reminder: Use (and do all your DOM work in) jQuery's document ready function

$(document).ready(function() {
  const $newTweet = $('#new-tweet');

  loadTweets(); 
  $newTweet.on('submit', tweetSubmitted)
}); 

//Takes tweet submitted and loads to server without page
const tweetSubmitted = (e) => {
  e.preventDefault();

  if (!$('#tweet-text').val()) {
    return alert('Invalid Submission');
  }

  if ($('#tweet-text').val().length > 140) {
    return alert('Message exceeds limits');
  }

  const data = $('#new-tweet').serialize()

  $.post('/tweets', data, () => {
    $("#tweet-text").val('')
    $('#tweet-counter').text(140)
    loadTweets();
  });
}

const loadTweets = () => {
  $.get('/tweets', (data)=> {
    renderTweets(data)
  })
}

//Loops through array of tweet objects and appends each to index.html
const renderTweets = function(tweets) {
  $('.tweet-spot').empty();

  for (const tweet of tweets){ // loops through tweets
    let $tweet = createTweetElement(tweet) // calls createTweetElement for each tweet
    $('.tweet-spot').prepend($tweet); // takes return value and appends it to the tweets container
  }

}

//Takes tweet object and builds html template to pass to renderTweets
const createTweetElement = function(tweet) {

  let $tweet = `
    <article>
      <header class="tweet-head">
        <div>
          <img src="${tweet.user.avatars}">
          <i>${tweet.user.name}</i>
        </div>
        <div><i><strong>${tweet.user.handle}</strong></i></div>
      </header>
      <p>${tweet.content.text}</p>
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
  `

  return $tweet;

}


