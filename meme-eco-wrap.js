var request = require('request')

module.exports = {
    getUser: function (username, cb) {
        var options = {
            url: `https://meme.market/api/investor/${username}`,
            headers: {
                'referer': `https://meme.market/user.html?account=${username}`
            }
        }
        request(options, function (err, res, body) {
            var json = JSON.parse(body);
            cb(json)
        });
    },

    getFirm: function (firmid, cb) {
        var options = {
            url: `https://meme.market/api/firm/${firmid}`,
            headers: {
                'referer': `https://meme.market/user.html?account=creativityisdying`
            }
        }
        request(options, function (err, res, body) {
            var json = JSON.parse(body);
            cb(json)
        });
    },
    getInvestments: function (username, cb) {
        var options = {
            url: `https://meme.market/api/investor/${username}/investments?`,
            headers: {
                'referer': `https://meme.market/user.html?account=${username}`
            }
        }
        request(options, function (err, res, body) {
            var json = JSON.parse(body);
            cb(json)
        });
    }
}


