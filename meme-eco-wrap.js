var request = require('request')

module.exports = {
  getUser: function(username, cb) {
    var options = {
      url: `https://meme.market/api/investor/${username}`,
      headers: {
        'referer': `https://meme.market/user.html?account=${username}`
      }
    }
    request(options, function(err, res, body) {
      var json = JSON.parse(body);
      cb(json)
    });
  },

  getFirm: function(firmid, cb) {
    var options = {
      url: `https://meme.market/api/firm/${firmid}`,
      headers: {
        'referer': `https://meme.market/user.html?account=creativityisdying`
      }
    }
    request(options, function(err, res, body) {
      var json = JSON.parse(body);
      cb(json)
    });
  },
  getInvestments: function(username, cb) {
    var options = {
      url: `https://meme.market/api/investor/${username}/investments?`,
      headers: {
        'referer': `https://meme.market/user.html?account=${username}`
      }
    }
    request(options, function(err, res, body) {
      var json = JSON.parse(body);
      cb(json)
    });
  },

  unixToDate: function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
  }
}


