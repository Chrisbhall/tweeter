/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  $(".error").hide();
  $("form").hide();
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  $(".write-tweet").on("click", function() {
  $("form").toggle(1000);
  });
  
$("form").submit(function(event){
  event.preventDefault();
  const data = $('#tweet-text').val();
  const safe = {text:escape(data)};
  console.log(safe);
  console.log(data);
  if (safe.text === "" || safe.text === null || count < 0) {
    $(".error").show(1000);
    return null;
  }
  $(".error").hide(1000);
  $.post( "/tweets",safe, function() {
    $('section#tweets-container').html("");
    loadTweets();
  });
  
});
const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for (let i = 0; i < tweets.length; i++) {
  const $tweet = createTweetElement(tweets[i]);
  $('section#tweets-container').append($tweet);
  }
}

const createTweetElement = function (tweet) {
  let time = timeago.format(tweet.created_at);  
  const header = "<header class='tweet-header'><h3 class='title'><img class='tweet-image' src='" + tweet.user.avatars + "'/>" + tweet.user.name + "</h3><div class='handle'> " + tweet.user.handle + "</div></header>";
  const content = "<p>" + tweet.content.text + "</p><hr>";
  const footer = "<footer>" + time + "<div class='icons'><i class='fa-solid fa-flag'></i><i class='fa-solid fa-arrows-rotate'></i> <i class='fa-solid fa-heart'></i></div></footer>";
  const output = "<article>" + header + content + footer + "</article>";
  return output;
};

const loadTweets = function () {
  $.get("/tweets", function(data,status) {
    renderTweets(data);
  });
};
loadTweets();
// Test / driver code (temporary). Eventually will get this from the server.

//renderTweets(data);
// Test / driver code (temporary)
//console.log($tweet); // to see what it looks like
 // to add it to the page so we can make sure it's got all the right elements, classes, etc
});
