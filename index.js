var memeClient = require('./meme-eco-wrap')
const Discord = require('discord.js');
const client = new Discord.Client();
var keepAlive = require('./keepalive');

var prefix = process.env.PREFIX;
var token = process.env.TOKEN;
var useKeepAlive = process.env.USEKEEPALIVE;

if (useKeepAlive === "true") {
  keepAlive.run()
}


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(`prefix is: ${prefix}`)
});

client.on('message', msg => {
  if (msg.content.startsWith(`${prefix}help`)) {
    msg.channel.send("```json" + `
    ${prefix}help: shows this message
    ${prefix}getfirm: gets firm stats by id
    ${prefix}getuser: gets user stats by username
    ${prefix}getinvestments: gets a users last three investments by username
    `+ "```")
  }
  if (msg.content.startsWith(`${prefix}getfirm`)) {
    var args = msg.toString().split(" ")

    memeClient.getFirm(args[1], firm => msg.channel.send("```js\n" + `
    name: ${firm.name}
    firm balance: ${firm.balance}
    Private: ${firm.private}
    Execs: ${firm.execs}
    Members: ${firm.size}
    Tax: ${firm.tax}%
    Last payout: ${memeClient.unixToDate(firm.last_payout)}
    `+ "```"));
  }
  if (msg.content.startsWith(`${prefix}getinvestments`)) {
    var args = msg.toString().split(" ")
    memeClient.getInvestments(args[1], investments => {
      var countdown = 3
      investments.forEach(element => {
        countdown--
        if (countdown >= 0) {
          var investmentData = `
        Investment: 
        Completed: ${element.done}
        Amount: ${element.amount}
        Successful: ${element.success}
        Starting upvotes: ${element.upvotes}
        Final upvotes: ${element.final_upvotes}
        Profit: ${element.profit}
        Id: ${element.id}
        Comment: ${element.comment}
        Post: ${element.post}
        Response: ${element.response}
        Time: ${memeClient.unixToDate(element.time)}
        `
          msg.channel.send("```js\n" + investmentData + "```")
        }
      });
    })
  }
  if (msg.content.startsWith(`${prefix}getuser`)) {
    var args = msg.toString().split(" ")
    memeClient.getUser(args[1], user => msg.channel.send("```js\n" + `
    Name: ${user.name}
    Balance: ${user.balance}
    Completed investments: ${user.completed}
    Times gone broke: ${user.broke}
    Net worth: ${user.networth}
    Firm id: ${user.firm}
    Ranking: ${user.rank}` + "```"))
  }
});

client.login(token);
