// Used to update the counter in the tweet field
let count = 140;
$(document).ready(function() {
  $("#tweet-text").keyup(() => {
    count = 140 - $("#tweet-text").val().length;
    if (count < 0) {
      $(".counter").html("<output class='red'>" + count + "</output>");
    } else {
      $(".counter").html("<output>" + count + "</output>");
    }
  });
});
