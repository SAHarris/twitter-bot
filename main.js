//pull in Twitter npm to interact with twitter API
var Twitter = require('twitter');
//location of configuration file containing personal twitter keys- this file is excluded from github!
var config = require('./config.js');
var T = new Twitter(config);
//set up search parameters below:
var params = {
  //q is the search keyword!
  q: '#neuralink',
  count: 10,
  result_type: 'recent',
  lang: 'en'
};
//set up get request below:
T.get('search/tweets', params, function(err, data, response){
  if(!err){
    //loop through the result and favorite tweets that do not return errors
    for(var i = 0; i < data.statuses.length; i++){
      //grab the tweet id
      var id = { id: data.statuses[i].id_str };
      //attempt to add tweet as favorite:
      T.post('favorites/create', id, function(err, response) {
        //if this fails, we will return an error
        if(err){
          console.log(err[0].message);
        }
        //on success, log the tweet url:
        else{
          let username = response.user.screen_name;
          let tweetId = response.id_str;
          console.log("Added to Favorites: ", 'https://twitter.com/${username}/status/${tweetId}');
        }
      });
    }
  } else {
    console.log(err);
  }
});
