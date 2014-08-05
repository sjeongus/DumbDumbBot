var twitter = require('../twitter.js');

module.exports = function(bot) {
  bot.addListener("join", function(channel, nick, message) {
    if (nick == "Meball") {
      bot.say(channel, "HI " + nick.toUpperCase());
    }
    if (nick == "LoliSenpai" || nick == "Restinya") {
      bot.say(channel, "Go away Nick, you're dumber than me.");
    }
  });
  // Listen for any message, say to him/her in the room
  bot.addListener("message", function(from, to, text, message) {
    var arr = text.split(" ", 2);
    var command = arr[0];
    var rest = text.substr(text.indexOf(' ') + 1);
    if (command == "!hi" || command == "!sup") {
      bot.say(to, "Hello, " + from);
      console.log("Success");
    }
    else if (command == "!goaway") {
      bot.say(to, "Go away " + rest);
    }
    else if (command == "!countdown") {
      var number = rest;
      if (number <= 15) {
        bot.say(to, "Starting!");
        (function counter() {
          if (number > 0) {
            bot.say(to, number);
            number--;
            setTimeout(counter, 1000);
          }
          else
            bot.say(to, "GO!");
        })();
      } else if (rest == "next tourney") {
        bot.say(to, "Never.");
      } else {
        bot.say(to, "Hi, I'm too dumb to count from that high.");
      }
    }
    else if (command == "!yakuman") {
      var len = from.length;
      var d = new Date();
      var date = d.getDate();
      var day = d.getDay();
      var val = len * date * day;
      var hash = val % 13;
      var yakuman = [
        "Kokushi Musou",
        "Daisangen",
        "Shousuushii",
        "Daisuushi",
        "Chuurenpoutou",
        "Suu Ankou",
        "Ryuuiisou",
        "Suu Kantsu",
        "Tsuuiisou",
        "Chinroutou",
        "Tenhou",
        "Chiihou",
        "Renhou"
      ];
      bot.say(to, "Today you should try going for " + yakuman[hash]);
    }
    else if (command == "!tweet") {
      twitter.tweet(rest, bot, to);
    }
    else if (command == "!petite") {
      if (from == "DDK") {
        bot.say(to, "I'm  DEFINITELY not a lolicon, I just like petite girls! *wink wink*");
      }
      else {
        bot.say(to, "I'm not a lolicon, I just like petite girls!");
      }
    }
    else if (command == "!help") {
      bot.say(to, "Enter !hi or !sup to have DumbDumbBot greet you!");
      bot.say(to, "Enter !goaway <name of person> to have DumbDumbBot be rude to a person.");
      bot.say(to, "Enter !countdown <number> to have DumbDumbBot start a countdown! Limited to numbers under 15.");
      bot.say(to, "Enter !tweet <message to send> to post a tweet.");
      bot.say(to, "Enter !yakuman to have DumbDumbBot tell you what yakuman you should go for today.");
    }
  });
};
