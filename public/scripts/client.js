// check that the page is ready & then hide error messages along with tweet form
$(document).ready(function() {
  $(".error").hide();
  $("form").hide();
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  $(".write-tweet").on("click", function() {
    $("form").toggle(1000);
  });
  // upon submitting form confirm input is not empty & post it after escaping dom elements
  $("form").submit(function(event) {
    event.preventDefault();
    const data = $('#tweet-text').val();
    const safe = {text:escape(data)};
    console.log(safe);
    console.log(data);
    // if input is empty or above 140 characters show error element & hide once input is valid
    if (safe.text === "" || safe.text === null || count < 0) {
      $(".error").show(1000);
      return null;
    }
    $(".error").hide(1000);
    $.post("/tweets",safe, function() {
      $('section#tweets-container').html("");
      loadTweets();
    });
  
  });
  //generate each tweet in the array
  const renderTweets = function(tweets) {
    for (let i = 0; i < tweets.length; i++) {
      const $tweet = createTweetElement(tweets[i]);
      $('section#tweets-container').append($tweet);
    }
  };
// generate the tweet information into specific elements
  const createTweetElement = function(tweet) {
    let time = timeago.format(tweet.created_at);
    const header = "<header class='tweet-header'><h3 class='title'><img class='tweet-image' src='" +  tweet.user.avatars + "'/>" + tweet.user.name + "</h3><div class='handle'> " + tweet.user.handle + "</div></header>";
    const content = "<p>" + tweet.content.text + "</p><hr>";
    const footer = "<footer>" + time + "<div class='icons'><i class='fa-solid fa-flag'></i><i     class='fa-solid fa-arrows-rotate'></i> <i class='fa-solid fa-heart'></i></div></footer>";
    const output = "<article>" + header + content + footer + "</article>";
    return output;
  };
  // load all the tweets & move them to the render function to be generated
  const loadTweets = function() {
    $.get("/tweets", function(data,status) {
      renderTweets(data);
    });
  };
  loadTweets();
});
